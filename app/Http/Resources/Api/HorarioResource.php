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

            if (isset($this->abertura)) {
                $abertura = explode(':', $this->abertura);
                $horario = $abertura[0] .':'. $abertura[1];
            }

            if (isset($this->fechamento)) {
                $fechamento = explode(':', $this->fechamento);
                $horario .= ' ás ' . $fechamento[0] .':'. $fechamento[1];
            }

            if (isset($this->abertura_2)) {
                $abertura_2 = explode(':', $this->abertura_2);
                $fechamento_2 = explode(':', $this->fechamento_2);
                $horario .= ' e ' . $abertura_2[0] .':'. $abertura_2[1] . ' ás ' . $fechamento_2[0] .':'. $fechamento_2[1];
            }
        }

        return [
            'nome' => diaSemana($this->dia_semana),
            'horario' => $horario,
        ];
    }
}
