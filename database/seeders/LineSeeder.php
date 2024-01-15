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
            $stops = Stop::inRandomOrder()->where('id', '<=', 50)->take(rand(5, 10))->pluck("id")->toArray();
            
            // ubaci u smer napred (1)
            $i = 0;
            foreach ($stops as $stop) {
                // prikaci izabranu stanicu za liniju, i podesi redni broj
                $line->stops()->attach($stop, ['rb' => $i, 'smer' => 1]);
                $i++;
            }

            // ubaci u smer nazad (2)
            $reverse_stops = array_reverse($stops);
            $i = 0;
            foreach ($reverse_stops as $stop) {    
                // kopiraj stanicu        
                $stop2 = Stop::all()->where('id', $stop + 50);          
                $line->stops()->attach($stop2, ['rb' => $i, 'smer' => 2]);
                $i++;
            }
        }
    }
}
