<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ClienteRegistroRequest;
use App\Http\Requests\Api\ClienteUpdateRequest;
use App\Http\Resources\Api\ClienteMeResource;
use App\Models\Cliente;
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

    function update(ClienteUpdateRequest $request)
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
}
