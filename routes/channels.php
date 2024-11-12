<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Log;

Broadcast::channel('chat.{userID}', function ($user, $userID) {
    if ((int) $user->id === (int) $userID) {
        Log::info("User authorized to join chat channel: $userID");
        return true;
    }
    Log::warning("User not authorized to join chat channel: $userID");
    return false;
});

