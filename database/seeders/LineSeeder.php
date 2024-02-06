<?php

namespace Database\Seeders;

use App\Models\Line;
use App\Models\Stop;
use Exception;
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
        $api_url = 'http://overpass-api.de/api/interpreter?data=';
        $query = '[out:json][timeout:25];area(id:3602728438)->.searchArea;nwr["type"="route"](area.searchArea);out;';
        // collecting results in JSON format
        $html = file_get_contents($api_url . $query);
        $result = json_decode($html, true);
        $data = $result['elements'];

        // save each line from the given array
        foreach ($data as $key => $row) {
            try {
                $kod = $row['tags']['ref'];
                $l = Line::where('kod_linije', $kod)->first();

                if ($l != null) {
                    $smer = 2;
                } else {
                    $l = new Line();
                    $l->kod_linije = $kod;
                    $l->naziv_pocetna = $row['tags']['from:sr-Latn'];
                    $l->naziv_poslednja = $row['tags']['to:sr-Latn'];
                    $l->save();
                    $smer = 1;
                }

                // insert stops for line
                $i = 0;
                foreach ($row['members'] as $stop_row) {
                    if ($stop_row['type'] != 'node')
                        break;
                    else {
                        try {
                            $stop = Stop::where('node_id', $stop_row['ref'])->get();
                            $l->stops()->attach($stop, ['rb' => $i, 'smer' => $smer]);
                            $i++;
                        } catch (Exception $e) {
                            echo $e->getMessage();
                            print_r($stop_row);
                        }
                    }
                }

            } catch (Exception $e) {
                echo $e->getMessage();
                //print_r($row);
            }
        }
    }





    public function run_old()
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
