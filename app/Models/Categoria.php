<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Categoria extends Model
{
    use HasFactory;
    use SoftDeletes;
    use HasSlug;

    protected $fillable = [
        'id',
        'nome',
        'slug',
        'ordem',
        'fsq_id',
    ];

    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()->generateSlugsFrom('nome')->saveSlugsTo('slug');
    }

    public function subcategorias()
    {
        return $this->hasMany(Subcategoria::class)->orderBy('nome');
    }
}
