<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Resources\Json\JsonResource;

class HorarioResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $horario = '';

        if ($this->dia_todo) {
            $horario = 'Aberto 24 horas';
        } else {
            $abertura = explode(':', $this->abertura);
            $fechamento = explode(':', $this->fechamento);

            $horario = $abertura[0] .':'. $abertura[1] . ' ás ' . $fechamento[0] .':'. $fechamento[1];
        }

        return [
            'nome' => diaSemana($this->dia_semana),
            'horario' => $horario,
        ];
    }
}
