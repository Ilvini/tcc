<?php

use App\Http\Controllers\Controle\DashboardController;
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
    // Route::controller(CategoriaController::class)->prefix('categorias')->name('categorias.')->group(function () {
    //     Route::get('/', 'index')->middleware('permission:Visualizar Categorias')->name('index');
    //     Route::get('/criar', 'create')->middleware('permission:Cadastrar Categorias')->name('create');
    //     Route::post('/salvar', 'store')->middleware('permission:Cadastrar Categorias')->name('store');
    //     Route::get('/editar/{id}', 'edit')->middleware('permission:Alterar Categorias')->name('edit');
    //     Route::post('/alterar/{id}', 'update')->middleware('permission:Alterar Categorias')->name('update');
    //     Route::get('/excluir/{id}', 'delete')->middleware('permission:Excluir Categorias')->name('delete');
    // });
});
