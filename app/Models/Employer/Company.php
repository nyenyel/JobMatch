<?php

namespace App\Models\Employer;

use App\Models\Library\LibCompanyVerificationImage;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $fillable = [
        'desc',
        'title',
        'owner_id',
        'verified',
        'partnered',
        'sector'
    ];
    
    public function jobApplication() : HasMany  {
        return $this->hasMany(JobPost::class, 'company_id');
    }
    public function image() : HasMany {
        return $this->hasMany(LibCompanyVerificationImage::class, 'company_id');
    }
    public function owner(): BelongsTo {
        return $this->belongsTo(User::class, 'owner_id');
    }
    public function jobs(): HasMany {
        return $this->hasMany(JobPost::class, 'company_id');
    }
}
