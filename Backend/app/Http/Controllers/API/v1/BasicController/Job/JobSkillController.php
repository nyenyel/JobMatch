<?php

namespace App\Http\Controllers\API\v1\BasicController\Job;

use App\Http\Requests\Store\JobSkillStoreRequest;
use App\Http\Requests\Update\JobSkillUpdateRequest;
use App\Http\Resources\JobSkillResource;
use App\Models\Employer\JobSkill;
use Illuminate\Http\Request;

class JobSkillController
{
    private $relation = [
        'job.profession',
        'skill'
    ];
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $skill = JobSkill::all();
        return JobSkillResource::collection($skill->load($this->relation));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(JobSkillStoreRequest $request)
    {
        $skill = JobSkill::create($request->validated());
        return JobSkillResource::make($skill->load($this->relation));
        
    }

    /**
     * Display the specified resource.
     */
    public function show(JobSkill $jobSkill)
    {
        return JobSkillResource::make($jobSkill->load($this->relation));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(JobSkillUpdateRequest $request, JobSkill $jobSkill)
    {
        $jobSkill->update($request->validated());
        return JobSkillResource::make($jobSkill->load($this->relation));
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JobSkill $jobSkill)
    {
        $jobSkill->delete();
        return "Data Deleted";
    }
}
