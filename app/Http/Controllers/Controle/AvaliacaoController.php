<?php

namespace App\Http\Controllers\Controle;

use App\Http\Controllers\Controller;
use App\Models\PontoTuristicoAvaliacao;

class AvaliacaoController extends Controller
{
    public function index()
    {
        $avaliacoes = PontoTuristicoAvaliacao::where('aprovado', false)->get();

        return view('controle.avaliacoes.index', compact('avaliacoes'));
    }

    public function aprovar($id)
    {
        $avaliacao = PontoTuristicoAvaliacao::findOrFail($id);

        $avaliacao->aprovado = true;
        $avaliacao->save();

        return redirect()->route('controle.avaliacoes.index')->with('success', 'Avaliação aprovada com sucesso!');
    }

    public function reprovar($id)
    {
        $avaliacao = PontoTuristicoAvaliacao::findOrFail($id);

        $avaliacao->delete();

        return redirect()->route('controle.avaliacoes.index')->with('success', 'Avaliação reprovada com sucesso!');
    }
}
