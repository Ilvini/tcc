<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\PontoTuristicoResource;
use App\Models\PontoSugerido;
use App\Models\PontoTuristico;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PontoTuristicoController extends Controller
{
    public function index(Request $request)
    {
        try {

            $lat = $request->lat;
            $lon = $request->lon;
            $raio = $request->raio; // Em metros

            // Rever esse cálculo depois
            $pontosTuristicos = PontoTuristico::selectRaw("*, (6371 * acos(cos(radians($lat)) * cos(radians(lat)) * cos(radians(lon) - radians($lon)) + sin(radians($lat)) * sin(radians(lat)))) AS distancia")->havingRaw("distancia < $raio")->orderBy('distancia')->get();

            return apiResponse(false, 'Sem erros!', PontoTuristicoResource::collection($pontosTuristicos));

        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }

    public function detalhe($uuid)
    {
        try {

            $pontoTuristico = PontoTuristico::where('uuid', $uuid)->first();

            if (!$pontoTuristico) {
                return apiResponse(true, 'Ponto turístico não encontrado', null, 404);
            }

            return apiResponse(false, 'Sem erros!', new PontoTuristicoResource($pontoTuristico));

        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }

    public function create(Request $request)
    {
        try {

            PontoSugerido::create([
                'uuid' => $request->uuid,
                'nome' => $request->nome,
                'endereco' => $request->endereco,
                'lat' => $request->lat,
                'lon' => $request->lon,
            ]);

            return apiResponse(false, 'Cadastro realizado com sucesso!');

        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }
}
