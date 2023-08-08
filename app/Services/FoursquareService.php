<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Fluent;

class FoursquareService
{
    private function request($metodo, $url, $data)
    {
        $response = Http::withoutVerifying()
        ->withHeaders([
            'Authorization' => env('FOURSQUARE_API_KEY'),
            'accept' => 'application/json'
        ])
        ->withOptions(["verify"=>false])
        ->$metodo($url);

        if ($response->status() !== 200) {
            Log::error('Erro ao conectar com a API da Foursquare', [
                'url' => $url,
                'data' => $data,
                'response' => $response->body(),
            ]);
        }

        return new Fluent([
            'status' => $response->status(),
            'body' => $response->body(),
        ]);
    }

    public function placeSearch($ll, $radius = 1000)
    {
        $categorias = '10000,13000,14000,16000,18000,19000';

        $fields = 'fsq_id,name,geocodes,photos,popularity';

        $uri = "https://api.foursquare.com/v3/places/search?fields={$fields}&categories={$categorias}&ll={$ll}&radius={$radius}";
        
        return $this->request('get', $uri, []);
    }

    public function getPlaceDetails($fsq_id)
    {
        $fields = 'fsq_id,name,geocodes,location,photos,rating';

        $uri = "https://api.foursquare.com/v3/places/{$fsq_id}?fields={$fields}";
        
        return $this->request('get', $uri, []);
    }
}