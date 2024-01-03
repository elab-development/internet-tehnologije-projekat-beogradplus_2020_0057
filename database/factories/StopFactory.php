<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class StopFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'broj_stanice' => $this->faker->unique()->numberBetween(100,1000),
            'naziv' => $this->faker->word(),
        ];
    }
}
