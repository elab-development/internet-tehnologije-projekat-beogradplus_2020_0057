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
    ];

    public function current_stop() {
        return $this->hasMany(Stop::class, 'trenutna_stanica');
    }

    public function line() {
        return $this->hasMany(Line::class, 'linija');
    }
}
