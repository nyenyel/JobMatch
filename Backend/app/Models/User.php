<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Models\Applicant\ApplicantExperience;
use App\Models\Applicant\ApplicantSkill;
use App\Models\Employer\Company;
use App\Models\Employer\JobApplicant;
use App\Models\Employer\JobPost;
use App\Models\Library\LibGender;
use App\Models\Library\LibProfession;
use App\Models\Library\LibRole;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'email',
        'password',
        'username',
        'phone_no',
        'first_name',
        'last_name',
        'middle_name',
        'address',
        'rating',
        'desc',
        'lib_profession_id',
        'lib_gender_id',
        'lib_role_id',
        'image'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function profession():BelongsTo{
        return $this->belongsTo(LibProfession::class, 'lib_profession_id');
    }
    public function gender():BelongsTo{
        return $this->belongsTo(LibGender::class, 'lib_gender_id');
    }
    public function role():BelongsTo{
        return $this->belongsTo(LibRole::class, 'lib_role_id');
    }
    public function skill(): HasMany{
        return $this->hasMany(ApplicantSkill::class, 'lib_applicant_id');
    }
    public function reviews(): HasMany{
        return $this->hasMany(Review::class, 'reviewed_by');
    }
    public function myReviews(): HasMany{
        return $this->hasMany(Review::class, 'reviewed_for');
    }
    public function experience(): HasMany{
        return $this->hasMany(ApplicantExperience::class, 'applicant_id');
    }
    public function application(): HasMany{
        return $this->hasMany(JobApplicant::class, 'applicant_id');
    }
    public function jobPost(): HasMany{
        return $this->hasMany(JobPost::class, 'employer_id');
    }
    public function company(): HasMany{
        return $this->hasMany(Company::class, 'owner_id');
    }
}
