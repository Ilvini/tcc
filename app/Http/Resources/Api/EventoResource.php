<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Resources\Json\JsonResource;

class EventoResource extends JsonResource
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
            'id' => (int) $this->id,
            'nome' => $this->nome,
            'descricao' => $this->descricao,
            'gratuito' => (bool) $this->gratuito,
            'valor' => $this->valor,
            'imagem_url' => $this->imagem_url,
            'ingresso_url' => $this->ingresso_url,
            'data_de_inicio' => $this->data_de_inicio,
            'data_de_fim' => $this->data_de_fim,
            'endereco' => $this->endereco,
        ];
    }
}
