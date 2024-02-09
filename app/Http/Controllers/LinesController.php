<?php

namespace App\Http\Controllers;

use App\Http\Resources\LineResource;
use App\Http\Resources\StopResource;
use App\Http\Resources\VehicleResource;
use App\Models\Line;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Validator;

class LinesController extends Controller
{
    public function index()
    {
        $lines = Line::paginate(10);

        return LineResource::collection($lines);
    }

    public function show(Line $line)
    {
        return new LineResource($line);
    }

    public function stops(Line $line, int $smer)
    {
        $stops = $line->stops->where("pivot.smer", $smer)->toArray();

        return $this->paginate($stops);
    }

    public function vehicles(Line $line, int $smer)
    {
        $vehicles = $line->vehicles->where("smer", $smer);

        return VehicleResource::collection($vehicles);
    }

    public static function paginate($items, $total = null, $perPage = 10, $page = null, $pageName = 'page')
    {
        $page = $page ?: LengthAwarePaginator::resolveCurrentPage($pageName);
        $currentpage = $page;
        $offset = ($currentpage * $perPage) - $perPage;
        $itemstoshow = array_slice($items, $offset, $perPage);
        return new LengthAwarePaginator(
            $itemstoshow,
            //$items->forPage($page, $perPage),
            $total ?: count($items),
            $perPage,
            $page,
            [
                'path' => LengthAwarePaginator::resolveCurrentPath(),
                'pageName' => $pageName,
            ]
        );
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
        $lines = Line::where('kod_linije', 'LIKE', $search . '%')
            //->orWhere('naziv_pocetna', 'LIKE', '%' . $search . '%')
            //->orWhere('naziv_poslednja', 'LIKE', '%' . $search . '%')
            ->paginate(10);
        return LineResource::collection($lines);
    }
}
