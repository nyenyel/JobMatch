<?php

use App\Http\Controllers\API\v1\BasicController\AuthController;
use App\Http\Controllers\API\v1\BasicController\Job\JobApplicantController;
use App\Http\Controllers\API\v1\BasicController\Job\JobPostController;
use App\Http\Controllers\API\v1\BasicController\Job\JobSkillController;
use App\Http\Controllers\API\v1\BasicController\Library\LibAplicationStatusController;
use App\Http\Controllers\API\v1\BasicController\Library\LibLinkController;
use App\Http\Controllers\API\v1\BasicController\Library\LibProfessionController;
use App\Http\Controllers\API\v1\BasicController\Library\LibProfessionLevelController;
use App\Http\Controllers\API\v1\BasicController\Library\LibSkillController;
use App\Http\Controllers\API\v1\BasicController\Library\LibSkillTypeController;
use App\Http\Controllers\API\v1\BasicController\User\ApplicantExperienceController;
use App\Http\Controllers\API\v1\BasicController\User\ApplicantSkillController;
use App\Http\Controllers\API\v1\BasicController\User\CompanyController;
use App\Http\Controllers\API\v1\BasicController\User\ExperienceController;
use App\Http\Controllers\API\v1\BasicController\User\ReviewController;
use App\Http\Controllers\API\v1\BasicController\User\UserController;
use App\Http\Controllers\API\v1\BroadcastController;
use App\Http\Controllers\API\v1\DocumentController;
use App\Http\Controllers\API\v1\ForgotPasswordController;
use App\Http\Controllers\API\v1\MessageController;
use App\Http\Controllers\API\v1\RuleBased\DashboardController;
use App\Http\Controllers\API\v1\RuleBased\PersonalizeRecommendationController;
use App\Http\Controllers\API\v1\User\ContactController;
use App\Http\Resources\ApplicantExperienceResource;
use App\Http\Resources\UserResource;
use App\Models\Library\LibApplicationStatus;
use App\Models\Library\LibProfession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;

// Broadcast::routes(['middleware' => ['auth:sunctum']]);
Broadcast::routes();

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
        Route::post('user-update/{user}', [UserController::class, 'userUpdate'])->name('userUpdate')->middleware('auth:sanctum');
        Route::get('my-verified-company', [CompanyController::class, 'verifiedCompany'])->name('verifiedCompany');
        Route::get('to-verify-company', [CompanyController::class, 'toVerifyCompany'])->name('toVerifyCompany');
        Route::post('notify-owner/{company}', [CompanyController::class, 'notifyTheVerification'])->name('notifyTheVerification');
        Route::post('give-partnership/{company}', [CompanyController::class, 'givePartnership'])->name('givePartnership');
        Route::get('partnered-job', [JobPostController::class, 'partneredJob'])->name('partneredJob');
        Route::get('my-applicant', [UserController::class, 'getMyApplicant'])->name('getMyApplicant')->middleware('auth:sanctum');
        Route::get('short-listed-applicant', [UserController::class, 'getShortListed'])->name('getShortListed')->middleware('auth:sanctum');
        Route::post('send-message', [MessageController::class, 'sendMessage'])->name('sendMessage');
        Route::post('message', [MessageController::class, 'message'])->name('message');
        Route::get('get-contact/{user}', [ContactController::class, 'getContact'])->name('getContact');
        Route::post('forgot-password', [ForgotPasswordController::class, 'sendResetLink']);
    });
    Route::prefix('rule-base')->group(function(){
        Route::get('recommend/{user}', [PersonalizeRecommendationController::class, 'recommend'])->middleware('auth:sanctum');
        Route::get('get-percent/{user}/{jobPost}', [PersonalizeRecommendationController::class, 'getPercentage'])->middleware('auth:sanctum');
        Route::get('dashboard', [DashboardController::class, 'getDashboardData'])->middleware('auth:sanctum');
        Route::post('search', [DashboardController::class, 'search'])->middleware('auth:sanctum');
    });
});

// Route::post('/broadcasting/auth', [BroadcastController::class, 'authenticate'])->middleware('auth:sanctum');  // or 'auth:api' for API tokens
Route::post('/broadcasting/auth', [BroadcastController::class, 'authenticate']);  // or 'auth:api' for API tokens

Route::prefix('auth')->group(function(){
    Route::post('register', [AuthController::class, 'register']);
    Route::put('ban/{user}', [AuthController::class, 'ban']);
    Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::post('login', [AuthController::class, 'login']);
    Route::get('/user', function (Request $request) {
        $user = $request->user();
        $user->load([
            'gender',
            'company' => function ($query) {
                $query->where('verified', '!=', 4);
            },
            'company.jobs',
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