<?php

namespace App\Imports;

use App\Models\Guia;
use Maatwebsite\Excel\Concerns\ToModel;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class GuiasImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        if ($row[1] == 'UF') {
            return null;
        }

        if ($row[7] != null && $row[7] != '') {
            $validade = Date::excelToDateTimeObject($row[7]);
        }

        return new Guia([
            'n_certificado' => $row[0],
            'uf' => $row[1],
            'municipio' => $row[2],
            'nome' => trim(str_replace(['| ', ' | '], '', $row[3])),
            'telefone' => $row[4],
            'email' => $row[5],
            'site' => $row[6],
            'validade' => $validade ?? null,
            'cidades_atuacao' => json_encode(explode('|', str_replace('| ', '', str_replace(' | ', '|', trim($row[8])))), JSON_UNESCAPED_UNICODE),
            'categorias' => json_encode(explode('|', str_replace('| ', '', str_replace(' | ', '|', trim($row[9])))), JSON_UNESCAPED_UNICODE),
            'segmentos' => json_encode(explode('|', str_replace('| ', '', str_replace(' | ', '|', trim($row[10])))), JSON_UNESCAPED_UNICODE),
            'idiomas' => json_encode(explode('|', str_replace('| ', '', str_replace(' | ', '|', trim($row[11])))), JSON_UNESCAPED_UNICODE),
            'motorista' => $row[12],
        ]);
    }
}
