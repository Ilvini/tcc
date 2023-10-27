<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PontoSugeridoHorario extends Model
{
    use HasFactory;

    protected $fillable = [
        'ponto_sugerido_id',
        'dia_semana',
        'abertura',
        'fechamento',
        'dia_todo',
    ];

    public function pontoSugerido()
    {
        return $this->belongsTo(PontoSugerido::class);
    }
}
