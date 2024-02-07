<?php

namespace App\Http\Controllers;

use App\Http\Resources\VehicleResource;
use App\Models\Stop;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;

class StopVehicleController extends Controller
{
    public function vehicles(Stop $stop)
    {
        $data = [];

        $stop_lines = $stop->lines;
        if ($stop_lines->count() == 0) {
            return response()->json(['message' => 'Nema linija na ovoj stanici']);
        }

        //uzmi smer na osnovu linija koje staju
        $smer2 = $stop_lines->first()->pivot->smer;

        // za sve linije na stanici
        foreach ($stop_lines as $line) {
            $smer = $line->stops->find($stop)->pivot->smer;
            // redni broj stanice na liniji
            $rb_stanice = $line->stops->where('pivot.smer', $smer)->find($stop)->pivot->rb;

            // prolazimo kroz vozila na liniji
            foreach ($line->vehicles->where('smer', $smer) as $vehicle) {
                // redni broj trenutne stanice vozila na liniji
                $rb_trenutne = $line->stops->where('pivot.smer', $smer)->find($vehicle->current_stop)->pivot->rb;

                $udaljenost = $rb_stanice - $rb_trenutne;
                // ne prikazujemo vozila koja su prosla datu stanicu
                if ($udaljenost >= 0) {
                    $data[] = [
                        'vozilo' => new VehicleResource($vehicle),
                        'rb_stanice' => $rb_stanice,
                        'rb_trenutne' => $rb_trenutne,
                        'udaljenost' => $udaljenost,
                    ];
                }
            }
        }

        // sortiramo vozila po udaljenosti
        usort($data, function ($a, $b) {
            return $a['udaljenost'] <=> $b['udaljenost'];
        });

        //$data = $this->paginate($data);

        return $data;
    }

    public static function paginate($items, $perPage = 10, $page = null, $pageName = 'page')
    {
        $page = $page ?: (Paginator::resolveCurrentPage($page) ?: 1);
        $total = count($items);
        $currentpage = $page;
        $offset = ($currentpage * $perPage) - $perPage;
        $itemstoshow = array_slice($items, $offset, $perPage);

        return new LengthAwarePaginator($itemstoshow, $total, $perPage, $page, [
            'path' => LengthAwarePaginator::resolveCurrentPath(),
            'pageName' => $pageName,
        ]);
    }
}
