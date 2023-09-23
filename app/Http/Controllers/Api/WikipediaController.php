<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\WikipediaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class WikipediaController extends Controller
{
    public function index(Request $request)
    {
        try {

            $wikipediaService = new WikipediaService();

            $results = $wikipediaService->search($request->title);

            if ($results) {

                $data = [];
                foreach ($results->query->search as $item) {
                    $data[] = [
                        'title' => $item->title,
                        'description' => $item->snippet,
                    ];
                }

                return apiResponse(false, 'Sem erros!', $data);
            }

            return apiResponse(true, 'Ocorreu um erro');

        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }

    public function detalhe(Request $request)
    {
        try {

            $wikipediaService = new WikipediaService();

            $results = $wikipediaService->getDetails($request->title);

            if ($results) {
                return apiResponse(false, 'Sem erros!', [
                    'title' => $results->query->pages->{key($results->query->pages)}->title,
                    'description' => $results->query->pages->{key($results->query->pages)}->extract,
                ]);
            }

            return apiResponse(true, 'Ocorreu um erro');

        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }
}
