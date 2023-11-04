<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Resources\Json\JsonResource;

class FavoritoResource extends JsonResource
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
            'id' => $this->ponto_turistico_id,
            'nome' => $this->nome,
            'imagem' => $this->imagem,
            'endereco' => $this->endereco,
            'categoria' => $this->subcategoria->nome,
            'icone' => $this->subcategoria->icone,
        ];
    }
}
