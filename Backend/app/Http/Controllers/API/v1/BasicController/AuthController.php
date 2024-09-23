<?php

namespace App\Http\Controllers\API\v1\BasicController;

use App\Http\Requests\AuthRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Laravel\Sanctum\HasApiTokens;

class AuthController
{
    public function register(AuthRequest $request){
        $user = User::create($request->validated());
        $token = $user->createToken('auth_token')->plainTextToken;
        $createdUser = $user->load(['role','gender','profession']);

        return response()->json([
            'user' => UserResource::make($createdUser),
            'token' => $token
        ]);
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required',
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            Log::warning('Invalid Credentials', ['email' => $validated['email']]);
            return response()->json(['message' => 'Invalid Credentials!'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;
        $createdUser = $user->load(['role','gender','profession']);
        
        return response()->json([
            'user' => UserResource::make($createdUser),
            'token' => $token
        ]);
       
    }

    public function logout(Request $request){
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'You are logged out'
        ]);
    }

    public function user()
    {
        $user = Auth::user();
        
        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        return response()->json(['user' => $user]);
    }
}
