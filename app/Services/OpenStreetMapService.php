<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class OpenStreetMapService
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
            Log::error('Erro ao conectar com a API do OpenStreetMap', [
                'url' => $url,
                'data' => $data,
                'response' => $response->body(),
            ]);

            return false;
        }

        return json_decode($response->body());
    }

    public function getMunicipio($lat, $lon)
    {
        $uri = "https://nominatim.openstreetmap.org/reverse?lat={$lat}&lon={$lon}&zoom=1000&addressdetails=1&format=json";
        
        return $this->request('get', $uri, []);
    }
}
