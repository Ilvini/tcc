<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avaliacao extends Model
{
    use HasFactory;

    protected $fillable = [
        'cliente_id',
        'fsq_id',
        'estrelas',
        'comentario',
    ];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }
}
