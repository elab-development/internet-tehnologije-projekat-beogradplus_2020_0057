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
        return [
            'trenutna_stanica' => Stop::inRandomOrder()->first()->id, // promeniti da bude stanica na liniji
            'linija' => Line::inRandomOrder()->first()->id,
            'tip' => $this->faker->numberBetween(1,3),
        ];
    }
}
