<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPocetnaPoslednjaStanica extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('lines', function (Blueprint $table) {
            
            $table->foreignId('pocetna_stanica')->constrained('stops');            
            $table->foreignId('poslednja_stanica')->constrained('stops');
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
            
            $table->dropColumn('pocetna_stanica');  
            $table->dropColumn('poslednja_stanica');
            
        });
    }
}
