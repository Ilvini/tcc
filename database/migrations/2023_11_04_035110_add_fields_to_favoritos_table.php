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
        Schema::table('favoritos', function (Blueprint $table) {
            $table->string('nome')->after('ponto_turistico_id');
            $table->string('endereco')->nullable()->after('nome');
            $table->foreignId('subcategoria_id')->after('endereco')->constrained();
            $table->string('imagem')->nullable()->after('subcategoria_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('favoritos', function (Blueprint $table) {
            $table->dropColumn('nome');
            $table->dropColumn('endereco');
            $table->dropForeign(['subcategoria_id']);
            $table->dropColumn('subcategoria_id');
            $table->dropColumn('imagem');
        });
    }
};
