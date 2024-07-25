<?php

use App\Http\Controllers\API\v1\BasicController\AuthController;
use App\Http\Controllers\API\v1\BasicController\Library\LibProfessionController;
use App\Http\Controllers\API\v1\BasicController\Library\LibSkillController;
use App\Http\Controllers\API\v1\BasicController\Library\LibSkillTypeController;
use App\Http\Controllers\API\v1\BasicController\User\ApplicantExperienceController;
use App\Http\Controllers\API\v1\BasicController\User\ApplicantSkillController;
use App\Http\Controllers\API\v1\BasicController\User\CompanyController;
use App\Http\Controllers\API\v1\BasicController\User\ExperienceController;
use App\Http\Controllers\API\v1\BasicController\User\ReviewController;
use App\Http\Resources\ApplicantExperienceResource;
use App\Models\Library\LibProfession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::prefix('v1')->group( function (){
    Route::prefix('basic-controller')->group(function (){
        Route::apiResource('profession', LibProfessionController::class);
        Route::apiResource('skill-type', LibSkillTypeController::class);
        Route::apiResource('skill', LibSkillController::class);
        Route::apiResource('review', ReviewController::class);
        Route::apiResource('experience', ExperienceController::class);
        Route::apiResource('applicant-skill', ApplicantSkillController::class);
        Route::apiResource('company', CompanyController::class);
    });
});

Route::prefix('auth')->group(function(){
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::get('user', [AuthController::class, 'user']);
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
