<?php

use App\Http\Controllers\API\v1\BasicController\AuthController;
use App\Http\Controllers\API\v1\BasicController\Job\JobApplicantController;
use App\Http\Controllers\API\v1\BasicController\Job\JobPostController;
use App\Http\Controllers\API\v1\BasicController\Job\JobSkillController;
use App\Http\Controllers\api\v1\basiccontroller\Library\LibAplicationStatusController;
use App\Http\Controllers\API\v1\BasicController\Library\LibProfessionController;
use App\Http\Controllers\API\v1\BasicController\Library\LibSkillController;
use App\Http\Controllers\API\v1\BasicController\Library\LibSkillTypeController;
use App\Http\Controllers\API\v1\BasicController\User\ApplicantExperienceController;
use App\Http\Controllers\API\v1\BasicController\User\ApplicantSkillController;
use App\Http\Controllers\API\v1\BasicController\User\CompanyController;
use App\Http\Controllers\API\v1\BasicController\User\ExperienceController;
use App\Http\Controllers\API\v1\BasicController\User\ReviewController;
use App\Http\Controllers\API\v1\RuleBased\PersonalizeRecommendationController;
use App\Http\Resources\ApplicantExperienceResource;
use App\Models\Library\LibApplicationStatus;
use App\Models\Library\LibProfession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::prefix('v1')->group( function (){
    Route::prefix('basic-controller')->group(function (){
        Route::apiResource('profession', LibProfessionController::class);
        Route::apiResource('skill-type', LibSkillTypeController::class);
        Route::apiResource('application-status', LibAplicationStatusController::class)->middleware('auth:sanctum');
        Route::apiResource('skill', LibSkillController::class);
        Route::apiResource('review', ReviewController::class);
        Route::apiResource('experience', ExperienceController::class);
        Route::apiResource('applicant-skill', ApplicantSkillController::class);
        Route::apiResource('company', CompanyController::class);
        Route::apiResource('job', JobPostController::class);
        Route::apiResource('job-skill', JobSkillController::class);
        Route::apiResource('job-applicant', JobApplicantController::class);
    });
    Route::prefix('rule-base')->group(function(){
        Route::get('recommend/{user}', [PersonalizeRecommendationController::class, 'recommend'])->middleware('auth:sanctum');
    });
});

Route::prefix('auth')->group(function(){
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::post('login', [AuthController::class, 'login']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    })->middleware('auth:sanctum');
});

