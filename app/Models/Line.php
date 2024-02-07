<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Line extends Model
{
    use HasFactory;

    protected $fillable = [
        'kod_linije',
        'naziv_pocetna',
        'naziv_poslednja',
        'napomena',
        'tip_vozila',
    ];

    public function stops()
    {
        return $this->belongsToMany(Stop::class)->withPivot(['rb', 'smer']);
    }

    public function vehicles()
    {
        return $this->hasMany(Vehicle::class, 'linija');
    }

    public function type()
    {
        return $this->belongsTo(VehicleType::class, 'tip_vozila');
    }
}
