<?php

namespace App\Models\Library;

use App\Models\Employer\Company;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LibCompanyVerificationImage extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $fillable = [
        'img',
        'company_id'
    ];
    public function company(): BelongsTo {
        return $this->belongsTo(Company::class, 'company_id');
    }
}
