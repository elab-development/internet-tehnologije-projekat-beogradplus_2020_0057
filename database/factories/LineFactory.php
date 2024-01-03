<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Stop;

class LineFactory extends Factory
{

    public $stops = null;
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'broj_linije' => $this->faker->unique()->numberBetween(1,100),
            'pocetna_stanica' => 1,
            'poslednja_stanica' => 1,
        ];
    }

}
