<?php

namespace App\Classes;

use App\Services\WikipediaService;
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
    public $avaliacoes;
    public $popularidade;
    public $aberto;
    public $horarios;
    public $imagens;
    public $informacoes;
    
    public function __construct($google, $detalhe = false) {
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
        $this->aberto = $google->regularOpeningHours->openNow ?? null;

        $avaliacoes = [];
        if (isset($google->reviews)) {
            foreach ($google->reviews as $key => $review) {
                $avaliacoes[] = new Fluent([
                    'id' => $key,
                    'estrelas' => $review->rating,
                    'comentario' => $review->text->text,
                ]);
            }
        }

        $this->avaliacoes = $avaliacoes;

        $horarios = [];
        if (isset($google->regularOpeningHours)) {
            foreach ($google->regularOpeningHours->periods as $hour) {

                $dia = $hour->open->day + 1;

                $abertura = str_pad($hour->open->hour, 2, '0', STR_PAD_LEFT) . ':' . str_pad($hour->open->minute, 2, '0', STR_PAD_LEFT) . ':00';
                $fechamento = str_pad($hour->close->hour, 2, '0', STR_PAD_LEFT) . ':' . str_pad($hour->close->minute, 2, '0', STR_PAD_LEFT) . ':00';

                if (isset($horarios[$dia])) {
                    $horarios[$dia] = new Fluent([
                        'dia_semana' => $horarios[$dia]->dia_semana,
                        'abertura' => $horarios[$dia]->abertura,
                        'fechamento' => $horarios[$dia]->fechamento,
                        'abertura_2' => $abertura,
                        'fechamento_2' => $fechamento,
                        'dia_todo' => $horarios[$dia]->dia_todo,
                    ]);
                } else {
                    $horarios[$dia] = new Fluent([
                        'dia_semana' => $dia,
                        'abertura' => $abertura,
                        'fechamento' => $fechamento,
                        'dia_todo' => isset($hour->all_day) ? $hour->all_day : false,
                    ]);
                }
            }
        }

        $this->horarios = $horarios;

        $imagens = [];
        if (isset($google->photos)) {
            foreach ($google->photos as $photo) {
                $imagens[] = new Fluent([
                    'imagem' => 'https://places.googleapis.com/v1/' . $photo->name . '/media?key=' . env('GOOGLE_API_KEY'),
                ]);
            }
        }

        $this->imagens = $imagens;

        if ($detalhe) {
            $descricao = null;
    
            $wikipediaService = new WikipediaService();
    
            $results = $wikipediaService->search($google->displayName->text);
            if ($results && isset($results->query->search[0])) {
                $result = $wikipediaService->getDetails($results->query->search[0]->title);
                if ($result) {
                    $descricao = new Fluent([
                        'id' => 1,
                        'tipo' => 'Descricao',
                        'titulo' => $result->query->pages->{key($result->query->pages)}->title,
                        'descricao' => $result->query->pages->{key($result->query->pages)}->extract,
                    ]);
                }
            }
    
            if (isset($descricao)) {
                $this->informacoes[] = $descricao;
            }
        }
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

    public function getImagens() {
        return $this->imagens;
    }

}
