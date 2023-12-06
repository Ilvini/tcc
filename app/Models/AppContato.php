<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppContato extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'assunto',
        'descricao',
    ];
}
