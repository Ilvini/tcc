<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Fluent;

class GoogleService
{
    private function request($metodo, $url, $data, $campos)
    {
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'X-Goog-Api-Key' => env('GOOGLE_API_KEY'),
            'X-Goog-FieldMask' => $campos,
        ])->$metodo($url, $data);

        if ($response->status() !== 200) {
            Log::error('Erro ao conectar com a API do Google', [
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

    public function placeSearch($lat, $lon, $radius = 1000, $categorias)
    {

        $uri = "https://places.googleapis.com/v1/places:searchNearby";

        $data = [
            // 'includedTypes' => ['restaurant'],
            'maxResultCount' => 20,
            'languageCode' => 'pt',
            'rankPreference' => 'POPULARITY',
            'locationRestriction' => [
                'circle' => [
                    'center' => [
                            'latitude' => $lat,
                            'longitude' => $lon,
                    ],
                    'radius' => $radius,
                ],
            ],
        ];

        $fields = 'places.id,places.displayName,places.location,places.formattedAddress,places.primaryType,places.types,places.primaryTypeDisplayName,places.iconMaskBaseUri,places.photos,places.rating';
        
        return $this->request('post', $uri, $data, $fields);
    }

    public function getPlaceDetails($id)
    {
        $uri = "https://places.googleapis.com/v1/places/{$id}";

        $data = [
            'languageCode' => 'pt',
        ];

        $fields = 'id,displayName,location,formattedAddress,primaryType,primaryTypeDisplayName,iconMaskBaseUri,photos,rating,regularOpeningHours,reviews';
        
        return $this->request('get', $uri, $data, $fields);
    }
}
