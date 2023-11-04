<?php

namespace App\Http\Controllers\Api;

use App\Classes\PontoTuristico as ClassPontoTuristico;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\IndexPlaceRequest;
use App\Http\Requests\Api\NovoPontoSugeridoRequest;
use App\Http\Resources\Api\CategoriaResource;
use App\Http\Resources\Api\ListarPontoTuristicoResource;
use App\Http\Resources\Api\PontoTuristicoResource;
use App\Models\PontoSugerido;
use App\Models\Subcategoria;
use Illuminate\Support\Facades\Log;

class PontoTuristicoController extends Controller
{
    public function index(IndexPlaceRequest $request)
    {
        try {

            $lat = $request->lat;
            $lon = $request->lon;
            $raio = $request->raio;

            $categorias = Subcategoria::where('ativo', 1)->pluck('fsq_id')->toArray();

            $classPontoTuristico = new ClassPontoTuristico();

            $pontosTuristicos = $classPontoTuristico->buscar($lat, $lon, $raio, $categorias);

            return apiResponse(false, 'Sem erros!', ListarPontoTuristicoResource::collection($pontosTuristicos->sortBy('popularidade')));

        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }

    public function detalhe($uuid)
    {
        try {

            $classPontoTuristico = new ClassPontoTuristico();

            $pontoTuristico = $classPontoTuristico->buscarPorId($uuid);
            
            if ($pontoTuristico) {
                return apiResponse(false, 'Sem erros!', new PontoTuristicoResource($pontoTuristico));
            } else {
                return apiResponse(true, 'Local não encontrado', null, 404);
            }

        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }

    public function create(NovoPontoSugeridoRequest $request)
    {
        try {

            PontoSugerido::create([
                'subcategoria_id' => $request->subcategoria_id,
                'cliente_id' => auth()->id(),
                'nome' => $request->nome,
                'endereco' => $request->endereco,
                'lat' => $request->lat,
                'lon' => $request->lon,
            ]);

            return apiResponse(false, 'Cadastro realizado com sucesso!');

        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }

    public function categorias()
    {
        try {

            $subcategorias = Subcategoria::where('ativo', 1)->get();

            return apiResponse(false, 'Sem erros!', CategoriaResource::collection($subcategorias));

        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }

    public function favoritar($uuid)
    {
        try {

            auth()->user()->favoritos()->toggle($uuid);

            return apiResponse(false, 'Sem erros!');
            
        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }
}
