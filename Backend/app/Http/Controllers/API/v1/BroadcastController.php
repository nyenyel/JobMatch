<?php

namespace App\Http\Controllers\API\v1;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Log;

class BroadcastController
{
    public function authenticate(Request $request)
    {
        Log::info('Broadcast Authentication', [
            'socket_id' => $request->input('socket_id'),
            'channel_name' => $request->input('channel_name'),
            'user'=> $request->user()
        ]);

        // if (!$request->user()) {
        //     return response()->json(['error' => 'Unauthorized'], 403);
        // }

        $response = Broadcast::auth($request);
        return $response;
    }
}
