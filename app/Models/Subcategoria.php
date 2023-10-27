<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Subcategoria extends Model
{
    use HasFactory;
    use SoftDeletes;
    use HasSlug;

    protected $fillable = [
        'id',
        'categoria_id',
        'nome',
        'slug',
        'ordem',
        'fsq_id',
        'ativo',
    ];

    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()->generateSlugsFrom('nome')->saveSlugsTo('slug');
    }

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    public function clientes()
    {
        return $this->belongsToMany(Clientes::class);
    }
}
