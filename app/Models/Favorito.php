<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorito extends Model
{
    use HasFactory;

    protected $fillable = [
        'cliente_id',
        'ponto_turistico_id',
        'nome',
        'endereco',
        'imagem',
        'subcategoria_id'
    ];

    public function subcategoria()
    {
        return $this->belongsTo(Subcategoria::class);
    }
}
