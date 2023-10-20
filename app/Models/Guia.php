<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guia extends Model
{
    use HasFactory;

    protected $fillable = [
        'n_certificado',
        'uf',
        'municipio',
        'nome',
        'telefone',
        'email',
        'site',
        'validade',
        'cidades_atuacao',
        'categorias',
        'segmentos',
        'idiomas',
        'motorista',
    ];
}
