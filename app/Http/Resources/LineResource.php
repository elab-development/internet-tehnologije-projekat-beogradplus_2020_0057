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
            "id"=> $this->id,
            "broj_linije"=> $this->broj_linije,
            'putanja' => $this->pocetna->naziv.' - '.$this->poslednja->naziv,
            'pocetna_stanica' => new StopResource($this->pocetna),
            'poslednja_stanica' => new StopResource($this->poslednja),
            'napomena' => $this->napomena
        ];
    }
}
