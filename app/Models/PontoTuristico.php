<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class PontoTuristico extends Model
{
    use HasFactory;

    protected $fillable = [
        'subcategoria_id',
        'fsq_id',
        'nome',
        'endereco',
        'lat',
        'lon',
    ];

    protected static function booted()
    {
        static::creating(fn (PontoTuristico $pontoTuristico) => $pontoTuristico->uuid = (string) Uuid::uuid4());
    }

    public function imagens()
    {
        return $this->hasMany(PontoTuristicoImagem::class);
    }

    public function subcategoria()
    {
        return $this->belongsTo(Subcategoria::class);    
    }

    public function horarios()
    {
        return $this->hasMany(PontoTuristicoHorario::class);
    }

    public function avaliacoes()
    {
        return $this->hasMany(PontoTuristicoAvaliacao::class);
    }
}
