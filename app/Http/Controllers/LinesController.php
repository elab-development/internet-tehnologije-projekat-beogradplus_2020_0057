<?php

namespace App\Http\Controllers;

use App\Http\Resources\LineResource;
use App\Http\Resources\StopResource;
use App\Models\Line;
use Illuminate\Http\Request;

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
}
