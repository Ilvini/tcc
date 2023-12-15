<?php

namespace App\Classes;

use Illuminate\Support\Fluent;

class FoursquarePontoTuristico
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
    
    public function __construct($foursquare) {
        $this->uuid = $foursquare->fsq_id;
        $this->subcategoria_id = $foursquare->categories[0]->id;
        $this->subcategoria = new Fluent([
            'nome' => $foursquare->categories[0]->name,
            'icone' => $foursquare->categories[0]->icon->prefix . '64' . $foursquare->categories[0]->icon->suffix,
        ]);
        $this->fsq_id = $foursquare->fsq_id;
        $this->nome = $foursquare->name;
        $this->endereco = $foursquare->location->formatted_address;
        $this->lat = $foursquare->geocodes->main->latitude;
        $this->lon = $foursquare->geocodes->main->longitude;
        $this->avaliacao = $foursquare->rating ?? 0;
        $this->popularidade = $foursquare->popularity ?? 0;
        $this->aberto = $foursquare->hours->open_now ?? null;

        $horarios = [];
        if (isset($foursquare->hours->regular)) {
            foreach ($foursquare->hours->regular as $hour) {

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
        if (isset($foursquare->hours_popular)) {
            foreach ($foursquare->hours_popular as $hour) {

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
        if (isset($foursquare->photos)) {
            foreach ($foursquare->photos as $photo) {
                $imagens[] = new Fluent([
                    'imagem' => $photo->prefix . '400' . $photo->suffix,
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
