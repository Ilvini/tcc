<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\NovaInformacaoRequest;
use App\Http\Resources\Api\InformacaoResource;
use App\Models\PontoTuristicoInformacao;
use Illuminate\Support\Facades\Log;

class InformacaoController extends Controller
{
    public function tipos()
    {
        return apiResponse(false, 'Sem erros!', tipoInformacao());
    }

    public function index($uuid)
    {
        try {

            $informacoes = PontoTuristicoInformacao::where('ponto_turistico_id', $uuid)->where('aprovado', '1')->get();

            return apiResponse(false, 'Sem erros!', InformacaoResource::collection($informacoes)->collection->groupBy('tipo'));

        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }

    public function create($uuid, NovaInformacaoRequest $request)
    {
        try {

            PontoTuristicoInformacao::create([
                'ponto_turistico_id' => $uuid,
                'cliente_id' => auth()->id(),
                'tipo' => $request->tipo,
                'titulo' => $request->titulo,
                'descricao' => $request->descricao,
            ]);

            return apiResponse(false, 'Obrigado por sua contribuição');

        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }
}
