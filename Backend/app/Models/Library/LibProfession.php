<?php

namespace App\Models\Library;

use App\Models\Employer\JobPost;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LibProfession extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $fillable = [
        'desc'
    ];
    
    public function user() : HasMany{
        return $this->hasMany(User::class, 'lib_profession_id');
    }

    public function job() : HasMany{
        return $this->hasMany(JobPost::class, 'lib_profession_id');
    }
    
    public function skill() : HasMany{
        return $this->hasMany(LibSkill::class, 'lib_profession_id');
    }
}
