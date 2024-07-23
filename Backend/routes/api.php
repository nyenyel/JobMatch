<?php

use App\Http\Controllers\API\v1\BasicController\Library\LibProfessionController;
use App\Http\Controllers\API\v1\BasicController\Library\LibSkillController;
use App\Http\Controllers\API\v1\BasicController\Library\LibSkillTypeController;
use App\Models\Library\LibProfession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::prefix('v1')->group( function (){
    Route::prefix('basic-controller')->group(function (){
        Route::apiResource('profession', LibProfessionController::class);
        Route::apiResource('skill-type', LibSkillTypeController::class);
        Route::apiResource('skill', LibSkillController::class);
    });
});
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
