<?php

namespace App\Models\Employer;

use App\Models\Library\LibApplicationStatus;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobApplicant extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    protected $fillable = [
        'job_id',
        'applicant_id',
        'lib_status_id'
    ];

    public function job() : BelongsTo{
        return $this->belongsTo(JobPost::class, 'job_id');
    }
    public function applicant() : BelongsTo{
        return $this->belongsTo(User::class, 'applicant_id');
    }
    public function status() : BelongsTo{
        return $this->belongsTo(LibApplicationStatus::class, 'lib_status_id');
    }

}
