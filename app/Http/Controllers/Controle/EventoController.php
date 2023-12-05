<?php

namespace App\Http\Controllers\Controle;

use App\Http\Controllers\Controller;
use App\Models\Evento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EventoController extends Controller
{
    public function index()
    {
        $eventos = Evento::paginate(20);

        return view('controle.eventos.index', compact('eventos'));
    }

    public function create()
    {
        return view('controle.eventos.form');
    }

    public function store(Request $request)
    {
        try {

            $input = $request->all();

            Evento::create($input);
    
            return redirect()->route('controle.eventos.index')->with('success', 'Evento cadastrado com sucesso!');

        } catch (\Throwable $th) {
            Log::error($th);
            return redirect()->back()->with('error', 'Erro ao cadastrar ponto turístico!')->withInput($input);
        }
    }

    public function edit($id)
    {
        $evento = Evento::findOrFail($id);

        return view('controle.eventos.form', compact('evento'));
    }

    public function update(Request $request, $id)
    {
        try {

            $input = $request->all();

            $evento = Evento::findOrFail($id);
            $evento->update($input);
    
            return redirect()->route('controle.eventos.index')->with('success', 'Evento atualizado com sucesso!');

        } catch (\Throwable $th) {
            Log::error($th);
            return redirect()->back()->with('error', 'Erro ao atualizar ponto turístico!')->withInput($input);
        }
    }

    public function destroy($id)
    {
        try {

            $evento = Evento::findOrFail($id);
            $evento->delete();
    
            return redirect()->route('controle.eventos.index')->with('success', 'Evento excluído com sucesso!');

        } catch (\Throwable $th) {
            Log::error($th);
            return redirect()->back()->with('error', 'Erro ao excluir ponto turístico!');
        }
    }
}
