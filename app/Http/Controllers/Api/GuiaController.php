<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ListarGuiaRequest;
use App\Http\Resources\Api\GuiaResource;
use App\Models\Guia;
use Illuminate\Support\Facades\Log;

class GuiaController extends Controller
{
    public function index(ListarGuiaRequest $request)
    {
        try {
            
            $guias = Guia::where('validade', '>=', date('Y-m-d'))
                ->where('uf', $request->estado)
                ->where('cidades_atuacao', 'like', '%'.$request->cidade.'%')
                ->orderBy('nome')
                ->get();

            return apiResponse(false, 'Sem erros', GuiaResource::collection($guias));
        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }
}
