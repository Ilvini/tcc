<?php

namespace App\Http\Resources\Api;

use App\Models\Favorito;
use App\Models\PontoTuristicoAvaliacao;
use Illuminate\Http\Resources\Json\JsonResource;
use Laravel\Sanctum\PersonalAccessToken;

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
        $imagens = [];
        $horarios = [];

        $favorito = false;
        $avaliado = false;

        if (request()->bearerToken() != null) {
            $token = explode('|', request()->bearerToken());
            if (isset($token[1])) {
                $token_data = PersonalAccessToken::where('token', hash('sha256', $token[1]))->first();
                if ($token_data) {
                    $favorito = Favorito::where('cliente_id', $token_data->tokenable_id)->where('ponto_turistico_id', $this->fsq_id)->first();
                    $avaliado = PontoTuristicoAvaliacao::where('cliente_id', $token_data->tokenable_id)->where('ponto_turistico_id', $this->fsq_id)->first();
                }
            }
        }

        foreach ($this->imagens as $imagem) {
            $imagens[] = $imagem->imagem;
        }

        return [
            'uuid' => $this->uuid,
            'nome' => $this->nome,
            'lat' => $this->lat,
            'lon' => $this->lon,
            'endereco' => $this->endereco,
            'imagens' => $imagens,
            'avaliacao_media' => $this->avaliacao,
            'avaliacoes' => isset($this->avaliacoes) ? AvaliacaoResource::collection($this->avaliacoes) : [],
            'informacoes_adicionais' => isset($this->informacoes) ? InformacaoResource::collection($this->informacoes)->collection->groupBy('tipo') : [],
            'horario_funcionamento' => count($this->horarios) > 0 ? HorarioResource::collection($this->horarios) : $horarios,
            'aberto' => $this->aberto,
            'favorito' => isset($favorito) ? true : false,
            'avaliado' => isset($avaliado) ? true : false,
        ];
    }
}
