<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\AvaliacaoResource;
use App\Models\Avaliacao;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AvaliacaoController extends Controller
{
    public function index($fsq_id)
    {
        try {

            $avaliacoes = Avaliacao::where('fsq_id', $fsq_id)->get();

            return apiResponse(false, 'Sem erros!', AvaliacaoResource::collection($avaliacoes));

        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }

    public function create($fsq_id, Request $request)
    {
        try {

            Avaliacao::create([
                'cliente_id' => auth()->id(),
                'fsq_id' => $fsq_id,
                'estrelas' => $request->estrelas,
                'comentario' => $request->comentario,
            ]);

            return apiResponse(false, 'Obrigado por sua avaliação');

        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }
}
