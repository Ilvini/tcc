<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\NovaInformacaoRequest;
use App\Http\Resources\Api\InformacaoResource;
use App\Models\PontoTuristico;
use App\Services\FoursquareService;
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

            $informacoes = $pontoTuristico->informacoes()->where('aprovado', true)->get();

            return apiResponse(false, 'Sem erros!', InformacaoResource::collection($informacoes)->collection->groupBy('tipo'));

        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }

    public function create($uuid, NovaInformacaoRequest $request)
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

            $dbPontoTuristico->informacoes()->create([
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
