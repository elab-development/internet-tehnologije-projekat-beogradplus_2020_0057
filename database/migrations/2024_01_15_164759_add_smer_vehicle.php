<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSmerVehicle extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table("vehicles", function (Blueprint $table) {
            $table->foreignId('smer')->constrained('directions');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table("vehicles", function (Blueprint $table) {
            $table->dropForeign('vehicles_smer_foreign');              
            $table->dropColumn('smer');
        });
    }
}
