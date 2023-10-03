<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\IndexPlaceRequest;
use App\Http\Requests\Api\NovoPontoSugeridoRequest;
use App\Http\Resources\Api\ListarPontoTuristicoResource;
use App\Http\Resources\Api\PontoTuristicoResource;
use App\Models\PontoSugerido;
use App\Models\PontoTuristico;
use App\Models\Subcategoria;
use App\Services\FoursquareService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Fluent;

class PontoTuristicoController extends Controller
{
    public function index(IndexPlaceRequest $request)
    {
        try {

            $foursquareService = new FoursquareService();

            $lat = $request->lat;
            $lon = $request->lon;
            $raio = $request->raio;
            $categorias = $request->categorias;

            $pontosTuristicos = PontoTuristico::select('*')
                ->selectRaw(
                    '(6371 * acos(cos(radians(?)) * cos(radians(lat)) * cos(radians(lon) - radians(?)) + sin(radians(?)) * sin(radians(lat)))) AS distancia',
                    [$lat, $lon, $lat]
                )
                ->having('distancia', '<=', $raio)
                ->orderBy('distancia')
                ->get();

            $results = $foursquareService->placeSearch($lat, $lon, $raio * 1000, $categorias);

            if ($results->status == 200) {
                $results = json_decode($results->body);

                // Merge dos pontos turísticos com os pontos do foursquare
                $pontosFoursquare = collect($results->results)->map(function ($item) {
                    return new Fluent([
                        'uuid' => $item->fsq_id,
                        'nome' => $item->name,
                        'lat' => $item->geocodes->main->latitude,
                        'lon' => $item->geocodes->main->longitude,
                        'subcategoria' => new Fluent(['nome' => $item->categories[0]->name]),
                        'icone' => $item->categories[0]->icon->prefix . '64' . $item->categories[0]->icon->suffix,
                    ]);
                });
            }

            return apiResponse(false, 'Sem erros!', ListarPontoTuristicoResource::collection($pontosFoursquare->merge($pontosTuristicos)));

        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }

    public function detalhe($uuid)
    {
        try {

            // Verificar se é uuid
            if (preg_match('/^[a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8}$/i', $uuid)) {

                $pontoTuristico = PontoTuristico::where('uuid', $uuid)->first();
    
                if (!$pontoTuristico) {
                    return apiResponse(true, 'Ponto turístico não encontrado', null, 404);
                }

            } else {

                $foursquareService = new FoursquareService();

                $results = $foursquareService->getPlaceDetails($uuid);

                if ($results->status == 200) {
                    $pontoTuristico = json_decode($results->body);

                    $dbPontoTuristico = PontoTuristico::where('fsq_id', $uuid)->first();

                    if ($dbPontoTuristico) {
                        $pontoTuristico = $dbPontoTuristico;
                    }
                }
            }

            return apiResponse(false, 'Sem erros!', new PontoTuristicoResource($pontoTuristico));

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

            $subcategorias = Subcategoria::where('ativo', 1)->get()->pluck('nome', 'id')->toArray();

            return apiResponse(false, 'Sem erros!', $subcategorias);

        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }
}
