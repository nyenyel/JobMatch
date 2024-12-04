<?php

namespace App\Http\Controllers\api\v1\basiccontroller\user;

use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Http\Service\JobFiltering;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController
{
    protected $relation = [
        'role',
        'gender',
        'skill.skill',
        'experience',
        'profession',
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

    public function getMyApplicant(){
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }
        $applicants = $user->getAllApplicants;
        $applicants->load([
            'applicant.skill.skill', 
            'applicant.profession', 
            'applicant.experience', 
            'status', 
            'job.skill', 
            'job.level'
        ]);
        return response()->json($applicants);
    }

    public function getShortListed()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }
        
        // Get all applicants related to the user
        $applicants = $user->getAllApplicants;
        $applicants->load([
            'applicant.skill.skill', 
            'applicant.profession', 
            'applicant.experience', 
            'status', 
            'job.skill', 
            'job.level'
        ]);

        $shortlistedApplicants = [];

        // Loop through each applicant to calculate match percentage
        foreach ($applicants as $applicant) {
            $jobPost = $applicant->job; // Assuming the applicant has a related job post
            
            $jobFilter = new JobFiltering;
            // Calculate the match percentage using the SingleJobRecommendation method
            $matchResponse = $jobFilter->SingleJobRecommendation($applicant->applicant, $jobPost);
            
            // Get the percentage from the response
            $matchPercentage = $matchResponse->getData()->percentage; // Assuming the response is in the expected format

            // Check if the match percentage is 50 or above
            if ($matchPercentage >= 50) {
                $shortlistedApplicants[] = [
                    'applicant' => $applicant->applicant,
                    'job' => $jobPost,
                    'status' => $applicant->status,
                    'matchPercentage' => $matchPercentage
                ];
            }
        }

        return response()->json($shortlistedApplicants);
    }

    public function getEmployer()
    {
        $data = User::where('lib_role_id', 2)
                    ->where('ban', false)->get();
        $data->load($this->relation);
        return UserResource::collection($data);
    }

    public function getApplicant()
    {
        $data = User::where('lib_role_id', 3)
                    ->where('ban', false)->get();
        $data->load($this->relation);
        return UserResource::collection($data);
    }

    public function getAdmin()
    {
        $data = User::where('lib_role_id', 1)
                    ->where('ban', false)->get();
        $data->load($this->relation);
        return UserResource::collection($data);
    }
}
