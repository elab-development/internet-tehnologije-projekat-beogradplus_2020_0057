<?php

namespace Database\Seeders;

use App\Models\Stop;
use Illuminate\Database\Seeder;

class StopSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Stop::factory()->count(50)->create(); 
        foreach (Stop::all()  as $stop) {
            $s1 = $stop->replicate();
            $s1->save();
        }
    }
}
