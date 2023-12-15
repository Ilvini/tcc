<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ListarEventoRequest;
use App\Http\Resources\Api\EventoResource;
use App\Models\Evento;
use Illuminate\Support\Facades\Log;

class EventoController extends Controller
{
    public function index(ListarEventoRequest $request)
    {
        try {
            
            $guias = Evento::where('uf', $request->estado)
                ->where('cidade', 'like', '%'.$request->cidade.'%')
                ->orderBy('data_de_inicio', 'asc')
                ->get();

            return apiResponse(false, 'Sem erros', EventoResource::collection($guias));
        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }
}
