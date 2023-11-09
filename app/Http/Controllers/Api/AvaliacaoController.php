<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\NovaAvaliacaoRequest;
use App\Http\Resources\Api\AvaliacaoResource;
use App\Models\PontoTuristicoAvaliacao;
use Illuminate\Support\Facades\Log;

class AvaliacaoController extends Controller
{
    public function index($uuid)
    {
        try {

            $avaliacoes = PontoTuristicoAvaliacao::where('ponto_turistico_id', $uuid)->where('aprovado', '1')->get();

            return apiResponse(false, 'Sem erros!', AvaliacaoResource::collection($avaliacoes));

        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }

    public function create($uuid, NovaAvaliacaoRequest $request)
    {
        try {

            PontoTuristicoAvaliacao::create([
                'ponto_turistico_id' => $uuid,
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
