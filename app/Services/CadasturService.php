<?php

namespace App\Services;

use App\Imports\GuiasImport;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Fluent;
use Maatwebsite\Excel\Facades\Excel;

class CadasturService
{
    private function request($metodo, $url, $data)
    {
        $response = Http::withHeaders([
            'accept' => 'application/json'
        ])->$metodo($url);

        if ($response->status() !== 200) {
            Log::error('Erro ao conectar com a API da Foursquare', [
                'url' => $url,
                'data' => $data,
                'response' => $response->body(),
            ]);
        }

        return new Fluent([
            'status' => $response->status(),
            'body' => $response->body(),
        ]);
    }

    public function guias()
    {
        $url = 'https://dados.gov.br/api/publico/conjuntos-dados/cadastur-01';

        $response = $this->request('get', $url, []);

        if ($response->status == 200) {
            $dados = json_decode($response->body);

            $arquivoXlsOrCsv = last($dados->resources)->url;

            $arquivo = Http::get($arquivoXlsOrCsv)->body();

            $path = storage_path('app/public/cadastur/');
            $fileName = 'cadastur.xls';

            if (!file_exists($path)) {
                mkdir($path, 0777, true);
            }

            file_put_contents($path . $fileName, $arquivo);

            Excel::import(new GuiasImport, $path . $fileName);

            return true;
        } else {
            return false;
        }
    }
}
