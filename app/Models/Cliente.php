<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens;

class Cliente extends Authenticatable
{
    use HasApiTokens,
        HasFactory,
        Notifiable,
        HasProfilePhoto,
        HasFactory,
        SoftDeletes;

    protected $fillable = [
        'nome',
        'email',
        'password',
        'celular',
        'documento',
        'img_perfil',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'profile_photo_url'
    ];

    protected static function booted()
    {
        static::creating(function (Cliente $cliente) {
            $cliente->password = bcrypt($cliente->password);
            $cliente->celular = preg_replace('/[^0-9]/', '', $cliente->celular);
        });

        self::created(function ($cliente) {

            $data = [
                'cliente' => $cliente->nome,
            ];

            // Mail::send('emails.bem-vindo', $data, function ($message) use ($cliente) {
            //     $message->from('contato@myprotein.com.br', 'My Protein');
            //     $message->to($cliente->email, $cliente->name);
            //     $message->subject('Bem vindo à My Protein');
            // });
        });

        static::updating(function (Cliente $cliente) {
            if (! is_null($cliente->password)) {
                $cliente->password = bcrypt($cliente->password);
            } else {
                $cliente->password = $cliente->getOriginal('password');
            }

            $cliente->celular = preg_replace('/[^0-9]/', '', $cliente->celular);
        });
    }

    protected function defaultProfilePhotoUrl()
    {
        $name = trim(collect(explode(' ', $this->nome))->map(function ($segment) {
            return mb_substr($segment, 0, 1);
        })->join(' '));

        return 'https://ui-avatars.com/api/?name='.urlencode($name).'&color=7F9CF5&background=EBF4FF';
    }

    public function subcategorias()
    {
        return $this->belongsToMany(Subcategoria::class);
    }

    public function favoritos()
    {
        return $this->hasMany(Favorito::class);
    }
}
