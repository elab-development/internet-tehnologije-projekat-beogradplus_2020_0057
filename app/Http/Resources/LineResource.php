<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LineResource extends JsonResource
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
            "id" => $this->id,
            "kod_linije" => $this->kod_linije,
            'pocetna' => $this->naziv_pocetna,
            'poslednja' => $this->naziv_poslednja,
            'tip_vozila' => new VehicleTypeResource($this->type),
            'napomena' => $this->napomena
        ];
    }
}
