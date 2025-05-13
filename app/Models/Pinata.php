<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pinata extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'descripcion',
        'tags',
        'imagen',
        'category_id',
        'precio',
        'entrega_inmediata'
    ];

    protected $casts = [
        'tags' => 'array',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function getImagenUrlAttribute()
    {
        return $this->imagen ? asset('storage/' . $this->imagen) : null;
    }

    public function asignarTags(array $tags)
    {
        $this->tags = $tags;
        $this->save();
    }
}
