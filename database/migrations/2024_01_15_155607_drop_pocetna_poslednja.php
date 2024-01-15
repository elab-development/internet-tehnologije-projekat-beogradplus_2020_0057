<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropPocetnaPoslednja extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('lines', function (Blueprint $table) {
            
            $table->dropForeign('lines_pocetna_stanica_foreign');  
            $table->dropForeign('lines_poslednja_stanica_foreign');
            $table->dropColumn('pocetna_stanica');
            $table->dropColumn('poslednja_stanica');
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('lines', function (Blueprint $table) {
            
            $table->foreignId('pocetna_stanica')->constrained('stops');            
            $table->foreignId('poslednja_stanica')->constrained('stops');
        });
    }
}
