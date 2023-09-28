<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class PontoSugerido extends Model
{
    use HasFactory;

    protected $fillable = [
        'subcategoria_id',
        'cliente_id',
        'fsq_id',
        'nome',
        'endereco',
        'lat',
        'lon',
    ];

    protected static function booted()
    {
        static::creating(fn (PontoSugerido $pontoSugerido) => $pontoSugerido->uuid = (string) Uuid::uuid4());
    }

    public function imagens()
    {
        return $this->hasMany(PontoSugeridoImagem::class);
    }

    public function subcategoria()
    {
        return $this->belongsTo(Subcategoria::class);    
    }

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);    
    }

    public function horarios()
    {
        return $this->hasMany(PontoSugeridoHorario::class);
    }
}
