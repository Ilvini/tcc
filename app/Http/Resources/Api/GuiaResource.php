<?php

namespace App\Http\Resources\Api;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class GuiaResource extends JsonResource
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
            'n_certificado' => $this->n_certificado,
            'uf' => $this->uf,
            'municipio' => $this->municipio,
            'nome' => $this->nome,
            'telefone' => $this->telefone,
            'email' => $this->email,
            'site' => $this->site,
            // 'validade' => Carbon::parse($this->validade)->format('d/m/Y'),
            'cidades_atuacao' => json_decode($this->cidades_atuacao),
            'categorias' => json_decode($this->categorias),
            'segmentos' => json_decode($this->segmentos),
            'idiomas' => json_decode($this->idiomas),
            'motorista' => $this->motorista ? true : false,
        ];
    }
}
