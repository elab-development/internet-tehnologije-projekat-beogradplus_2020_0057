<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {    
        // tipovi vozila
        DB::table("vehicle_type")->insert([
            ['naziv' => 'autobus'], 
            ['naziv' => 'tramvaj'], 
            ['naziv' => 'trolejbus'],
            ['naziv' => 'minibus'] ]);

        // smerovi
        DB::table('direction')->insert([
            ['naziv' => 'napred'], 
            ['naziv' => 'nazad'] ]);

        $this->call([
            StopSeeder::class,
            LineSeeder::class,
            VehicleSeeder::class,
        ]);
    }
}
