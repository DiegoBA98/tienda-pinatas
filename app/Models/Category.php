<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
    ];

    public function pinatas()
    {
        return $this->hasMany(Pinata::class);
    }
}
