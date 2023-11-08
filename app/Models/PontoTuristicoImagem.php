<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PontoTuristicoImagem extends Model
{
    use HasFactory;

    protected $fillable = [
        'ponto_turistico_id',
        'imagem',
    ];

    public function pontoTuristico()
    {
        return $this->belongsTo(PontoTuristico::class);
    }

    public function getImagemAttribute($value)
    {
        return route('imagem.render', 'locais/m/' . $value);
    }
}
