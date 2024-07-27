<?php

namespace App\Models\Applicant;

use App\Models\Library\LibProfession;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ApplicantExperience extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $fillable = [
        'title',
        'desc',
        'duration',
        'applicant_id',
        'profession_id'
    ];
    public function applicant():BelongsTo{
        return $this->belongsTo(User::class, 'applicant_id');
    }
    public function profession():BelongsTo {
        return $this->belongsTo(LibProfession::class, 'profession_id');
    }
}
