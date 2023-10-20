<?php

namespace App\Http\Resources\Api;

use App\Models\Favorito;
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

        if (request()->bearerToken() != null) {
            [$id, $token] = explode('|', request()->bearerToken(), 2);
            $token_data = PersonalAccessToken::where('token', hash('sha256', $token))->first();

            $favorito = Favorito::where('cliente_id', $token_data->tokenable_id)->where('ponto_turistico_id', $this->fsq_id)->first();
        }

        if (isset($this->uuid)) {

            if (isset($this->foursquare)) {
                foreach ($this->foursquare->photos as $photo) {
                    $imagens[] = $photo->prefix . '400' . $photo->suffix;
                }

                if (isset($this->foursquare->hours->regular)) {
                    foreach ($this->foursquare->hours->regular as $hour) {
        
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
            }

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
                'horario_funcionamento' => count($this->horarios) > 0 ? HorarioResource::collection($this->horarios) : $horarios,
                'aberto' => $this->aberto,
                'favorito' => isset($favorito) ? true : false,
                'avaliado' => isset($token_data->tokenable_id) ? $this->avaliacoes->where('cliente_id', $token_data->tokenable_id)->count() > 0 : false,
            ];
        } else {

            foreach ($this->photos as $photo) {
                $imagens[] = $photo->prefix . '400' . $photo->suffix;
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
                'avaliacao_media' => isset($this->rating) ? $this->rating / 2 : 0,
                'avaliacoes' => [],
                'informacoes_adicionais' => [],
                'horario_funcionamento' => $horarios,
                'aberto' => $this->hours->open_now,
                'favorito' => isset($favorito) ? true : false,
                'avaliado' => false,
            ];
        }
    }
}
