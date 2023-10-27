<?php

namespace App\Http\Controllers\Controle;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use App\Models\Subcategoria;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    public function index()
    {
        $dbCategorias = Categoria::with('subcategorias')->orderBy('ordem')->get();

        $categorias = [];

        foreach ($dbCategorias as $dbCategoria) {
            $categorias[$dbCategoria->nome] = $dbCategoria->subcategorias()->where('ativo', 0)->pluck('nome', 'id')->toArray();
        }

        $selecionados = Subcategoria::where('ativo', 1)->get()->groupBy('categoria_id');

        return view('controle.categorias.index', compact('categorias', 'selecionados'));
    }

    public function store(Request $request)
    {
        $input = $request->all();

        foreach ($input['categorias'] as $categoria) {
            $subcategoria = Subcategoria::find($categoria);
            $subcategoria->ativo = 1;
            $subcategoria->save();
        }

        return redirect()->route('controle.categorias.index')->with('success', 'Categorias adicionadas com sucesso!');
    }

    public function delete($id)
    {
        $subcategoria = Subcategoria::find($id);
        $subcategoria->ativo = 0;
        $subcategoria->save();

        return redirect()->route('controle.categorias.index')->with('success', 'Categoria removida com sucesso!');
    }
}
