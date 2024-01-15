<?php

namespace App\Http\Controllers;

use App\Http\Resources\VehicleResource;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = [];
        foreach (Vehicle::All() as $v) {
            $data[] = new VehicleResource($v);
        }
    
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'trenutna_stanica'  => 'required|exists:App\Models\Stop,id',
            'tip' => 'required|exists:vehicle_type,id',
            'linija' => 'required|exists:App\Models\Line,id',
            'smer' => 'required|exists:direction,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'Validation error' => $validator->errors()->first()
            ]);
        }

        $vehicle = Vehicle::create($request->all());
        return response()->json([
            'message' => 'Vehicle added.',
            'vehicle' => new VehicleResource($vehicle)
        ]);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $vehicle = Vehicle::find($id);
        if (!$vehicle) {
            return response()->json(["message"=> "Vozilo nije nadjeno."],404);
        }
        return response()->json(new VehicleResource($vehicle));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'trenutna_stanica'  => 'exists:App\Models\Stop,id',
            'tip' => 'exists:vehicle_type,id',
            'linija' => 'exists:App\Models\Line,id',
            'smer' => 'exists:direction,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'Validation error' => $validator->errors()->first()
            ]);
        }

        $vehicle = Vehicle::find($id);
        if (!$vehicle) {
            return response()->json(["message"=> "Vozilo nije nadjeno."],404);
        }

        $vehicle->update($request->all());        

        return response()->json([
            'message'=> 'Vozilo azurirano',
            'vehicle' => new VehicleResource($vehicle)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $vehicle = Vehicle::find($id);
        if (!$vehicle) {
            return response()->json(["message"=> "Vozilo nije nadjeno."],404);
        }
        $vehicle->delete();
        return response()->json([
            "message" => "Vozilo obrisano.",
            'vehicle' => new VehicleResource($vehicle)
        ]);
    }
}
