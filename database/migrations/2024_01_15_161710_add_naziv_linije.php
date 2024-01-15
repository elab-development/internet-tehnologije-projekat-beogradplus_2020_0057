<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNazivLinije extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('lines', function (Blueprint $table) {
            
            $table->string('naziv_pocetna');    
            $table->string('naziv_poslednja');          
            
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
            
            $table->dropColumn('naziv_pocetna');    
            $table->dropColumn('naziv_poslednja');             
            
        });
    }
}
