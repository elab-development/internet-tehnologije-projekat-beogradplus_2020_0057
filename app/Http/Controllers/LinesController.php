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

    public function stops(Line $line) {
        $data = [];

        foreach ($line->stops as $stop) {
            $data[] = [
                'rb' => $stop->pivot->rb,
                'stanica' => new StopResource($stop)
            ];
        };
        return $data;
    }

    public function vehicles(Line $line) {
        $data = [];
        foreach ($line->vehicles as $vehicle) {
            $data[] = new VehicleResource($vehicle);
        };
        return $data;
    }


    public function patch_line(Request $request, Line $line) {
        $validator = Validator::make($request->all(), [
            'napomena'  => 'required|max:255',
            'broj_linije' => 'unique:App\Models\Line,broj_linije',
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
}
