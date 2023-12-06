<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Line extends Model
{
    use HasFactory;

    protected $fillable = [
        'broj_linije'
    ];

    public function stop(){
        return $this->belongsTo(Stop::class);
    }

    public function stops(){
        return $this->belongsToMany(Stop::class);
    }
}
