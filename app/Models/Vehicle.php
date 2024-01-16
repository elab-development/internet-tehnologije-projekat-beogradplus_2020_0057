<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'trenutna_stanica',
        'linija',
        'tip',
        'smer'
    ];

    public function current_stop() {
        return $this->belongsTo(Stop::class, 'trenutna_stanica');
    }

    public function line() {
        return $this->belongsTo(Line::class, 'linija');
    }

    public function direction() {
        return $this->belongsTo(Direction::class,'smer');
    }

    public function type() {
        return $this->belongsTo(VehicleType::class,'tip');
    }
}
