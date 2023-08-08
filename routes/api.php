<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AvaliacaoController;
use App\Http\Controllers\Api\ClienteController;
use App\Http\Controllers\Api\HomeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/cliente/novo', [ClienteController::class, 'register']);

Route::get('/pontos-turisticos', [HomeController::class, 'index']);
Route::get('/pontos-turisticos/{fsq_id}', [HomeController::class, 'detalhe']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/cliente/me', [ClienteController::class, 'me']);
    Route::put('/cliente/alterar', [ClienteController::class, 'update']);

    Route::post('/auth/nova-senha', [AuthController::class, 'alterarSenha']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::post('/auth/check-token', [AuthController::class, 'checarToken']);

    Route::get('/pontos-turisticos/{fsq_id}/avaliacoes', [AvaliacaoController::class, 'index']);
    Route::post('/pontos-turisticos/{fsq_id}/avaliacoes/novo', [AvaliacaoController::class, 'create']);
});

Route::post('/recuperar-senha', [AuthController::class, 'recuperarSenha']);
Route::get('/recuperar-senha/{id}/{hash}', [AuthController::class, 'novaSenhaForm'])->name('api.recuperar-senha');
Route::put('/recuperar-senha/{id}/{hash}', [AuthController::class, 'novaSenha']);
