<?php

use App\Classes\FoursquarePontoTuristico;
use App\Classes\GooglePontoTuristico;
use App\Models\PontoTuristico;
use App\Services\ApiMessage;
use Illuminate\Support\Fluent;

if (!function_exists('apiResponse')) {
    function apiResponse(bool $error, string $message, mixed $data = [], int $status = 200) {
        return response()->json((new ApiMessage($error, $message, $data))->getResponse(), $status);
    }
}

if (!function_exists('pontoTuristicoMisto')) {
    function pontoTuristicoMisto(PontoTuristico $pontoTuristico = null, FoursquarePontoTuristico $foursquarePontoTuristico) {
        return new Fluent([
            'uuid' => $pontoTuristico->uuid ?? $foursquarePontoTuristico->uuid,
            'subcategoria_id' => $pontoTuristico->subcategoria_id ?? $foursquarePontoTuristico->subcategoria_id,
            'subcategoria' => $pontoTuristico->subcategoria ?? $foursquarePontoTuristico->subcategoria,
            'fsq_id' => $pontoTuristico->fsq_id ?? $foursquarePontoTuristico->fsq_id,
            'nome' => $pontoTuristico->nome ?? $foursquarePontoTuristico->nome,
            'endereco' => $pontoTuristico->endereco ?? $foursquarePontoTuristico->endereco,
            'lat' => $pontoTuristico->lat ?? $foursquarePontoTuristico->lat,
            'lon' => $pontoTuristico->lon ?? $foursquarePontoTuristico->lon,
            'avaliacao' => $pontoTuristico->avaliacao ?? $foursquarePontoTuristico->avaliacao,
            'popularidade' => $pontoTuristico->popularidade ?? $foursquarePontoTuristico->popularidade,
            'aberto' => $pontoTuristico->aberto ?? $foursquarePontoTuristico->aberto,
            'horarios' => $pontoTuristico->horarios ?? $foursquarePontoTuristico->horarios,
            'horarios_populares' => $pontoTuristico->horarios_populares ?? $foursquarePontoTuristico->horarios_populares,
            'imagens' => $pontoTuristico->imagens ?? $foursquarePontoTuristico->imagens,
        ]);
    }
}

if (!function_exists('pontoTuristicoMistoGoogle')) {
    function pontoTuristicoMistoGoogle(PontoTuristico $pontoTuristico = null, GooglePontoTuristico $googlePontoTuristico) {
        return new Fluent([
            'uuid' => $pontoTuristico->uuid ?? $googlePontoTuristico->uuid,
            'subcategoria_id' => $pontoTuristico->subcategoria_id ?? $googlePontoTuristico->subcategoria_id,
            'subcategoria' => $pontoTuristico->subcategoria ?? $googlePontoTuristico->subcategoria,
            'fsq_id' => $pontoTuristico->fsq_id ?? $googlePontoTuristico->fsq_id,
            'nome' => $pontoTuristico->nome ?? $googlePontoTuristico->nome,
            'endereco' => $pontoTuristico->endereco ?? $googlePontoTuristico->endereco,
            'lat' => $pontoTuristico->lat ?? $googlePontoTuristico->lat,
            'lon' => $pontoTuristico->lon ?? $googlePontoTuristico->lon,
            'avaliacao' => $pontoTuristico->avaliacao ?? $googlePontoTuristico->avaliacao,
            'popularidade' => $pontoTuristico->popularidade ?? $googlePontoTuristico->popularidade,
            'aberto' => $pontoTuristico->aberto ?? $googlePontoTuristico->aberto,
            'horarios' => $pontoTuristico->horarios ?? $googlePontoTuristico->horarios,
            'horarios_populares' => $pontoTuristico->horarios_populares ?? $googlePontoTuristico->horarios_populares,
            'imagens' => $pontoTuristico->imagens ?? $googlePontoTuristico->imagens,
        ]);
    }
}

if (!function_exists('diaSemana')) {
    function diaSemana(int $dia) {
        switch ($dia) {
            case 1:
                return 'Domingo';
            case 2:
                return 'Segunda-feira';
            case 3:
                return 'Terça-feira';
            case 4:
                return 'Quarta-feira';
            case 5:
                return 'Quinta-feira';
            case 6:
                return 'Sexta-feira';
            case 7:
                return 'Sábado';
        }
    }
}

if (!function_exists('tipoInformacao')) {
    function tipoInformacao() {
        return [
            'Descricao',
            'Curiosidade',
            'Dica',
            'Historia',
            'Lenda',
            'Outro',
        ];
    }
}
