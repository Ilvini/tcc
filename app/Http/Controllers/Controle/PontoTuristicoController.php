<?php

namespace App\Http\Controllers\Controle;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use App\Models\PontoTuristico;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PontoTuristicoController extends Controller
{
    public function index()
    {
        $pontoTuristicos = PontoTuristico::paginate(20);

        return view('controle.pontos-turisticos.index', compact('pontoTuristicos'));
    }

    public function create()
    {
        $dbCategorias = Categoria::with('subcategorias')->orderBy('ordem')->get();
        $categorias = [];
        foreach ($dbCategorias as $dbCategoria) {
            $categorias[$dbCategoria->nome] = $dbCategoria->subcategorias->pluck('nome', 'id')->toArray();
        }

        return view('controle.pontos-turisticos.form', compact('categorias'));
    }

    public function store(Request $request)
    {
        try {

            $input = $request->all();

            $input['lat'] = round($input['lat'], 6);
            $input['lon'] = round($input['lon'], 6);

            PontoTuristico::create($input);
    
            return redirect()->route('controle.pontos-turisticos.index')->with('msg', 'Ponto turístico cadastrado com sucesso!');

        } catch (\Throwable $th) {
            Log::error($th);
            return redirect()->back()->with('error', 'Erro ao cadastrar ponto turístico!')->withInput($input);
        }
    }

    public function edit($id)
    {
        $pontoTuristico = PontoTuristico::findOrFail($id);

        $dbCategorias = Categoria::with('subcategorias')->orderBy('ordem')->get();
        $categorias = [];
        foreach ($dbCategorias as $dbCategoria) {
            $categorias[$dbCategoria->nome] = $dbCategoria->subcategorias->pluck('nome', 'id')->toArray();
        }

        return view('controle.pontos-turisticos.form', compact('pontoTuristico', 'categorias'));
    }

    public function update(Request $request, $id)
    {
        try {

            $input = $request->all();

            $input['lat'] = round($input['lat'], 6);
            $input['lon'] = round($input['lon'], 6);

            $pontoTuristico = PontoTuristico::findOrFail($id);
            $pontoTuristico->update($input);
    
            return redirect()->route('controle.pontos-turisticos.index')->with('msg', 'Ponto turístico atualizado com sucesso!');

        } catch (\Throwable $th) {
            Log::error($th);
            return redirect()->back()->with('error', 'Erro ao atualizar ponto turístico!')->withInput($input);
        }
    }

    public function delete($id)
    {
        try {

            $pontoTuristico = PontoTuristico::findOrFail($id);
            $pontoTuristico->delete();
    
            return redirect()->route('controle.pontos-turisticos.index')->with('msg', 'Ponto turístico excluído com sucesso!');

        } catch (\Throwable $th) {
            Log::error($th);
            return redirect()->back()->with('error', 'Erro ao excluir ponto turístico!');
        }
    }

    public function horarios($id)
    {
        $pontoTuristico = PontoTuristico::findOrFail($id);

        return view('controle.pontos-turisticos.horarios', compact('pontoTuristico'));
    }

    public function updateHorarios(Request $request, $id)
    {
        try {

            $input = $request->all();

            $pontoTuristico = PontoTuristico::findOrFail($id);

            foreach ($input['horarios'] as $dia => $horario) {
                $pontoTuristico->horarios()->updateOrCreate([
                    'dia_semana' => $dia + 1,
                ], [
                    'abertura' => isset($horario['dia_todo']) ? null : $horario['abertura'],
                    'fechamento' => isset($horario['dia_todo']) ? null : $horario['fechamento'],
                    'dia_todo' => $horario['dia_todo'] ?? false,
                ]);
            }
    
            return redirect()->back()->with('msg', 'Horários atualizados com sucesso!');

        } catch (\Throwable $th) {
            Log::error($th);
            return redirect()->back()->with('error', 'Erro ao atualizar horários!')->withInput($input);
        }
    }
}
