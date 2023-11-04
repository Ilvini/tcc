<?php

namespace App\Classes;

use App\Models\Subcategoria;
use App\Repositories\BancoDeDadosPontoTuristicoRepository;
use App\Repositories\FoursquarePontoTuristicoRepository;

class PontoTuristico
{
    protected FoursquarePontoTuristicoRepository $fourSquarePontoTuristicoRepository;
    protected BancoDeDadosPontoTuristicoRepository $bancoDeDadosPontoTuristicoRepository;

    public function __construct() {
        $this->fourSquarePontoTuristicoRepository = new FoursquarePontoTuristicoRepository();
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

        $results = $this->fourSquarePontoTuristicoRepository->buscar($lat, $lon, $raio * 1000, $categorias);

        $pontosFoursquare = [];
        if ($results->status == 200) {
            $results = json_decode($results->body);

            $categoriasIds = [];
            $icones = [];
            foreach ($results->results as $ponto) {

                $categoriasIds[] = $ponto->categories[0]->id;
                $icones[$ponto->categories[0]->id] = $ponto->categories[0]->icon->prefix . '64' . $ponto->categories[0]->icon->suffix;

                if (isset($dbFoursquarePontos[$ponto->fsq_id])) {

                    $dbFoursquarePontos[$ponto->fsq_id] = pontoTuristicoMisto($dbFoursquarePontos[$ponto->fsq_id], new FoursquarePontoTuristico($ponto));

                } else {

                    $pontosFoursquare[] = new FoursquarePontoTuristico($ponto);

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
                $pontoTuristicoFoursquare = $this->fourSquarePontoTuristicoRepository->detalhe($pontoTuristico->fsq_id);
                if (isset($pontoTuristicoFoursquare) && $pontoTuristicoFoursquare->status == 200) {
                    $pontoTuristico = pontoTuristicoMisto($pontoTuristico, new FoursquarePontoTuristico(json_decode($pontoTuristicoFoursquare->body)));
                }
            }
        } else {
            $pontoTuristico = $this->fourSquarePontoTuristicoRepository->detalhe($id);
            if (isset($pontoTuristico) && $pontoTuristico->status == 200) {
                $pontoTuristico = new FoursquarePontoTuristico(json_decode($pontoTuristico->body));
            } else {
                return null;
            }
        }

        return $pontoTuristico;
    }
}
