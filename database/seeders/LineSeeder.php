<?php

namespace Database\Seeders;

use App\Models\Direction;
use App\Models\Line;
use App\Models\Stop;
use App\Models\VehicleType;
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
        //$query = '[out:json][timeout:25];area(id:3602728438)->.searchArea;nwr["type"="route"](area.searchArea);out;';
        $query = '[out:json][timeout:25];area(id:3602728438)->.searchArea;(nwr["type"="route"]["route"="bus"](area.searchArea);nwr["type"="route"]["route"="trolleybus"](area.searchArea);nwr["type"="route"]["route"="tram"](area.searchArea);nwr["type"="route"]["route"="train"](area.searchArea););out;';
        // collecting results in JSON format
        $html = file_get_contents($api_url . $query);
        $result = json_decode($html, true);
        $data = $result['elements'];

        // save each line from the given array
        foreach ($data as $key => $row) {
            try {
                // add vehicle type if not exist
                $tip = VehicleType::firstOrCreate(['naziv' => $row['tags']['route']]);

                // add new line if not exist with same line code
                $l = Line::firstOrCreate(
                    ['kod_linije' => $row['tags']['ref']],
                    [
                        'naziv_pocetna' => $row['tags']['from:sr-Latn'],
                        'naziv_poslednja' => $row['tags']['to:sr-Latn'],
                        'tip_vozila' => $tip->id,
                    ]
                );

                if ($l->wasRecentlyCreated)
                    $smer = 1;
                else
                    $smer = 2;

                // insert stops for line
                $i = 0;
                foreach ($row['members'] as $stop_row) {
                    if ($stop_row['type'] != 'node')
                        break;
                    else {
                        try {
                            $stop = Stop::where('node_id', $stop_row['ref'])->get();
                            $l->stops()->attach($stop, ['rb' => $i++, 'smer' => $smer]);
                        } catch (Exception $e) {
                            echo $e->getMessage();
                            print_r($stop_row);
                        }
                    }
                }

            } catch (Exception $e) {
                echo $e->getMessage() . "\n";
                //print_r($row);
            }
        }
    }

}
