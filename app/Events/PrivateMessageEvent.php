<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class PrivateMessageEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public $message;
    public $receiver;
    public $sender;

    public function __construct($message, $sender, $receiver)
    {

        Log::info('Construct', [
            'sender_id' => $sender->id,
            'receiver_id' => $receiver->id,
            'message' => $message,
        ]);

        $this->message = $message;
        $this->sender = $sender;
        $this->receiver = $receiver;
    }

    public function broadcastAs() {
        Log::info('Broadcast As', [
            'sender_id' => $this->sender->id,
            'receiver_id' => $this->receiver->id,
        ]);
        return 'private-message';
    }

    public function broadcastOn(): array
    {
        Log::info('Broadcast On', [
            'sender_id' => $this->sender->id,
            'receiver_id' => $this->receiver->id,
        ]);

        return ['chat'];
            
    }
    public function broadcastWith(){
        return [
            'message'=> $this->message,
            'sender'=> $this->sender,
            'receiver'=> $this->receiver,
        ];
    }
}
