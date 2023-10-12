<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\IndexPlaceRequest;
use App\Http\Requests\Api\NovoPontoSugeridoRequest;
use App\Http\Resources\Api\CategoriaResource;
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

            $categorias = Subcategoria::where('ativo', 1)->pluck('fsq_id')->toArray();

            $pontosTuristicos = PontoTuristico::select('*')
                ->selectRaw(
                    '(6371 * acos(cos(radians(?)) * cos(radians(lat)) * cos(radians(lon) - radians(?)) + sin(radians(?)) * sin(radians(lat)))) AS distancia',
                    [$lat, $lon, $lat]
                )
                ->having('distancia', '<=', $raio)
                ->whereIn('subcategoria_id', $categorias)
                ->orderBy('distancia')
                ->get();

            $pontosTuristicos->load([
                'imagens',
                'subcategoria',
            ]);

            $dbFoursquarePontos = [];
            foreach ($pontosTuristicos as $pontosTuristico) {
                if ($pontosTuristico->fsq_id != null) {
                    $dbFoursquarePontos[$pontosTuristico->fsq_id] = $pontosTuristico;
                }
            }

            $categorias = implode(',', $categorias);

            $results = $foursquareService->placeSearch($lat, $lon, $raio * 1000, $categorias);

            if ($results->status == 200) {
                $results = json_decode($results->body);

                // Merge dos pontos turísticos com os pontos do foursquare
                $pontosFoursquare = [];
                foreach ($results->results as $ponto) {

                    if (isset($dbFoursquarePontos[$ponto->fsq_id])) {

                        $dbFoursquarePontos[$ponto->fsq_id]->foursquare = $ponto;

                    } else {

                        $pontosFoursquare[] = new Fluent([
                            'uuid' => $ponto->fsq_id,
                            'nome' => $ponto->name,
                            'imagens' => isset($ponto->photos[0]) ? $ponto->photos[0]->prefix . '200' . $ponto->photos[0]->suffix : null,
                            'lat' => $ponto->geocodes->main->latitude,
                            'lon' => $ponto->geocodes->main->longitude,
                            'subcategoria' => new Fluent(['nome' => $ponto->categories[0]->name]),
                            'icone' => $ponto->categories[0]->icon->prefix . '64' . $ponto->categories[0]->icon->suffix,
                            'popularidade' => $ponto->popularity ?? 0,
                        ]);
                    }
                }
            }

            $pontosTuristicos = collect($pontosFoursquare)->merge($pontosTuristicos);

            return apiResponse(false, 'Sem erros!', ListarPontoTuristicoResource::collection($pontosTuristicos->sortBy('popularidade')));

        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }

    public function detalhe($uuid)
    {
        try {

            $pontoTuristico = PontoTuristico::where('uuid', $uuid)->orWhere('fsq_id', $uuid)->first();

            if ($pontoTuristico) {
                
                $pontoTuristico->load([
                    'imagens',
                    'avaliacoes',
                    'informacoes',
                    'horarios',
                ]);

                if ($pontoTuristico->fsq_id != null) {

                    $foursquareService = new FoursquareService();

                    $results = $foursquareService->getPlaceDetails($pontoTuristico->fsq_id);

                    if ($results->status == 200) {
                        $pontoTuristico->foursquare = json_decode($results->body);
                    } else {
                        $pontoTuristico->update(['fsq_id' => null]);
                    }
                }

            } else {

                $foursquareService = new FoursquareService();

                $results = $foursquareService->getPlaceDetails($uuid);

                if ($results->status == 200) {
                    $pontoTuristico = json_decode($results->body);
                } else {
                    return apiResponse(true, 'Local não encontrado', null, 404);
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

            $subcategorias = Subcategoria::where('ativo', 1)->get();

            return apiResponse(false, 'Sem erros!', CategoriaResource::collection($subcategorias));

        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }
}
