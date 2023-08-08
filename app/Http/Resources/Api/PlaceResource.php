<?php

namespace App\Http\Resources\Api;

use App\Models\Avaliacao;
use Illuminate\Http\Resources\Json\JsonResource;

class PlaceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $avaliacoes = Avaliacao::where('fsq_id', $this->fsq_id)->get();

        return [
            "fsq_id" => $this->fsq_id,
            'nome' => $this->name,
            'latitude' => $this->geocodes->main->latitude,
            'longitude' => $this->geocodes->main->longitude,
            'pais' => $this->location->country,
            'estado' => $this->location->region,
            'cidade' => $this->location->locality ?? null,
            'rua' => $this->location->cross_street ?? null,
            'endereco_completo' => $this->location->formatted_address,
            'photos' => $this->photos ? PlacePhotosResource::collection($this->photos) : [],
            'avaliacoes' => AvaliacaoResource::collection($avaliacoes),
        ];
    }
}
