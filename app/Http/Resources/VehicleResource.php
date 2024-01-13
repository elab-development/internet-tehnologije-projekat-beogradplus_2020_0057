<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;

class VehicleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            "id"=> $this->id,
            "tip_id" => $this->tip,        
            "tip" => $this->naziv_tipa($this->tip),
            "trenutna_stanica" => new StopResource ($this->current_stop),
            'linija' => new LineResource($this->line)
        ];
    }

    public function naziv_tipa($tip) {
        switch ($tip) {
            case 1: return 'Autobus';
            case 2: return 'Tramvaj';
            case 3: return 'Trolejbus';
            default: return 'Tip ne postoji';
        }
    }
}
