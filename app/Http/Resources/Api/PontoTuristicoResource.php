<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Resources\Json\JsonResource;

class PontoTuristicoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'uuid' => $this->uuid,
            'fsq_id' => $this->fsq_id,
            'nome' => $this->nome,
            'endereco' => $this->endereco,
            'lat' => $this->lat,
            'lon' => $this->lon,
            'avaliacao_media' => $this->avaliacoes->avg('estrelas'),
            'avaliacoes' => AvaliacaoResource::collection($this->avaliacoes),
            'informacoes-adicionais' => InformacaoResource::collection($this->informacoes)->collection->groupBy('tipo'),
        ];
    }
}
