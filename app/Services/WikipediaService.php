<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WikipediaService
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
            Log::error('Erro ao conectar com a API da Wikipédia', [
                'url' => $url,
                'data' => $data,
                'response' => $response->body(),
            ]);

            return false;
        }

        return json_decode($response->body());
    }

    public function search($title)
    {
        $uri = "https://pt.wikipedia.org/w/api.php?action=query&list=search&srsearch={$title}&utf8=&format=json";
        
        return $this->request('get', $uri, []);
    }

    public function getDetails($title)
    {
        $uri = "https://pt.wikipedia.org/w/api.php?action=query&prop=extracts&exlimit=1&titles={$title}&explaintext=1&exsectionformat=plain&format=json";
        
        return $this->request('get', $uri, []);
    }
}