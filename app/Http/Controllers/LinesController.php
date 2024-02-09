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
        $lines = Line::paginate(5);

        return LineResource::collection($lines);
    }

    public function show(Line $line)
    {
        return new LineResource($line);
    }

    public function stops(Line $line, int $smer)
    {

        $data = [];

        foreach ($line->stops->where("pivot.smer", $smer) as $stop) {
            $data[] = [
                'rb' => $stop->pivot->rb,
                'stanica' => new StopResource($stop)
            ];
        }
        ;
        return ['data' => $data];
    }

    public function vehicles(Line $line, int $smer)
    {
        $vehicles = $line->vehicles->where("smer", $smer);

        return VehicleResource::collection($vehicles);
    }


    public function patch_line(Request $request, Line $line)
    {
        $validator = Validator::make($request->all(), [
            'napomena' => 'required|max:255',
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

    public function search(string $search)
    {
        return LineResource::collection(Line::where('naziv_pocetna', 'LIKE', '%' . $search . '%')
            ->orWhere('naziv_poslednja', 'LIKE', '%' . $search . '%')
            ->orWhere('kod_linije', 'LIKE', '%' . $search . '%')
            ->paginate(10));
    }
}
