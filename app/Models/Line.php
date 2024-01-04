<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Line extends Model
{
    use HasFactory;

    protected $fillable = [
        'broj_linije',
        'pocetna_stanica',
        'poslednja_stanica',
    ];

    public function stops(){
        return $this->belongsToMany(Stop::class)->withPivot(['rb']);
    }

    public function vehicles(){
        return $this->hasMany(Vehicle::class, 'linija');
    }
}
