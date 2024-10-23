<?php

namespace App\Models\Library;

use App\Models\Library\LibSkill;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LibSkillLink extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $fillable = [
        'link',
        'lib_skill_id'
    ];

    public function skill(): BelongsTo {
        return $this->belongsTo(LibSkill::class, 'lib_skill_id');
    }
}
