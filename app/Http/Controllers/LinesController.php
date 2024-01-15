<?php

namespace App\Http\Controllers;

use App\Http\Resources\LineResource;
use App\Http\Resources\StopResource;
use App\Http\Resources\VehicleResource;
use App\Models\Line;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LinesController extends Controller
{
    public function index() 
    {
        $data = []; 
        foreach (Line::All() as $line) {
            $data[] = new LineResource($line);
        };
        return $data;
    }

    public function show(Line $line)
    {
        return new LineResource($line);
    }

    public function stops(Line $line, int $smer) {
        $data = [];

        foreach ($line->stops->where("pivot.smer", $smer) as $stop) {
            $data[] = [
                'rb' => $stop->pivot->rb,
                'stanica' => new StopResource($stop)
            ];
        };
        return $data;
    }

    public function vehicles(Line $line, int $smer) {
        $data = [];
        foreach ($line->vehicles->where("smer", $smer) as $vehicle) {
            $data[] = new VehicleResource($vehicle);
        };
        return $data;
    }


    public function patch_line(Request $request, Line $line) {
        $validator = Validator::make($request->all(), [
            'napomena'  => 'required|max:255',
            'kod_linije' => 'unique:App\Models\Line,kod_linije',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()->first()
            ]);
        }

        $line->update($request->all());

        return response()->json([
            'message' => 'Linija promenjena',
            'linija' => new LineResource($line)
        ]);
    }

    public function search(string $search) {        
        return Line::where('naziv_pocetna','LIKE','%'.$search.'%')->orWhere('naziv_poslednja','LIKE','%'.$search.'%')->get();
    }
}
