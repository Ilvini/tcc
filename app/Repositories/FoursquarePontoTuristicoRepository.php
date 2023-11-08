<?php

namespace App\Repositories;

use App\Services\FoursquareService;

class FoursquarePontoTuristicoRepository implements PontoTuristicoRepository
{
    private FoursquareService $foursquareService;

    public function __construct()
    {
        $this->foursquareService = new FoursquareService();
    }

    public function buscar($lat, $lon, $raio, $categorias)
    {
        $categorias = implode(',', $categorias);
        return $this->foursquareService->placeSearch($lat, $lon, $raio, $categorias);
    }

    public function detalhe($id)
    {
        return $this->foursquareService->getPlaceDetails($id);
    }
}
