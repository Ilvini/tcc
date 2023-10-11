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

    protected $appends = [
        'aberto',
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

    public function informacoes()
    {
        return $this->hasMany(PontoTuristicoInformacao::class);
    }

    public function getAbertoAttribute()
    {
        $diaSemanaAgora = date('w');

        if ($diaSemanaAgora == 0) {
            $diaSemanaAgora = 7;
        } else {
            $diaSemanaAgora++;
        }

        $horario = $this->horarios->where('dia_semana', $diaSemanaAgora)->first();

        if ($horario) {
            if ($horario->dia_todo) {
                return true;
            } else {
                $abertura = explode(':', $horario->abertura);
                $fechamento = explode(':', $horario->fechamento);

                $auxAbertura = $abertura[0] . $abertura[1];
                $auxFechamento = $fechamento[0] . $fechamento[1];

                $horaAtual = date('Hi');

                if ($horaAtual >= $auxAbertura && $horaAtual <= $auxFechamento) {
                    return true;
                }
            }
        }

        return false;
    }
}
