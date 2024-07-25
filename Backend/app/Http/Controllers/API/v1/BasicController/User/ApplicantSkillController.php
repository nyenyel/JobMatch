<?php

namespace App\Http\Controllers\API\v1\BasicController\User;

use App\Http\Requests\Store\ApplicantSkllStoreReqeuest;
use App\Http\Requests\Update\ApplicantSkllUpdateReqeuest;
use App\Http\Resources\ApplicantSkillResource;
use App\Models\Applicant\ApplicantSkill;
use Illuminate\Http\Request;

class ApplicantSkillController
{
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
        $skill = ApplicantSkill::create($request->validated());
        $skill->load(['skill', 'applicant']);
        return ApplicantSkillResource::make($skill);
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
