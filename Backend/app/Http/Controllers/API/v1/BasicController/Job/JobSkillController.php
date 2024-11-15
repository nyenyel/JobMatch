<?php

namespace App\Http\Controllers\API\v1\BasicController\Job;

use App\Http\Requests\Store\JobSkillStoreRequest;
use App\Http\Requests\Update\JobSkillUpdateRequest;
use App\Http\Resources\JobSkillResource;
use App\Models\Employer\JobSkill;
use App\Models\Library\LibSkill;
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
        $validated = $request->validated();
        $skillExist = LibSkill::where('desc', $validated['desc'])
                            ->where('lib_profession_id',$validated['lib_profession_id'])
                            ->first();


        if($skillExist){
            $skillID = $skillExist->id;
            $jobSkillExist = JobSkill::where('lib_skill_id',$skillID)
                            ->where('job_id', $validated['job_id'])
                            ->exists();
            if(!$jobSkillExist){
                $skill = JobSkill::create([
                    'lib_skill_id' => $skillID,
                    'job_id' => $validated['job_id'],
                ]);
                return JobSkillResource::make($skill->load($this->relation));
            }
            return response()->json(['result' => 'Data already exist']);
        }
        else{
            $newSkill = LibSkill::create([
                'lib_skill_type_id' => '1',
                'desc' => $validated['desc'],
                'lib_profession_id' =>  $validated['lib_profession_id']
            ]);
            $data = JobSkill::create([
                'lib_skill_id' => $newSkill->id,
                'job_id' => $validated['job_id'],
            ]);
            return JobSkillResource::make($data->load($this->relation));
        }
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
