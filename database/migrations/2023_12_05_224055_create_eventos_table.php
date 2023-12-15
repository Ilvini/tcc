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
        Schema::create('eventos', function (Blueprint $table) {
            $table->id();
            $table->string('local_id')->nullable();
            $table->string('nome');
            $table->string('descricao');
            $table->boolean('gratuito')->default(false);
            $table->string('endereco');
            $table->string('cidade');
            $table->string('uf');
            $table->string('valor')->nullable();
            $table->string('imagem_url');
            $table->string('ingresso_url')->nullable();
            $table->date('data_de_inicio');
            $table->date('data_de_fim');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('eventos');
    }
};
