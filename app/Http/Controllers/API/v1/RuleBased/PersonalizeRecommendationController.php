<?php

namespace App\Http\Controllers\API\v1\RuleBased;

use App\Http\Service\JobFiltering;
use App\Models\User;
use Illuminate\Http\Request;

class PersonalizeRecommendationController
{
    public function recommend(User $user){
        $ruleBased = new JobFiltering;
        $jobs = $ruleBased->JobRecommendation($user);
        return $jobs;
    }
}