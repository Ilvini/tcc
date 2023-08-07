<?php

namespace App\Http\Controllers\Controle;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DashboardController extends Controller
{
    public function ordenacao(Request $request)
    {
        $input = $request->except('_token');
        $obj   = '\App\Models\\' . $input['obj'];

        $obj = new $obj;

        if (isset($input) && count($input)) {
            foreach ($input['id'] as $ordem => $id) {
                $obj->find($id)->update(['ordem' => $ordem]);
            }
        }
        exit;
    }

    public function selectload(Request $request)
    {
        $return = DB::table($request->get('tabela'))
        ->whereRaw(str_replace("]", "", str_replace("[", "", $request->get('chave'))) . ' = ' . $request->get('id'));

        if (Schema::hasColumn($request->get('tabela'), 'deleted_at')){
            $return->whereNull('deleted_at');
        }

        if (Schema::hasColumn($request->get('tabela'), 'nome')) {
            $orderby = 'nome';
        }
        if (Schema::hasColumn($request->get('tabela'), 'name')) {
            $orderby = 'name';
        }
        if (Schema::hasColumn($request->get('tabela'), 'titulo')) {
            $orderby = 'titulo';
        }

        $return = $return->orderBy($orderby, 'asc')->pluck($orderby, 'id');

        return response(['json' => $return->toArray()]);
    }
}
