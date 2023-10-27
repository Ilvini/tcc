<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PontoTuristicoHorario extends Model
{
    use HasFactory;

    protected $fillable = [
        'ponto_turistico_id',
        'dia_semana',
        'abertura',
        'fechamento',
        'dia_todo',
    ];

    public function pontoTuristico()
    {
        return $this->belongsTo(PontoTuristico::class);
    }
}
