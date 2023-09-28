<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AvaliacaoController;
use App\Http\Controllers\Api\ClienteController;
use App\Http\Controllers\Api\InformacaoController;
use App\Http\Controllers\Api\PontoTuristicoController;
use App\Http\Controllers\Api\WikipediaController;
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

Route::get('/wikipedia/buscar', [WikipediaController::class, 'index'])->name('api.wikipedia.buscar');
Route::get('/wikipedia/detalhe', [WikipediaController::class, 'detalhe'])->name('api.wikipedia.detalhe');

Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/cliente/novo', [ClienteController::class, 'register']);

Route::get('/pontos-turisticos', [PontoTuristicoController::class, 'index']);
Route::get('/pontos-turisticos/{uuid}', [PontoTuristicoController::class, 'detalhe']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/cliente/me', [ClienteController::class, 'me']);
    Route::put('/cliente/alterar', [ClienteController::class, 'update']);

    Route::post('/auth/nova-senha', [AuthController::class, 'alterarSenha']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::post('/auth/check-token', [AuthController::class, 'checarToken']);

    Route::post('/pontos-turisticos', [PontoTuristicoController::class, 'create']);

    Route::get('/pontos-turisticos/{uuid}/avaliacoes', [AvaliacaoController::class, 'index']);
    Route::post('/pontos-turisticos/{uuid}/avaliacoes/novo', [AvaliacaoController::class, 'create']);

    Route::get('/tipos-informacoes-adicionais', [InformacaoController::class, 'tipos']);
    Route::get('/pontos-turisticos/{uuid}/informacoes-adicionais', [InformacaoController::class, 'index']);
    Route::post('/pontos-turisticos/{uuid}/informacoes-adicionais/novo', [InformacaoController::class, 'create']);
});

Route::post('/recuperar-senha', [AuthController::class, 'recuperarSenha']);
Route::get('/recuperar-senha/{id}/{hash}', [AuthController::class, 'novaSenhaForm'])->name('api.recuperar-senha');
Route::put('/recuperar-senha/{id}/{hash}', [AuthController::class, 'novaSenha']);
