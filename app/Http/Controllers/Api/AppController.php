<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ContatoRequest;
use App\Http\Requests\Api\NovaAvaliacaoRequest;
use App\Models\AppAvaliacao;
use App\Models\AppContato;
use Illuminate\Support\Facades\Log;

class AppController extends Controller
{
    public function create(NovaAvaliacaoRequest $request)
    {
        try {

            AppAvaliacao::create([
                'cliente_id' => auth()->id(),
                'estrelas' => $request->estrelas,
                'comentario' => $request->comentario,
            ]);

            return apiResponse(false, 'Obrigado por sua avaliação');

        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }

    public function contato(ContatoRequest $request)
    {
        try {
            
            $data = $request->validated();

            AppContato::create($data);

            return apiResponse(false, 'Obrigado por entrar em contato, retornaremos em breve');
            
        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }
}
