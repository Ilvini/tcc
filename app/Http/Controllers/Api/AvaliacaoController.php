<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\AvaliacaoResource;
use App\Models\PontoTuristico;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AvaliacaoController extends Controller
{
    public function index($uuid)
    {
        try {

            $pontoTuristico = PontoTuristico::where('uuid', $uuid)->first();

            if (!$pontoTuristico) {
                return apiResponse(true, 'Ponto turístico não encontrado', null, 404);
            }

            $avaliacoes = $pontoTuristico->avaliacoes()->where('aprovado', true)->get();

            return apiResponse(false, 'Sem erros!', AvaliacaoResource::collection($avaliacoes));

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

            $pontoTuristico->avaliacoes()->create([
                'cliente_id' => auth()->id(),
                'estrelas' => $request->estrelas,
                'comentario' => $request->comentario,
            ]);

            return apiResponse(false, 'Obrigado por sua avaliação');

        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }
}
