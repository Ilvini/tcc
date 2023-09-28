<?php

namespace App\Http\Controllers\Controle;

use App\Http\Controllers\Controller;
use App\Models\PontoTuristicoInformacao;

class InformacaoController extends Controller
{
    public function index()
    {
        $informacoes = PontoTuristicoInformacao::where('aprovado', false)->get();

        return view('controle.informacoes.index', compact('informacoes'));
    }

    public function aprovar($id)
    {
        $avaliacao = PontoTuristicoInformacao::findOrFail($id);

        $avaliacao->aprovado = true;
        $avaliacao->save();

        return redirect()->route('controle.informacoes.index')->with('success', 'Aprovada com sucesso!');
    }

    public function reprovar($id)
    {
        $avaliacao = PontoTuristicoInformacao::findOrFail($id);

        $avaliacao->delete();

        return redirect()->route('controle.informacoes.index')->with('success', 'Aeprovada com sucesso!');
    }
}
