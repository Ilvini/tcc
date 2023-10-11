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
        $imagens = [];

        if (isset($this->uuid)) {

            foreach ($this->imagens as $imagem) {
                $imagens[] = route('imagem.render', 'locais/m/' . $imagem->imagem);
            }

            return [
                'uuid' => $this->uuid,
                'nome' => $this->nome,
                'lat' => (float) $this->lat,
                'lon' => (float) $this->lon,
                'endereco' => $this->endereco,
                'imagens' => $imagens,
                'avaliacao_media' => $this->avaliacoes->avg('estrelas'),
                'avaliacoes' => AvaliacaoResource::collection($this->avaliacoes),
                'informacoes_adicionais' => InformacaoResource::collection($this->informacoes)->collection->groupBy('tipo'),
                'horario_funcionamento' => HorarioResource::collection($this->horarios),
                'aberto' => $this->aberto,
            ];
        } else {

            foreach ($this->photos as $imagem) {
                $imagens[] = $imagem->prefix . '200' . $imagem->suffix;
            }

            $horarios = [];
            
            if (isset($this->hours->regular)) {
                foreach ($this->hours->regular as $hour) {
    
                    if ($hour->day == 7) {
                        $dia = 1;
                    } else {
                        $dia = $hour->day + 1;
                    }
    
                    $horario = substr($hour->open, 0, 2) . ':' 
                        . substr($hour->open, 2, 2) . ' ás ' 
                        . substr($hour->close, 0, 2) . ':' 
                        . substr($hour->close, 2, 2);
    
                    $horarios[] = [
                        'nome' => diaSemana($dia),
                        'horario' => $horario,
                    ];
                }
            }

            return [
                'uuid' => $this->fsq_id,
                'nome' => $this->name,
                'lat' => $this->geocodes->main->latitude,
                'lon' => $this->geocodes->main->longitude,
                'endereco' => $this->location->formatted_address,
                'imagens' => $imagens,
                'avaliacao_media' => $this->rating / 2,
                'avaliacoes' => [],
                'informacoes_adicionais' => [],
                'horario_funcionamento' => $horarios,
                'aberto' => $this->hours->open_now,
            ];
        }
    }
}
