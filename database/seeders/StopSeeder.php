<?php

namespace Database\Seeders;

use App\Models\Stop;
use Exception;
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
        $api_url = 'http://overpass-api.de/api/interpreter?data=';
        $query = '[out:json][timeout:25];area(id:3602728438)->.searchArea;nwr["highway"="bus_stop"](area.searchArea);out;';
        // collecting results in JSON format
        $html = file_get_contents($api_url . $query);
        $result = json_decode($html, true);
        $data = $result['elements'];

        // save each stop from the given array
        foreach ($data as $key => $row) {
            $s = new Stop();
            try {
                $s->node_id = $row['id'];
                $s->id = $row['tags']['ref'];
                $s->naziv = $row['tags']['name:sr-Latn'];
                $s->latitude = $row['lat'];
                $s->longitude = $row['lon'];
                $s->save();
            } catch (Exception $e) {
                echo $e->getMessage();
                print_r($row);
            }
        }
    }
}
