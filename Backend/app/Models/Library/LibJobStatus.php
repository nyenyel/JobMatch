<?php

namespace App\Models\Library;

use App\Models\Employer\JobPost;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LibJobStatus extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $fillable = [
        'desc'
    ];
    
    public function user() : HasMany{
        return $this->hasMany(JobPost::class, 'lib_job_status_id');
    }
}
