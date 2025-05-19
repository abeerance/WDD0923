<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'username',
        'email',
        'password',
        'bio',
        'avatar_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    // Define the one-to-many relationship with articles
    public function articles(): HasMany
    {
        return $this->hasMany(Article::class);
    }

    // Define the one-to-many relationship with comments
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    // Define the one-to-many relationship with images
    public function images(): HasMany
    {
        return $this->hasMany(Image::class);
    }
}
