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

    public function pocetna() {
        return $this->belongsTo(Stop::class, 'pocetna_stanica');
    }

    public function poslednja() {
        return $this->belongsTo(Stop::class, 'poslednja_stanica');
    }

    public function stops(){
        return $this->belongsToMany(Stop::class)->withPivot(['rb']);
    }

    public function vehicles(){
        return $this->hasMany(Vehicle::class, 'linija');
    }
}
