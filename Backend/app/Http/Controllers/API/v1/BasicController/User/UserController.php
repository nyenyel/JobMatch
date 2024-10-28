<?php

namespace App\Http\Controllers\api\v1\basiccontroller\user;

use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController
{
    protected $relation = [
        'role',
        'gender'
    ];
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = User::where('ban', false)->get();
        $data->load($this->relation);
        return UserResource::collection($data);
    }


    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $user->load($this->relation);
        return UserResource::make($user);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        
        $data = $request->validated();

        // Check if password is set and hash it before updating
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']); // Hash the password
        } else {
            unset($data['password']); // Remove it from the data array if not set
        }

        $imageUrl = 'dumb';
        // Check if a file was uploaded
        if ($request->hasFile('image')) {
            // Store the uploaded image
            $path = $request->file('image')->store('uploads', 'public'); // Store image
            $imageUrl = url("storage/$path"); // Create the full URL for the image
            $data['image'] = $imageUrl; // Add image URL to data
        }

        $user->update($data); // Update the user with the data
        return response()->json($request); // Return the updated user or any relevant response
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['message' => 'Data Deleted']);
    }
    public function userUpdate(UpdateUserRequest $request, User $user)
    {
        
        $data = $request->validated();

        // Check if password is set and hash it before updating
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']); // Hash the password
        } else {
            unset($data['password']); // Remove it from the data array if not set
        }

        $imageUrl = 'dumb';
        // Check if a file was uploaded
        if ($request->hasFile('image')) {
            // Store the uploaded image
            $path = $request->file('image')->store('uploads', 'public'); // Store image
            $imageUrl = url("storage/$path"); // Create the full URL for the image
            $data['image'] = $imageUrl; // Add image URL to data
        } else {
            // If no new image, retain the current image
            $data['image'] = $user->image; // Keep the existing image URL
        }

        $user->update($data); // Update the user with the data
        return response()->json($imageUrl); // Return the updated user or any relevant response
    }
}
