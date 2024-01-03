<?php

namespace Database\Seeders;

use App\Models\Line;
use App\Models\Stop;
use Illuminate\Database\Seeder;

class LineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Napravi 10 praznih linija
        $lines = Line::factory()->count(10)->create();

        foreach ($lines as $line) {
            // izaberi 5 do 10 stanica
            $stops = Stop::inRandomOrder()->take(rand(5, 10))->pluck("id")->toArray();
            $i = 0;
            foreach ($stops as $stop) {
                // prikaci izabrane stanice za liniju, i podesi redni broj
                $line->stops()->attach($stop, ['rb' => $i]);
                $i++;
            }

            // podesi pocetnu i poslenju stanicu za liniju
            $line->update(['pocetna_stanica' => $stops[0]]);
            $line->update(['poslednja_stanica' => $stops[$i - 1]]);
        }
    }
}
