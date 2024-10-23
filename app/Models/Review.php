<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $fillable = [
        'rate',
        'review',
        'reviewed_by',
        'reviewed_for',
    ];

    public function reviewedBy():BelongsTo{
        return $this->belongsTo(User::class, 'reviewed_by');
    }
    public function reviewedFor():BelongsTo{
        return $this->belongsTo(User::class, 'reviewed_for');
    }
}
