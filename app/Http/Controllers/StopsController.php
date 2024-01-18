<?php

namespace App\Http\Controllers;

use App\Http\Resources\LineResource;
use App\Http\Resources\StopResource;
use App\Http\Resources\VehicleResource;
use App\Models\Line;
use App\Models\Stop;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class StopsController extends Controller
{
    public function index()
    {
        $stops = Stop::paginate(10);

        return StopResource::collection($stops);
    }

    public function show(Stop $stop)
    {
        return new StopResource($stop);
    }

    public function lines(Stop $stop)
    {
        $lines = $stop->lines()->paginate(10);
        
        return LineResource::collection($lines);
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [            
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

    public function search(string $search) {
        return Stop::where('naziv','LIKE','%'.$search.'%')
            ->orWhere('id','LIKE','%'.$search.'%')    
            ->paginate(10);
    }
}


