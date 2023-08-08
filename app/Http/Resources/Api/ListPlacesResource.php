<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Resources\Json\JsonResource;

class ListPlacesResource extends JsonResource
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
            "fsq_id" => $this->fsq_id,
            'latitude' => $this->geocodes->main->latitude,
            'longitude' => $this->geocodes->main->longitude,
            'name' => $this->name,
            'imagem' => isset($this->photos[0]) ? $this->photos[0]->prefix . 'original' . $this->photos[0]->suffix : null,
            'avaliacao' => $this->popularity,
        ];
    }
}
