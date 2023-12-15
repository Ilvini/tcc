<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PontoTuristicoAvaliacao extends Model
{
    use HasFactory;

    protected $fillable = [
        'cliente_id',
        'ponto_turistico_id',
        'estrelas',
        'comentario',
        'aprovado',
    ];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }

    public function pontoTuristico()
    {
        return $this->belongsTo(PontoTuristico::class);
    }
}
