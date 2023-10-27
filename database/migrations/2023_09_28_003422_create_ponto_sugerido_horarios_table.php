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
        Schema::create('ponto_sugerido_horarios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ponto_sugerido_id')->constrained();
            $table->string('dia_semana');
            $table->time('abertura')->nullable();
            $table->time('fechamento')->nullable();
            $table->boolean('dia_todo')->default(false);
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
        Schema::dropIfExists('ponto_sugerido_horarios');
    }
};
