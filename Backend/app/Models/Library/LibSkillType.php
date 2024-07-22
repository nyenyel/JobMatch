<?php

namespace App\Models\Library;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LibSkillType extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $fillable = [
        'desc',
    ];
    
    public function applicantSkill() : HasMany{
        return $this->hasMany(LibSkill::class, 'lib_skill_type_id');
    }
}
