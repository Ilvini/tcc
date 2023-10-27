<?php

use App\Services\ApiMessage;

if (!function_exists('apiResponse')) {
    function apiResponse(bool $error, string $message, mixed $data = [], int $status = 200) {
        return response()->json((new ApiMessage($error, $message, $data))->getResponse(), $status);
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
