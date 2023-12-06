<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Resources\Json\JsonResource;

class ClienteMeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $foto = null;

        if (isset($this->img_perfil)) {
            $foto = route('imagem.render', 'clientes/p/' . $this->img_perfil);
        } else {
            $foto = $this->profile_photo_url;
        }

        return [
            'nome' => $this->nome,
            'email' => $this->email,
            'celular' => $this->celular,
            'foto' => $foto,
        ];
    }
}
