<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stop extends Model
{
    use HasFactory;

    protected $fillable = [
        'broj_stanice',
        'naziv',
    ];

    public function lines(){
        return $this->belongsToMany(Line::class)->withPivot(['rb, smer']);
    }

}
