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
use App\Services\OpenStreetMapService;
use Illuminate\Support\Facades\Cache;
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

            $cacheKey = 'pontos_turisticos_' . md5(serialize([round($lat, 2), round($lon, 2), $raio, $categorias]));

            $data = Cache::remember($cacheKey, now()->addMinutes(10), function () use ($lat, $lon, $raio, $categorias) {

                $openStreetMapService = new OpenStreetMapService();
                $result = $openStreetMapService->getMunicipio($lat, $lon);

                $cidade = null;
                $uf = null;

                if (isset($result->addresstype)) {
                    if ($result->addresstype == 'place') {
                        $cidade = $result->address->city;
                    } else if ($result->addresstype == 'municipality') {
                        $cidade = $result->name;
                    } else if ($result->addresstype == 'road') {
                        $cidade = $result->address->town;
                    }
                }

                if (isset($result->address->{'ISO3166-2-lvl4'})) {
                    $uf = $result->address->{'ISO3166-2-lvl4'};
                    $uf = explode('-', $uf)[1];
                }

                $classPontoTuristico = new ClassPontoTuristico();
                $pontosTuristicos = $classPontoTuristico->buscar($lat, $lon, $raio, $categorias);

                return [
                    'estado' => $uf,
                    'cidade' => $cidade,
                    'localidades' => ListarPontoTuristicoResource::collection($pontosTuristicos->sortBy('popularidade'))
                ];
            });

            return apiResponse(false, 'Sem erros!', $data);

        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }

    public function detalhe($uuid)
    {
        try {

            $pontoTuristico = Cache::remember('ponto_turistico_' . $uuid, now()->addHours(1), function () use ($uuid) {
                $classPontoTuristico = new ClassPontoTuristico();
                return $classPontoTuristico->buscarPorId($uuid);
            });

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

            $local = auth()->user()->favoritos()->where('ponto_turistico_id', $uuid)->first();

            if ($local) {
                $local->delete();
            } else {

                $classPontoTuristico = new ClassPontoTuristico();
                $pontoTuristico = $classPontoTuristico->buscarPorId($uuid);
                
                if ($pontoTuristico) {
                    auth()->user()->favoritos()->create([
                        'ponto_turistico_id' => $uuid,
                        'nome' => $pontoTuristico->nome,
                        'endereco' => $pontoTuristico->endereco,
                        'subcategoria_id' => $pontoTuristico->subcategoria_id,
                        'imagem' => isset($pontoTuristico->imagem[0]) ? $pontoTuristico->imagem[0]->imagem : null,
                    ]);
                } else {
                    return apiResponse(true, 'Local não encontrado', null, 404);
                }
            }

            return apiResponse(false, 'Sem erros!');
            
        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }
}
