<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PontoTuristicoInformacao extends Model
{
    use HasFactory;

    protected $fillable = [
        'cliente_id',
        'ponto_turistico_id',
        'tipo',
        'titulo',
        'descricao',
        'aprovado',
    ];

    public function pontoTuristico()
    {
        return $this->belongsTo(PontoTuristico::class);
    }

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }
}
