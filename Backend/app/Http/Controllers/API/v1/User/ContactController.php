<?php

namespace App\Http\Controllers\API\v1\User;

use App\Models\Contact;
use App\Models\User;
use Illuminate\Http\Request;

class ContactController
{
    public function getContact(User $user){
        $contact = Contact::where('first_user', $user->id)
                        ->orWhere('second_user', $user->id)
                        ->with(['firstUser', 'secondUser'])
                        ->get();
        return response()->json($contact);
    }
}
