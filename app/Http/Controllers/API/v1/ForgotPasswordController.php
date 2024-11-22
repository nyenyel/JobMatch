<?php

namespace App\Http\Controllers\API\v1;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;

class ForgotPasswordController 
{
    public function sendResetLink(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid email address',
                'errors' => $validator->errors()
            ], 422);
        }

        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json([
                'status' => 'success',
                'message' => 'Password reset link sent successfully'
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Unable to send password reset link'
        ], 400);
    }
}