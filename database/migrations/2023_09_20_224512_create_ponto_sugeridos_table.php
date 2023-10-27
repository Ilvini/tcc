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
        Schema::create('ponto_sugeridos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('subcategoria_id')->constrained();
            $table->foreignId('cliente_id')->constrained();
            $table->string('fsq_id')->nullable();
            $table->string('nome');
            $table->string('endereco');
            $table->string('lat');
            $table->string('lon');
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
        Schema::dropIfExists('ponto_sugeridos');
    }
};
