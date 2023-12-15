<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class IBGEService
{
    private function request($metodo, $url, $data)
    {
        $response = Http::withoutVerifying()
        ->withHeaders([
            'accept' => 'application/json'
        ])
        ->withOptions(["verify"=>false])
        ->$metodo($url);

        if ($response->status() !== 200) {
            Log::error('Erro ao conectar com a API do IBGE', [
                'url' => $url,
                'data' => $data,
                'response' => $response->body(),
            ]);

            return false;
        }

        return json_decode($response->body());
    }

    public function getMunicipios($urlAmigavel)
    {
        $uri = "https://servicodados.ibge.gov.br/api/v1/localidades/municipios/{$urlAmigavel}";
        
        return $this->request('get', $uri, []);
    }

    public function getIndicadores($codMunicipio)
    {
        $idsIndicadores = '96385|96414';
        $uri = "https://servicodados.ibge.gov.br/api/v1/pesquisas/indicadores/{$idsIndicadores}/resultados/{$codMunicipio}";
        
        return $this->request('get', $uri, []);
    }

    public function getBiblioteca($codMunicipio)
    {
        $uri = "https://servicodados.ibge.gov.br/api/v1/biblioteca?aspas=3&codmun={$codMunicipio}";
        
        return $this->request('get', $uri, []);
    }
}
