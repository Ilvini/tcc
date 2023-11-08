<?php

namespace App\Repositories;

interface PontoTuristicoRepository
{
    public function buscar($lat, $lon, $raio, $categorias);

    public function detalhe($id);
}
