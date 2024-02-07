<?php

namespace Database\Factories;

use App\Models\Line;
use App\Models\Stop;
use Illuminate\Database\Eloquent\Factories\Factory;

class VehicleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        // izaberi liniju sa stanicama

        $smer = $this->faker->numberBetween(1, 2);
        do {
            $line = Line::inRandomOrder()->first();
        } while ($line->stops() == null || $line->stops()->where('smer', $smer)->count() == 0);

        return [
            'linija' => $line->id,
            'smer' => $smer,
            // izaberi stanicu na toj liniji i tom smeru
            'trenutna_stanica' => $line->stops()->where('smer', $smer)->inRandomOrder()->first()->id,
        ];
    }
}
