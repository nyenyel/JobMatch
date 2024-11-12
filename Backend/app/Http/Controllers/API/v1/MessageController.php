<?php

namespace App\Http\Controllers\API\v1;

use App\Events\Message;
use App\Events\PrivateMessageEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Log;

class MessageController
{
    public function sendMessage(Request $request){
        // $validated = $request->validate([
        //     'receiver_id' => 'required|integer',
        //     'sender_id' => 'required|integer',
        //     'message' => 'required|string',
        //     'chatroom' => 'required|string',
        // ]);

        // $data = Message::create($validated);
        // $data->load(['sender', 'receiver']);
        
        // broadcast(new PrivateMessageEvent($data->message, $data->sender, $data->receiver))->toOthers();
        // return response()->json(['message' => 'message sent!', 200]);
    }

    public function message(Request $request) {
        event(
            new Message(
                $request->input('username'), 
                $request->input('message')
            ));
        return [];
    }
}
