<?php

namespace App\Repositories;

use App\Services\GoogleService;

class GooglePontoTuristicoRepository implements PontoTuristicoRepository
{
    private GoogleService $googleService;

    public function __construct()
    {
        $this->googleService = new GoogleService();
    }

    public function buscar($lat, $lon, $raio, $categorias)
    {
        $categorias = implode(',', $categorias);
        return $this->googleService->placeSearch($lat, $lon, $raio, $categorias);
    }

    public function detalhe($id)
    {
        return $this->googleService->getPlaceDetails($id);
    }
}
