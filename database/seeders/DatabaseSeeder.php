<?php

namespace Database\Seeders;

use App\Models\Direction;
use App\Models\Role;
use App\Models\User;
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

        // admin user
        $admin = User::create([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('password'),
        ]);
        $admin->assignRole('admin');

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
