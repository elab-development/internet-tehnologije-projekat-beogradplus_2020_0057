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
        // izaberi liniju
        $line = Line::inRandomOrder()->first();
        return [
            'linija' => $line->id,
            // izaberi stanicu na toj liniji
            'trenutna_stanica' => $line->stops()->inRandomOrder()->first()->id,             
            'tip' => $this->faker->numberBetween(1,3),
        ];
    }
}
