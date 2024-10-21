<?php

use App\Http\Controllers\API\v1\BasicController\AuthController;
use App\Http\Controllers\API\v1\BasicController\Job\JobApplicantController;
use App\Http\Controllers\API\v1\BasicController\Job\JobPostController;
use App\Http\Controllers\API\v1\BasicController\Job\JobSkillController;
use App\Http\Controllers\api\v1\basiccontroller\Library\LibAplicationStatusController;
use App\Http\Controllers\api\v1\basiccontroller\library\LibLinkController;
use App\Http\Controllers\API\v1\BasicController\Library\LibProfessionController;
use App\Http\Controllers\api\v1\basiccontroller\library\LibProfessionLevelController;
use App\Http\Controllers\API\v1\BasicController\Library\LibSkillController;
use App\Http\Controllers\API\v1\BasicController\Library\LibSkillTypeController;
use App\Http\Controllers\API\v1\BasicController\User\ApplicantExperienceController;
use App\Http\Controllers\API\v1\BasicController\User\ApplicantSkillController;
use App\Http\Controllers\API\v1\BasicController\User\CompanyController;
use App\Http\Controllers\API\v1\BasicController\User\ExperienceController;
use App\Http\Controllers\API\v1\BasicController\User\ReviewController;
use App\Http\Controllers\api\v1\basiccontroller\user\UserController;
use App\Http\Controllers\api\v1\DocumentController;
use App\Http\Controllers\api\v1\RuleBased\DashboardController;
use App\Http\Controllers\API\v1\RuleBased\PersonalizeRecommendationController;
use App\Http\Resources\ApplicantExperienceResource;
use App\Http\Resources\UserResource;
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
        Route::apiResource('link', LibLinkController::class);
        Route::apiResource('level', LibProfessionLevelController::class);
        Route::apiResource('user', UserController::class)->middleware('auth:sanctum');
        Route::put('update-application/{jobApplicant}', [JobApplicantController::class, 'updateApplicationStatus'])->name('updateApplicationStatus');
        Route::post('verify-company', [CompanyController::class, 'storeCompany'])->name('storeCompany');
        Route::get('my-verified-company', [CompanyController::class, 'verifiedCompany'])->name('verifiedCompany');
        Route::get('to-verify-company', [CompanyController::class, 'toVerifyCompany'])->name('toVerifyCompany');
        Route::post('notify-owner/{company}', [CompanyController::class, 'notifyTheVerification'])->name('notifyTheVerification');
        Route::post('give-partnership/{company}', [CompanyController::class, 'givePartnership'])->name('givePartnership');
    });
    Route::prefix('rule-base')->group(function(){
        Route::get('recommend/{user}', [PersonalizeRecommendationController::class, 'recommend'])->middleware('auth:sanctum');
        Route::get('dashboard', [DashboardController::class, 'getDashboardData'])->middleware('auth:sanctum');
    });
});

Route::prefix('auth')->group(function(){
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::post('login', [AuthController::class, 'login']);
    Route::get('/user', function (Request $request) {
        $user = $request->user();
        $user->load([
            'company' => function ($query) {
                $query->whereNotNull('verified');
            },
            'company.owner',
            'jobPost.level', // Correct way to load the owner of the company
            'jobPost.skill',
            'jobPost.skill.skill',
            'jobPost.application' => function ($query) {
                $query->where('lib_status_id', 2);
            },
            'skill.skill',
            'experience.profession',
            'application.job',
            'application.job.employer',
            'application.job.profession',
            'application.job.company',
            'application.job.level',
            'application.job.skill',
            'application.job.skill.skill',
            'application.status',
            'profession',
        ]);
        return UserResource::make($user);
    })->middleware('auth:sanctum');
});

Route::post('/scan-docx', [DocumentController::class, 'scanDocx']);