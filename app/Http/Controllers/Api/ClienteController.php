<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ClienteNovaSenhaRequest;
use App\Http\Requests\Api\ClienteRegistroRequest;
use App\Http\Requests\Api\ClienteUpdateRequest;
use App\Http\Resources\Api\ClienteMeResource;
use App\Http\Resources\Api\FavoritoResource;
use App\Http\Resources\Api\PreferenciaResource;
use App\Models\Cliente;
use App\Models\Subcategoria;
use Illuminate\Support\Facades\Log;

class ClienteController extends Controller
{
    public function me()
    {
        try {
            $cliente = auth()->user();

            return apiResponse(false, 'Sem erros', new ClienteMeResource($cliente));
        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }

    public function register(ClienteRegistroRequest $request)
    {
        try {
            $cliente = Cliente::create($request->validated());

            return apiResponse(false, 'Sem erros', [
                'token' => $cliente->createToken('api')->plainTextToken,
                'nome' => $cliente->nome,
            ]);
        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }

    public function update(ClienteUpdateRequest $request)
    {
        try {
            $input = $request->all();

            $cliente = auth()->user();

            $cliente->update($input);

            return apiResponse(false, 'Sem erros', new ClienteMeResource($cliente));
        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }

    public function alterarSenha(ClienteNovaSenhaRequest $request)
    {
        try {
            $cliente = auth()->user();

            $cliente->password = $request->password;
            $cliente->save();

            return apiResponse(false, 'Senha atualizada com sucesso');
        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }

    public function delete()
    {
        try {
            $cliente = auth()->user();

            $cliente->email = $cliente->email . '_deletado_' . now()->format('YmdHis');
            $cliente->save();

            $cliente->delete();

            return apiResponse(false, 'Conta excluída com sucesso');
        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }

    public function categorias()
    {
        try {
            $categorias = Subcategoria::where('ativo', true)->get();

            return apiResponse(false, 'Sem erros', PreferenciaResource::collection($categorias));
        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }

    public function mudarCategoria($id)
    {
        try {
            $cliente = auth()->user();

            $subcategoria = Subcategoria::find($id);

            if (!$subcategoria) {
                return apiResponse(true, 'Categoria não encontrada', null, 404);
            }

            $cliente->subcategorias()->where('subcategoria_id', $id)->exists()
                ? $cliente->subcategorias()->detach($id)
                : $cliente->subcategorias()->attach($id);

            return apiResponse(false, 'Sem erros');
        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }

    public function favoritos()
    {
        try {
            $cliente = auth()->user();
    
            $favoritos = $cliente->favoritos;

            return apiResponse(false, 'Sem erros', FavoritoResource::collection($favoritos));
        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }
}
