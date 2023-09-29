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
        if (isset($this->uuid)) {
            return [
                'uuid' => $this->uuid,
                'nome' => $this->nome,
                'endereco' => $this->endereco,
                'avaliacao_media' => $this->avaliacoes->avg('estrelas'),
                'avaliacoes' => AvaliacaoResource::collection($this->avaliacoes),
                'informacoes_adicionais' => InformacaoResource::collection($this->informacoes)->collection->groupBy('tipo'),
            ];
        } else {
            return [
                'uuid' => $this->fsq_id,
                'nome' => $this->name,
                'endereco' => $this->location->formatted_address,
                'avaliacao_media' => $this->rating / 2,
                'avaliacoes' => [],
                'informacoes_adicionais' => [],
            ];
        }
    }
}
