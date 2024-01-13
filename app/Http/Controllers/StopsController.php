<?php

namespace App\Http\Controllers;

use App\Http\Resources\LineResource;
use App\Http\Resources\StopResource;
use App\Http\Resources\VehicleResource;
use App\Models\Line;
use App\Models\Stop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StopsController extends Controller
{
    public function index()
    {
        $data = [];
        foreach (Stop::All() as $stop) {
            $data[] = new StopResource($stop);
        }
    
        return $data;
    }

    public function show(Stop $stop)
    {
        return new StopResource($stop);
    }

    public function lines(Stop $stop)
    {
        $data = [];

        foreach ($stop->lines as $line) {
            $data[] = new LineResource($line);
        }
        return response()->json($data);
    }

    public function vehicles(Stop $stop)
    {
        $data = [];

        foreach ($stop->lines as $line) {
            $vehicles_data = [];

            // redni broj stanice na liniji
            $stop_rb = $line->stops->find($stop)->pivot->rb;

            // prolazimo kroz vozila na liniji
            foreach ($line->vehicles as $vehicle) {
                // redni broj trenutne stanice vozila na liniji
                $trenutna_rb = $line->stops->find($vehicle->current_stop)->pivot->rb;

                $vehicles_data[] = [
                    'id' => $vehicle->id,
                    'tip' => $vehicle->tip,                    
                    'rb_trenutne' => $trenutna_rb,
                    'udaljenost' => $stop_rb - $trenutna_rb,
                    'trenutna_stanica' => new StopResource($vehicle->current_stop),
                ];
            }

            // sortiramo vozila po udaljenosti
            usort($vehicles_data, function ($a, $b) {
                return $a['udaljenost'] <=> $b['udaljenost'];
            });

            $data[] = [
                'linija' => new LineResource($line),
                'rb_stanice' => $stop_rb,
                'vozila' => $vehicles_data
            ];
        }

        return $data;
    }

}
