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

        $imagem = null;
        if (is_object($this->imagens) && $this->imagens->first() !== null) {
            $imagem = route('imagem.render', 'locais/p/'. $this->imagens->first()->imagem);
        } else {
            $imagem = $this->imagens;
        }

        return [
            'uuid' => $this->uuid,
            'nome' => $this->nome,
            'imagem' => $imagem,
            'lat' => (float) $this->lat,
            'lon' => (float) $this->lon,
            'categoria' => last($categoria),
            'icone' => $this->icone,
        ];
    }
}
