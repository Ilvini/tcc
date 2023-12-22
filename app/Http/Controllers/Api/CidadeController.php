<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\IBGEService;
use App\Services\OpenStreetMapService;
use App\Services\WikipediaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class CidadeController extends Controller
{
    public function detalhe(Request $request)
    {
        try {

            $lat = $request->lat;
            $lon = $request->lon;

            $cacheKey = 'cidade_latlon_' . md5(serialize([round($lat, 2), round($lon, 2)]));

            $result = Cache::remember($cacheKey, now()->addMonth(), function () use ($lat, $lon) {
                $openStreetMapService = new OpenStreetMapService();
                return $openStreetMapService->getMunicipio($lat, $lon);
            });

            $cidade = null;
            $estado = null;

            $uf = null;
            $regiao = null;

            if (isset($result->addresstype)) {

                $estado = $result->address->state;

                if (isset($result->address->city)) {
                    $cidade = $result->address->city;
                } else if ($result->addresstype == 'municipality') {
                    $cidade = $result->name;
                } else if (isset($result->address->town)) {
                    $cidade = $result->address->town;
                }
            }

            if (isset($result->address->region)) {
                $regiao = $result->address->region;
            }

            if (isset($result->address->{'ISO3166-2-lvl4'})) {
                $uf = $result->address->{'ISO3166-2-lvl4'};
                $uf = explode('-', $uf)[1];
            }

            // Adicionar Cache
            $cacheKey2 = 'cidade_' . $cidade . '_' . $estado;

            $data = Cache::remember($cacheKey2, now()->addMonth(), function () use ($cidade, $estado, $uf, $regiao) {

                // $googleService = new GoogleService();
                // $requestGoogle = $googleService->getPlacesBySearch($cidade . ' ' . $estado);
                // dd(json_decode($requestGoogle->body));

                $bandeira = null;

                $wikiService = new WikipediaService();
                $requestWiki = $wikiService->search($cidade . ' ' . $estado);

                if (isset($requestWiki->query->search[0])) {
                    $descricao = $wikiService->getDetails($requestWiki->query->search[0]->title);
                    if (isset($descricao->query->pages->{array_key_first((array) $descricao->query->pages)}->extract)) {
                        $descricao = $descricao->query->pages->{array_key_first((array) $descricao->query->pages)}->extract;
                    } else {
                        $descricao = null;
                    }
                }

                $requestWiki = $wikiService->search("Ficheiro:Bandeira {$cidade} {$estado}.svg");

                if (isset($requestWiki->query->search[0])) {

                    $resultSvg = collect($requestWiki->query->search)->filter(function ($item) {
                        return strpos($item->title, '.svg') !== false;
                    })->first();

                    if ($resultSvg) {
                        $requestWiki = $resultSvg;
                    } else {
                        $requestWiki = $requestWiki->query->search[0];
                    }
                    
                    $bandeira = $wikiService->getFicheiro($requestWiki->title);
                    if (isset($bandeira->query->pages->{'-1'}->imageinfo)) {
                        $bandeira = $bandeira->query->pages->{'-1'}->imageinfo[0]->url;
                    } else {
                        $bandeira = null;
                    }
                }

                $requestWiki = $wikiService->search("Ficheiro:Brazil {$estado} {$cidade} location map.svg");

                if (isset($requestWiki->query->search[0])) {

                    $requestWiki = $requestWiki->query->search[0];
                    
                    $mapa = $wikiService->getFicheiro($requestWiki->title);
                    if (isset($mapa->query->pages->{'-1'}->imageinfo)) {
                        $mapa = $mapa->query->pages->{'-1'}->imageinfo[0]->url;
                    } else {
                        $mapa = null;
                    }
                }

                $ibgeService = new IBGEService();
                $urlAmigavel = strtolower(str_replace(' ', '-', $cidade));
                $urlAmigavel = preg_replace('/[`^~\'"]/', '', iconv( 'UTF-8', 'ASCII//TRANSLIT', $urlAmigavel));
                $result = $ibgeService->getMunicipios($urlAmigavel);

                if ((is_array($result) && count($result) > 0) || is_object($result)) {

                    if (is_array($result)) {
                        $result = collect($result)->filter(function ($item) use ($uf) {
                            return $item->microrregiao->mesorregiao->UF->sigla == $uf;
                        })->first();
                    }
        
                    $resultIndicadores = $ibgeService->getIndicadores($result->id);
                    
                    $areaTerritorial = collect($resultIndicadores)->filter(function ($item) {
                        return $item->id == 96414;
                    })->first();
        
                    $areaTerritorial = (float) $areaTerritorial->res[0]->res->{array_key_first((array) $areaTerritorial->res[0]->res)};
        
                    $populacao = collect($resultIndicadores)->filter(function ($item) {
                        return $item->id == 96385;
                    })->first();
        
                    $populacao = (float) $populacao->res[0]->res->{array_key_first((array) $populacao->res[0]->res)};

                    $resultBiblioteca = $ibgeService->getBiblioteca($result->id);
                    if (isset($resultBiblioteca->{$result->id})) {
                        $resultBiblioteca = $resultBiblioteca->{$result->id};
                        $gentilico = $resultBiblioteca->GENTILICO;
                        $historico = $resultBiblioteca->HISTORICO;
                        $formacaoAdministrativa = $resultBiblioteca->FORMACAO_ADMINISTRATIVA;
                    }
                }

                return [
                    'cidade' => $cidade,
                    'estado' => $estado,
                    'imagem_bandeira_url' => $bandeira,
                    'historia' => $historico ?? $descricao,
                    'formacao_administrativa' => $formacaoAdministrativa ?? null,
                    'dados_gerais' => [
                        'regiao' => $regiao,
                        'governo' => 'Democracia representativa',
                        'area_territorial_em_km2' => $areaTerritorial ?? null,
                        'populacao' => $populacao ?? null,
                        'gentilico' => $gentilico ?? null,
                    ],
                    'imagem_mapa_url' => $mapa ?? null,
                    'fotos' => [],
                ];
            });

            return apiResponse(false, 'Sem erros!', $data);

        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }
}
