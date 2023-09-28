<?php

use App\Http\Controllers\Controle\DashboardController;
use App\Http\Controllers\Controle\PontoTuristicoController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->route('login');
})->name('home');

Route::get('selectload', [DashboardController::class, 'selectload'])->name('selectload');

Route::group([
    'prefix' => 'controle/',
    'middleware' => ['web', 'auth:sanctum', 'verified'],
    'as' => 'controle.',
], function () {
    Route::get('controle/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');

    Route::post('ordenacao', [DashboardController::class, 'ordenacao'])->name('ordenacao');

    /*--------------------------------------------------------------------------
    | Rotas do controle
    |--------------------------------------------------------------------------*/
    Route::controller(PontoTuristicoController::class)->prefix('pontos-turisticos')->name('pontos-turisticos.')->group(function () {
        Route::get('/', 'index')->middleware('permission:Visualizar Pontos Turísticos')->name('index');
        Route::get('/criar', 'create')->middleware('permission:Cadastrar Pontos Turísticos')->name('create');
        Route::post('/salvar', 'store')->middleware('permission:Cadastrar Pontos Turísticos')->name('store');
        Route::get('/editar/{id}', 'edit')->middleware('permission:Alterar Pontos Turísticos')->name('edit');
        Route::post('/alterar/{id}', 'update')->middleware('permission:Alterar Pontos Turísticos')->name('update');
        Route::get('/excluir/{id}', 'delete')->middleware('permission:Excluir Pontos Turísticos')->name('delete');

        Route::get('/horarios/{id}', 'horarios')->middleware('permission:Alterar Pontos Turísticos')->name('horarios');
        Route::post('/horarios/{id}', 'updateHorarios')->middleware('permission:Alterar Pontos Turísticos')->name('updateHorarios');
    });
});
