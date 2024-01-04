<?php

namespace Database\Seeders;

use App\Models\Vehicle;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VehicleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // unesi tipove vozila
        DB::table("vehicle_type")->insert([
            ['naziv' => 'autobus'], ['naziv' => 'tramvaj'], ['naziv' => 'trolejbus'] ]);

        Vehicle::factory()->count(30)->create();
    }
}
