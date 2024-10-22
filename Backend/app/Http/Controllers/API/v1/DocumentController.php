<?php

namespace App\Http\Controllers\api\v1;

use App\Models\Applicant\ApplicantExperience;
use App\Models\Applicant\ApplicantSkill;
use App\Models\Library\LibProfession;
use App\Models\Library\LibSkill;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use PhpOffice\PhpWord\IOFactory;

class DocumentController
{
    public function scanDocx(Request $request)
    {
        // Validate the request
        $request->validate([
            'file' => 'required|file|mimes:docx|max:2048', // Adjust the max size as needed
            'password' => 'required|confirmed|min:8', // Adjust the max size as needed
        ]);

        // Store the uploaded file
        $path = $request->file('file')->store('uploads');

        $isExperience = false;
        $isSkill = false;

        // Load the .docx file
        $fullPath = storage_path('app/' . $path);
        $phpWord = IOFactory::load($fullPath);
        
        // Initialize an array to hold the lines
        $data = [];

        // Iterate through the sections and extract text
        foreach ($phpWord->getSections() as $section) {
            foreach ($section->getElements() as $element) {
                if (method_exists($element, 'getText')) {
                    $text = $element->getText();
                    $data[] = trim($text); // Add the text to the array
                }
            }
        }

        $fullname = explode(',', $data[0]);
        $phoneNo = explode(':', $data[3]);
        $email = explode(':', $data[4]);
        $username = explode('@', $email[1]);
        $gender = explode(':', $data[9]);
        $userData = [
            "email" => $email[1],
            "password" => $request['password'],
            "username" => $username[0],
            "phone_no" => $phoneNo[1],
            "first_name" => $fullname[0],
            "middle_name" => $fullname[2],
            "last_name" => $fullname[1],
            "address"=> $data[2],
            "desc" => $data[6],
            "rating" => 0,
            "lib_role_id" => 3,
            "lib_gender_id" => 1,
            "lib_profession_id" => 3
        ];

        $validator = Validator::make($userData, [
            'email' => 'required|email|unique:users,email'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422); // Return errors as JSON response
        }

        $profession = LibProfession::where('desc' , $data[1])->first();
        if($profession){
            $userData['lib_profession_id'] = $profession->id;
        } else {
            $addProfession = LibProfession::create(['desc' => $data[1]]);
            $userData['lib_profession_id'] = $addProfession->id;
        }
        if($gender[1] === 'FEMALE'){
            $userData['lib_gender_id'] = 2; 
        } elseif($gender[1] === 'MALE') {
            $userData['lib_gender_id'] = 1; 
        }

        $newUser = User::create($userData);
        $experienceData = [
            'title' => '',
            'desc' => '',
            'duration' => '',
            'applicant_id' => $newUser->id,
            'profession_id' => ''
        ];
        foreach ($data as $x) {
            // Check if the current item is 'EXPERIENCE' or 'SKILLS'
            if ($x === 'EXPERIENCE') {
                $isExperience = true;
                $isSkill = false;
                continue; // Skip to the next iteration
            }
        
            if ($x === 'SKILLS') {
                $isExperience = false;
                $isSkill = true;
                continue; // Skip to the next iteration
            }
        
            // Process skills if $isSkill is true
            if ($isSkill) {
                $skillExist = LibSkill::where('desc', $x)->first(); // Check if skill exists
        
                if ($skillExist) {
                    // Skill exists, associate it with the applicant
                    ApplicantSkill::create([
                        'lib_skill_id' => $skillExist->id,
                        'lib_applicant_id' => $newUser->id,
                    ]);
                } else {
                    // Skill does not exist, create a new skill
                    $newSkill = LibSkill::create([
                        'desc' => $x,
                        'lib_profession_id' => $newUser->lib_profession_id, // Assuming $data[1] contains the profession ID
                        'lib_skill_type_id' => 1,   
                    ]);
                    // Associate the new skill with the applicant
                    ApplicantSkill::create([
                        'lib_skill_id' => $newSkill->id,
                        'lib_applicant_id' => $newUser->id,
                    ]);
                }
            }
        
            // If you need to handle experience, add that logic here as well.
            if ($isExperience) {
                $temp = explode(':', $x);
                if (count($temp) === 2) { // Ensure we have both parts
                    if ($temp[0] === 'TITLE') {
                        $experienceData['title'] = trim($temp[1]); // Trim whitespace
                    }
                    if ($temp[0] === 'DESC') {
                        $experienceData['desc'] = trim($temp[1]); // Trim whitespace
                    }
                    if ($temp[0] === 'DURATION IN YEARS') {
                        $experienceData['duration'] = trim($temp[1]); // Trim whitespace
                    }
                    if ($temp[0] === 'PROFESSION') {
                        $professionExist = LibProfession::where('desc', trim($temp[1]))->first();
                        if ($professionExist) {
                            $experienceData['profession_id'] = $professionExist->id;
                            ApplicantExperience::create($experienceData);
                        } else {
                            $newProfession = LibProfession::create(['desc' => trim($temp[1])]);
                            $experienceData['profession_id'] = $newProfession->id;
                            ApplicantExperience::create($experienceData);

                        }
                    }
                }
            }
        }
        // Return the data as a JSON response
        return response()->json([
            "data"=>$data,
            "user"=>$userData,
            "exp"=>$experienceData
        ]);
    
    }

    
}
