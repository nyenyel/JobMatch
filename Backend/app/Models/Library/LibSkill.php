<?php

namespace App\Models\Library;

use App\Models\Applicant\ApplicantSkill;
use App\Models\Employer\JobSkill;
use App\Models\Library\LibSkillLink;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LibSkill extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    protected $fillable = [
        'desc',
        'lib_profession_id',
        'lib_skill_type_id'
    ];
    
    public function applicantSkill() : HasMany{
        return $this->hasMany(ApplicantSkill::class, 'lib_skill_id');
    }
    public function links(): HasMany {
        return $this->hasMany(LibSkillLink::class, 'lib_skill_id');
    }
    public function jobSkill() : HasMany{
        return $this->hasMany(JobSkill::class, 'lib_skill_id');
    }
    public function profession() : BelongsTo{
        return $this->belongsTo(LibProfession::class, 'lib_profession_id');
    }
    public function skillType() : BelongsTo{
        return $this->belongsTo(LibSkillType::class, 'lib_skill_type_id');
    }
}
