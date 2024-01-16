<?php

namespace Database\Seeders;

use App\Models\Direction;
use App\Models\Role;
use App\Models\VehicleType;
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
        // role
        Role::create(['name' => 'user']);
        Role::create(['name' => 'admin']);

        // tipovi vozila
        VehicleType::create(['naziv' => 'autobus']);
        VehicleType::create(['naziv' => 'tramvaj']); 
        VehicleType::create(['naziv' => 'trolejbus']);
        VehicleType::create(['naziv' => 'minibus'] );

        // smerovi
        Direction::create(['naziv' => 'napred']);
        Direction::create(['naziv' => 'nazad']);

        $this->call([
            StopSeeder::class,
            LineSeeder::class,
            VehicleSeeder::class,
        ]);
    }
}
