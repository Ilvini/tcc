<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Resources\Json\JsonResource;

class ListarPontoTuristicoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $categoria = explode(' > ', $this->subcategoria->nome);

        return [
            'uuid' => $this->uuid,
            'nome' => $this->nome,
            'imagem' => isset($this->imagens[0]) ? $this->imagens[0]->imagem : null,
            'lat' => (float) $this->lat,
            'lon' => (float) $this->lon,
            'categoria' => last($categoria),
            'icone' => $this->subcategoria->icone,
        ];
    }
}
