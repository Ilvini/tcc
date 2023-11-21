<?php

namespace App\Classes;

use Illuminate\Support\Fluent;

class GooglePontoTuristico
{
    public $uuid;
    public $subcategoria_id;
    public $subcategoria;
    public $fsq_id;
    public $nome;
    public $endereco;
    public $lat;
    public $lon;
    public $avaliacao;
    public $popularidade;
    public $aberto;
    public $horarios;
    public $horarios_populares;
    public $imagens;
    
    public function __construct($google) {
        $this->uuid = $google->id;
        $this->subcategoria_id = $google->primaryType ?? $google->types[0] ?? null;
        $this->subcategoria = new Fluent([
            'nome' => $google->primaryTypeDisplayName->text ?? '',
            'icone' => $google->iconMaskBaseUri . '.svg',
        ]);
        $this->fsq_id = $google->id;
        $this->nome = $google->displayName->text;
        $this->endereco = $google->formattedAddress;
        $this->lat = $google->location->latitude;
        $this->lon = $google->location->longitude;
        $this->avaliacao = $google->rating ?? 0;
        $this->popularidade = $google->popularity ?? 0;
        $this->aberto = $google->hours->open_now ?? null;

        $horarios = [];
        if (isset($google->hours->regular)) {
            foreach ($google->hours->regular as $hour) {

                if ($hour->day == 7) {
                    $dia = 1;
                } else {
                    $dia = $hour->day + 1;
                }

                if (isset($horarios[$dia])) {
                    $horarios[$dia] = new Fluent([
                        'dia_semana' => $hour->day,
                        'abertura' => substr($hour->open, 0, 2) . ':' . substr($hour->open, 2, 2) . ':00',
                        'fechamento' => substr($hour->close, 0, 2) . ':' . substr($hour->close, 2, 2) . ':00',
                        'dia_todo' => isset($hour->all_day) ? $hour->all_day : false,
                        'abertura_2' => substr($hour->open, 0, 2) . ':' . substr($hour->open, 2, 2) . ':00',
                        'fechamento_2' => substr($hour->close, 0, 2) . ':' . substr($hour->close, 2, 2) . ':00',
                    ]);
                } else {
                    $horarios[$dia] = new Fluent([
                        'dia_semana' => $hour->day,
                        'abertura' => substr($hour->open, 0, 2) . ':' . substr($hour->open, 2, 2) . ':00',
                        'fechamento' => substr($hour->close, 0, 2) . ':' . substr($hour->close, 2, 2) . ':00',
                        'dia_todo' => isset($hour->all_day) ? $hour->all_day : false,
                    ]);
                }

            }
        }

        $this->horarios = $horarios;

        $horarios_populares = [];
        if (isset($google->hours_popular)) {
            foreach ($google->hours_popular as $hour) {

                if ($hour->day == 7) {
                    $dia = 1;
                } else {
                    $dia = $hour->day + 1;
                }

                if (isset($horarios_populares[$dia])) {
                    $horario = $horarios_populares[$dia]['horario'] .= ' e ' . substr($hour->open, 0, 2) . ':' 
                        . substr($hour->open, 2, 2) . ' ás ' 
                        . substr($hour->close, 0, 2) . ':' 
                        . substr($hour->close, 2, 2);
                    
                } else {
                    $horario = substr($hour->open, 0, 2) . ':' 
                        . substr($hour->open, 2, 2) . ' ás ' 
                        . substr($hour->close, 0, 2) . ':' 
                        . substr($hour->close, 2, 2);
                }

                $horarios_populares[$dia] = [
                    'nome' => diaSemana($dia),
                    'horario' => $horario,
                ];
            }
        }

        $this->horarios_populares = $horarios_populares;

        $imagens = [];
        if (isset($google->photos)) {
            foreach ($google->photos as $photo) {
                $imagens[] = new Fluent([
                    'imagem' => 'https://places.googleapis.com/v1/' . $photo->name . '/media?key=' . env('GOOGLE_API_KEY'),
                ]);
            }
        }

        $this->imagens = $imagens;
    }

    public function getUuid() {
        return $this->uuid;
    }

    public function getSubcategoriaId() {
        return $this->subcategoria_id;
    }

    public function getSubcategoria() {
        return $this->subcategoria;
    }

    public function getFsqId() {
        return $this->fsq_id;
    }

    public function getNome() {
        return $this->nome;
    }

    public function getEndereco() {
        return $this->endereco;
    }

    public function getLat() {
        return $this->lat;
    }

    public function getLon() {
        return $this->lon;
    }

    public function getAvalicao() {
        return $this->avaliacao;
    }

    public function getPopularidade() {
        return $this->popularidade;
    }

    public function getAberto() {
        return $this->aberto;
    }

    public function getHorarios() {
        return $this->horarios;
    }

    public function getHorariosPopulares() {
        return $this->horarios_populares;
    }

    public function getImagens() {
        return $this->imagens;
    }

}
