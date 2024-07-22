<?php

namespace App\Models\Employer;

use App\Models\Library\LibProfession;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JobPost extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $fillable = [
        'title',
        'desc',
        'post_duration',
        'employer_id',
        'lib_profession_id',
        'company_id'
    ];
    public function skill() : HasMany{
        return $this->hasMany(JobSkill::class, 'job_id');
    }
    public function application() : HasMany{
        return $this->hasMany(JobApplicant::class, 'job_id');
    }
    public function employer(): BelongsTo{
        return $this->belongsTo(User::class, 'employer_id');
    }
    public function profession(): BelongsTo{
        return $this->belongsTo(LibProfession::class, 'lib_profession_id');
    }public function company(): BelongsTo{
        return $this->belongsTo(Company::class, 'company_id');
    }
}
