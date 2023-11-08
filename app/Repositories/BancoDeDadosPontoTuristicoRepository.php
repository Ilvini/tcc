<?php

namespace App\Repositories;

use App\Models\PontoTuristico;

class BancoDeDadosPontoTuristicoRepository implements PontoTuristicoRepository
{
    public function buscar($lat, $lon, $raio, $categorias)
    {
        return PontoTuristico::select('*')
            ->selectRaw(
                '(6371 * acos(cos(radians(?)) * cos(radians(lat)) * cos(radians(lon) - radians(?)) + sin(radians(?)) * sin(radians(lat)))) AS distancia',
                [$lat, $lon, $lat]
            )
            ->having('distancia', '<=', $raio)
            ->whereIn('subcategoria_id', $categorias)
            ->orderBy('distancia')
            ->get();
    }

    public function detalhe($uuid)
    {
        return PontoTuristico::where('uuid', $uuid)->first();
    }
}
