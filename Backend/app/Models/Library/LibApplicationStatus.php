<?php

namespace App\Models\Library;

use App\Models\Employer\JobApplicant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LibApplicationStatus extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $fillable = [
        'desc'
    ];
    public function jobApplication() : HasMany{
        return $this->hasMany(JobApplicant::class, 'lib_status_id');
    }
}
