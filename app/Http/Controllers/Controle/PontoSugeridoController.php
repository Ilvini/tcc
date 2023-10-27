<?php

namespace App\Http\Controllers\Controle;

use App\Http\Controllers\Controller;
use App\Models\PontoSugerido;
use App\Models\PontoTuristico;

class PontoSugeridoController extends Controller
{
    public function index()
    {
        $pontoSugeridos = PontoSugerido::all();

        return view('controle.pontos-sugeridos.index', compact('pontoSugeridos'));
    }

    public function aprovar($id)
    {
        $pontoSugerido = PontoSugerido::findOrFail($id);

        PontoTuristico::create([
            'subcategoria_id' => $pontoSugerido->subcategoria_id,
            'nome' => $pontoSugerido->nome,
            'endereco' => $pontoSugerido->endereco,
            'lat' => $pontoSugerido->lat,
            'lon' => $pontoSugerido->lon,
        ]);

        $pontoSugerido->delete();

        return redirect()->route('controle.pontos-sugeridos.index')->with('success', 'Ponto sugerido aprovado com sucesso!');
    }

    public function reprovar($id)
    {
        $pontoSugerido = PontoSugerido::findOrFail($id);

        $pontoSugerido->delete();

        return redirect()->route('controle.pontos-sugeridos.index')->with('success', 'Ponto sugerido reprovado com sucesso!');
    }
}
