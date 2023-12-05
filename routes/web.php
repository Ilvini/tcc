<?php

use App\Http\Controllers\Controle\AvaliacaoController;
use App\Http\Controllers\Controle\CategoriaController;
use App\Http\Controllers\Controle\DashboardController;
use App\Http\Controllers\Controle\EventoController;
use App\Http\Controllers\Controle\InformacaoController;
use App\Http\Controllers\Controle\PontoSugeridoController;
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
    | Rotas de Categorias
    |--------------------------------------------------------------------------*/
    Route::controller(CategoriaController::class)->prefix('categorias')->name('categorias.')->group(function () {
        Route::get('/', 'index')->middleware('permission:Visualizar Categorias')->name('index');
        Route::post('/adicionar', 'store')->middleware('permission:Adicionar Categorias')->name('adicionar');
        Route::get('/excluir/{id}', 'delete')->middleware('permission:Excluir Categorias')->name('delete');
    });

    /*--------------------------------------------------------------------------
    | Rotas de Pontos Turisticos
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
    
    /*--------------------------------------------------------------------------
    | Rotas de Pontos Sugeridos
    |--------------------------------------------------------------------------*/
    Route::controller(PontoSugeridoController::class)->prefix('pontos-sugeridos')->name('pontos-sugeridos.')->group(function () {
        Route::get('/', 'index')->middleware('permission:Visualizar Pontos Sugeridos')->name('index');
        Route::get('/aprovar/{id}', 'aprovar')->middleware('permission:Aprovar Pontos Sugeridos')->name('aprovar');
        Route::get('/reprovar/{id}', 'reprovar')->middleware('permission:Reprovar Pontos Sugeridos')->name('reprovar');
    });
    
    /*--------------------------------------------------------------------------
    | Rotas de Avaliações
    |--------------------------------------------------------------------------*/
    Route::controller(AvaliacaoController::class)->prefix('avaliacoes')->name('avaliacoes.')->group(function () {
        Route::get('/', 'index')->middleware('permission:Visualizar Avalições')->name('index');
        Route::get('/aprovar/{id}', 'aprovar')->middleware('permission:Aprovar Avalições')->name('aprovar');
        Route::get('/reprovar/{id}', 'reprovar')->middleware('permission:Reprovar Avalições')->name('reprovar');
    });

    /*--------------------------------------------------------------------------
    | Rotas de Informações
    |--------------------------------------------------------------------------*/
    Route::controller(InformacaoController::class)->prefix('informacoes')->name('informacoes.')->group(function () {
        Route::get('/', 'index')->middleware('permission:Visualizar Informações Adicionais')->name('index');
        Route::get('/aprovar/{id}', 'aprovar')->middleware('permission:Aprovar Informações Adicionais')->name('aprovar');
        Route::get('/reprovar/{id}', 'reprovar')->middleware('permission:Reprovar Informações Adicionais')->name('reprovar');
    });

    /*--------------------------------------------------------------------------
    | Rotas de Eventos
    |--------------------------------------------------------------------------*/
    Route::controller(EventoController::class)->prefix('eventos')->name('eventos.')->group(function () {
        Route::get('/', 'index')->middleware('permission:Visualizar Eventos')->name('index');
        Route::get('/criar', 'create')->middleware('permission:Cadastrar Eventos')->name('create');
        Route::post('/salvar', 'store')->middleware('permission:Cadastrar Eventos')->name('store');
        Route::get('/editar/{id}', 'edit')->middleware('permission:Alterar Eventos')->name('edit');
        Route::post('/alterar/{id}', 'update')->middleware('permission:Alterar Eventos')->name('update');
        Route::get('/excluir/{id}', 'delete')->middleware('permission:Excluir Eventos')->name('delete');
    });
});
