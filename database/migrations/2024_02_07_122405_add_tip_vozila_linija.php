<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTipVozilaLinija extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table("lines", function (Blueprint $table) {
            $table->foreignId('tip_vozila')->constrained('vehicle_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table("lines", function (Blueprint $table) {
            $table->dropForeign('lines_tip_vozila_foreign');
            $table->dropColumn('tip_vozila');
        });
    }
}
