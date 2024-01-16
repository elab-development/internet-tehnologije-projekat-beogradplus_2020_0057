<?php

namespace App\Http\Controllers;

use App\Http\Resources\LineResource;
use App\Http\Resources\StopResource;
use App\Http\Resources\VehicleResource;
use App\Models\Line;
use App\Models\Stop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

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

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            //'broj_stanice'  => 'required|unique:App\Models\Stop,broj_stanice',
            'naziv' => 'required|max:50',            
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error'=> $validator->errors()->first(),
            ]);
        }

        $stop = Stop::create($request->all());
        return response()->json([
            'message' => 'Stanica dodata.',
            'stop' => new StopResource($stop)            
        ]);

    }

    public function vehicles(Stop $stop)
    {
        $data = [];
        
        $stop_lines = $stop->lines;
        if ($stop_lines->count() == 0) {
            return response()->json(['message' => 'Nema linija na ovoj stanici']);
        }

        //uzmi smer na osnovu linija koje staju
        $smer = $stop_lines->first()->pivot->smer;

        // za sve linije na stanici
        foreach ($stop_lines as $line) {
            // redni broj stanice na liniji
            $stop_rb = $line->stops->where('pivot.smer', $smer)->find($stop)->pivot->rb;

            // prolazimo kroz vozila na liniji
            foreach ($line->vehicles->where('smer', $smer) as $vehicle) {
                // redni broj trenutne stanice vozila na liniji
                $trenutna_rb = $line->stops->where('pivot.smer', $smer)->find($vehicle->current_stop)->pivot->rb;

                $data[] = [
                    'vozilo' => new VehicleResource($vehicle),
                    'rb_stanice' => $stop_rb,                 
                    'rb_trenutne' => $trenutna_rb,
                    'udaljenost' => $stop_rb - $trenutna_rb,                    
                ];
            }
        }

        // sortiramo vozila po udaljenosti
        usort($data, function ($a, $b) {
            return $a['udaljenost'] <=> $b['udaljenost'];
        });

        return $data;
    }

    public function search(string $search) {
        return Stop::where('naziv','LIKE','%'.$search.'%')->get();
    }
}


