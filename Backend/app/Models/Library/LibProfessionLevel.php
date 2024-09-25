<?php

namespace App\Models\Library;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LibProfessionLevel extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $fillable = [
        'desc'
    ];
}
