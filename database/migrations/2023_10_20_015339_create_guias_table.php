<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('guias', function (Blueprint $table) {
            $table->id();
            $table->string('n_certificado');
            $table->string('uf');
            $table->string('municipio');
            $table->string('nome');
            $table->string('telefone');
            $table->string('email')->nullable();
            $table->string('site')->nullable();
            $table->date('validade')->nullable();
            $table->text('cidades_atuacao');
            $table->text('categorias');
            $table->text('segmentos');
            $table->text('idiomas');
            $table->boolean('motorista')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('guias');
    }
};
