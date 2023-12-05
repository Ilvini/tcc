<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evento extends Model
{
    use HasFactory;

    protected $fillable = [
        'local_id',
        'nome',
        'descricao',
        'gratuito',
        'endereco',
        'valor',
        'imagem_url',
        'ingresso_url',
        'data_de_inicio',
        'data_de_fim',
        'cidade',
        'uf',
    ];
}
