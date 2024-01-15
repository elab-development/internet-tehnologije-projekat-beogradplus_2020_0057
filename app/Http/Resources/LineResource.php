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
            "kod_linije" => $this->broj_linije,
            'putanja' => $this->naziv_pocetna.' - '.$this->naziv_poslednja,
            'napomena' => $this->napomena
        ];
    }
}
