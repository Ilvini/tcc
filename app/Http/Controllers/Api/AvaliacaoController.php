<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\NovaAvaliacaoRequest;
use App\Http\Resources\Api\AvaliacaoResource;
use App\Models\PontoTuristico;
use App\Services\FoursquareService;
use Illuminate\Support\Facades\Log;

class AvaliacaoController extends Controller
{
    public function index($uuid)
    {
        try {

            $pontoTuristico = PontoTuristico::where('uuid', $uuid)->orWhere('fsq_id', $uuid)->first();

            if (!$pontoTuristico) {

                $foursquareService = new FoursquareService();

                $results = $foursquareService->getPlaceDetails($uuid);

                if ($results->status == 200) {
                    return apiResponse(false, 'Sem erros!');
                } else {
                    return apiResponse(true, 'Ponto turístico não encontrado', null, 404);
                }
            }

            $avaliacoes = $pontoTuristico->avaliacoes()->where('aprovado', true)->get();

            return apiResponse(false, 'Sem erros!', AvaliacaoResource::collection($avaliacoes));

        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }

    public function create($uuid, NovaAvaliacaoRequest $request)
    {
        try {

            $dbPontoTuristico = PontoTuristico::where('uuid', $uuid)->orWhere('fsq_id', $uuid)->first();

            if (!$dbPontoTuristico) {
                
                $foursquareService = new FoursquareService();

                $results = $foursquareService->getPlaceDetails($uuid);

                if ($results->status == 200) {

                    $pontoTuristico = json_decode($results->body);

                    $dbPontoTuristico = PontoTuristico::cadastrarPontosFoursquare($pontoTuristico);

                } else {
                    return apiResponse(true, 'Ponto turístico não encontrado', null, 404);
                }
            }

            $dbPontoTuristico->avaliacoes()->create([
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
