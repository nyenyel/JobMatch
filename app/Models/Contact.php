<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Contact extends Model
{
    use HasFactory;
    
    protected $guarded = ['id'];
    protected $fillable = [
        'chatroom',
        'chatroom_id',
        'first_user',
        'second_user',
    ];

    public function firstUser() :BelongsTo {
        return $this->belongsTo( User::class, 'first_user');
    }
    public function secondUser() :BelongsTo {
        return $this->belongsTo(User::class, 'second_user');
    }
}
