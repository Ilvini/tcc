<?php

namespace App\Classes;

use App\Models\Subcategoria;
use App\Repositories\BancoDeDadosPontoTuristicoRepository;
use App\Repositories\GooglePontoTuristicoRepository;

class PontoTuristico
{
    protected GooglePontoTuristicoRepository $googlePontoTuristicoRepository;
    protected BancoDeDadosPontoTuristicoRepository $bancoDeDadosPontoTuristicoRepository;

    public function __construct() {
        $this->googlePontoTuristicoRepository = new GooglePontoTuristicoRepository();
        $this->bancoDeDadosPontoTuristicoRepository = new BancoDeDadosPontoTuristicoRepository();
    }

    public function buscar($lat, $lon, $raio, $categorias)
    {
        $pontosTuristicos = $this->bancoDeDadosPontoTuristicoRepository->buscar($lat, $lon, $raio, $categorias);

        $pontosTuristicos->load([
            'imagens',
            'subcategoria',
        ]);

        $dbFoursquarePontos = [];
        foreach ($pontosTuristicos as $pontosTuristico) {
            if ($pontosTuristico->fsq_id != null) {
                $dbFoursquarePontos[$pontosTuristico->fsq_id] = $pontosTuristico;
            }
        }

        $results = $this->googlePontoTuristicoRepository->buscar($lat, $lon, $raio * 1000, $categorias);

        $pontosFoursquare = [];
        if ($results->status == 200) {
            $results = json_decode($results->body);

            $categoriasIds = [];
            $icones = [];
            foreach ($results->places as $ponto) {

                new GooglePontoTuristico($ponto);

                if (isset($ponto->primaryType)) {
                    $categoriasIds[] = $ponto->primaryType;
                    $icones[$ponto->primaryType] = $ponto->iconMaskBaseUri . '.png';
                }

                if (isset($dbFoursquarePontos[$ponto->id])) {

                    $dbFoursquarePontos[$ponto->id] = pontoTuristicoMistoGoogle($dbFoursquarePontos[$ponto->id], new GooglePontoTuristico($ponto));

                } else {

                    $pontosFoursquare[] = new GooglePontoTuristico($ponto);

                }
            }

            $auxCat = Subcategoria::whereIn('fsq_id', $categoriasIds)->whereNull('icone')->get();

            foreach ($auxCat as $cat) {
                $cat->icone = $icones[$cat->fsq_id];
                $cat->save();
            }
        }

        return collect($pontosFoursquare)->merge($pontosTuristicos);
    }

    public function buscarPorId($id)
    {
        if (strlen($id) == 36) {
            $pontoTuristico = $this->bancoDeDadosPontoTuristicoRepository->detalhe($id);
            if (isset($pontoTuristico) && $pontoTuristico->fsq_id != null) {
                $pontoTuristicoFoursquare = $this->googlePontoTuristicoRepository->detalhe($pontoTuristico->fsq_id);
                if (isset($pontoTuristicoFoursquare) && $pontoTuristicoFoursquare->status == 200) {
                    $pontoTuristico = pontoTuristicoMistoGoogle($pontoTuristico, new GooglePontoTuristico(json_decode($pontoTuristicoFoursquare->body)));
                }
            }
        } else {
            $pontoTuristico = $this->googlePontoTuristicoRepository->detalhe($id);
            if (isset($pontoTuristico) && $pontoTuristico->status == 200) {
                $pontoTuristico = new GooglePontoTuristico(json_decode($pontoTuristico->body));
            } else {
                return null;
            }
        }

        return $pontoTuristico;
    }
}
