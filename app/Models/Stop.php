<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stop extends Model
{
    use HasFactory;

    public function pocetna() {
        return $this->hasMany(Line::class, 'id', 'pocetna_stanica');
    }

    public function poslednja() {
        return $this->hasMany(Line::class, 'id', 'poslednja_stanica');
    }

    public function lines() {
        return $this->belongsToMany(Line::class);
    }
}
