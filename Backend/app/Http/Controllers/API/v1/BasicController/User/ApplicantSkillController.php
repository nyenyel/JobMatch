<?php

namespace App\Http\Controllers\API\v1\BasicController\User;

use App\Http\Requests\Store\ApplicantSkllStoreReqeuest;
use App\Http\Requests\Update\ApplicantSkllUpdateReqeuest;
use App\Http\Resources\ApplicantSkillResource;
use App\Models\Applicant\ApplicantSkill;
use App\Models\Library\LibSkill;
use Illuminate\Http\Request;

class ApplicantSkillController
{
    protected $relation = [
        'skill',
        'applicant'
    ];
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $skill = ApplicantSkill::all();
        $skill->load(['skill', 'applicant']);
        return ApplicantSkillResource::collection($skill);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(ApplicantSkllStoreReqeuest $request)
    {
        $validated = $request->validated();
        $skillExist = LibSkill::where('desc', $validated['desc'])
                            ->where('lib_profession_id',$validated['lib_profession_id'])
                            ->first();
        if($skillExist){
            $skillID = $skillExist->id;
            $skill = ApplicantSkill::create([
                'lib_skill_id' => $skillID,
                'lib_applicant_id' => $validated['lib_applicant_id'],
            ]);

            return ApplicantSkillResource::make($skill->load($this->relation));
        }
        else{
            $newSkill = LibSkill::create([
                'lib_skill_type_id' => '1',
                'desc' => $validated['desc'],
                'lib_profession_id' =>  $validated['lib_profession_id']
            ]);
            $data = ApplicantSkill::create([
                'lib_skill_id' => $newSkill->id,
                'lib_applicant_id' => $validated['lib_applicant_id'],
            ]);
            return ApplicantSkillResource::make($data->load($this->relation));
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ApplicantSkill $applicantSkill)
    {
        $applicantSkill->load(['applicant' ,'skill']);
        return ApplicantSkillResource::make($applicantSkill);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(ApplicantSkllUpdateReqeuest $request, ApplicantSkill $applicantSkill)
    {
        $applicantSkill->update($request->validated());
        $applicantSkill->load(['applicant', 'skill']);
        return ApplicantSkillResource::make($applicantSkill);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ApplicantSkill $applicantSkill)
    {
        $applicantSkill->delete();
        return "Deleted Succefully";
    }
}
