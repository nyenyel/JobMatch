<?php

namespace App\Models\Applicant;

use App\Models\Library\LibSkill;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ApplicantSkill extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $fillable = [
        'lib_skill_id',
        'applicant_id',
    ];
    public function skill():BelongsTo{
        return $this->belongsTo(LibSkill::class, 'lib_skill_id');
    }
    public function applicant():BelongsTo{
        return $this->belongsTo(User::class, 'applicant_id');
    }
}
