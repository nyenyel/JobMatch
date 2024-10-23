<?php

namespace App\Models\Employer;

use App\Models\Library\LibSkill;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobSkill extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $fillable = [
        'lib_skill_id',
        'job_id',
    ];
    public function job():BelongsTo{
        return $this->belongsTo(JobPost::class, 'job_id');
    }
    public function skill():BelongsTo{
        return $this->belongsTo(LibSkill::class, 'lib_skill_id');
    }
}
