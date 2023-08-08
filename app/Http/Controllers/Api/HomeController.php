<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\IndexPlaceRequest;
use App\Http\Resources\Api\ListPlacesResource;
use App\Http\Resources\Api\PlaceResource;
use App\Services\FoursquareService;
use Illuminate\Support\Facades\Log;

class HomeController extends Controller
{
    public function index(IndexPlaceRequest $request)
    {
        try {

            $foursquareService = new FoursquareService();

            $ll = $request->ll;
            $radius = $request->radius;
            
            $results = $foursquareService->placeSearch($ll, $radius);

            if ($results->status == 200) {

                $results = json_decode($results->body);

                return apiResponse(false, 'Sem erros!', ListPlacesResource::collection($results->results));
            }

            return apiResponse(true, 'Ocorreu um erro');

        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }

    public function detalhe($fsq_id)
    {
        try {

            $foursquareService = new FoursquareService();

            $results = $foursquareService->getPlaceDetails($fsq_id);

            if ($results->status == 200) {

                $results = json_decode($results->body);

                return apiResponse(false, 'Sem erros!', new PlaceResource($results));
            }

            return apiResponse(true, 'Ocorreu um erro');

        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }
}
