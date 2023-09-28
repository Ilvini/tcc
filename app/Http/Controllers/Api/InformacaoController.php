<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\InformacaoResource;
use App\Models\PontoTuristico;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class InformacaoController extends Controller
{
    public function tipos()
    {
        return apiResponse(false, 'Sem erros!', tipoInformacao());
    }

    public function index($uuid)
    {
        try {

            $pontoTuristico = PontoTuristico::where('uuid', $uuid)->first();

            if (!$pontoTuristico) {
                return apiResponse(true, 'Ponto turístico não encontrado', null, 404);
            }

            $informacoes = $pontoTuristico->informacoes()->where('aprovado', true)->get();

            return apiResponse(false, 'Sem erros!', InformacaoResource::collection($informacoes)->collection->groupBy('tipo'));

        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }

    public function create($uuid, Request $request)
    {
        try {

            $pontoTuristico = PontoTuristico::where('uuid', $uuid)->first();

            if (!$pontoTuristico) {
                return apiResponse(true, 'Ponto turístico não encontrado', null, 404);
            }

            $pontoTuristico->informacoes()->create([
                'cliente_id' => auth()->id(),
                'tipo' => $request->tipo,
                'titulo' => $request->titulo,
                'descricao' => $request->descricao,
            ]);

            return apiResponse(false, 'Obrigado por sua contribuição');

        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }
}
