<?php

namespace App\Http\Controllers\API\v1\BasicController\User;

use App\Http\Requests\Store\ApplicantExperienceStoreRequest;
use App\Http\Requests\Update\ApplicantExperienceUpdateRequest;
use App\Http\Resources\ApplicantExperienceResource;
use App\Models\Applicant\ApplicantExperience;
use App\Models\Library\LibProfession;
use Illuminate\Http\Request;

class ExperienceController
{
    private $relation = [
        'applicant',
        'profession'
    ];
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $experience = ApplicantExperience::all();
        $experience->load($this->relation);
        return ApplicantExperienceResource::collection($experience);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(ApplicantExperienceStoreRequest $request)
    {
        $validated = $request->validated();
        $professionExist = LibProfession::where('desc', $validated['profession_id'])->first();
        if($professionExist){
            $validated['profession_id'] = $professionExist->id;
            $experience = ApplicantExperience::create($validated);
            $experience->load($this->relation);
            return  ApplicantExperienceResource::make($experience);
        } else {
            $newProfession = LibProfession::create(['desc' => $validated['profession_id']]);
            $validated['profession_id'] = $newProfession->id;
            $experience = ApplicantExperience::create($validated);
            $experience->load($this->relation);
            return  ApplicantExperienceResource::make($experience);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(ApplicantExperience $experience)
    {
        $experience->load($this->relation);
        return ApplicantExperienceResource::make($experience);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(ApplicantExperienceUpdateRequest $request, ApplicantExperience $experience)
    {
        $experience->update($request->validated());
        $experience->load($this->relation);
        return ApplicantExperienceResource::make($experience);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ApplicantExperience $experience)
    {
        $experience->delete();
        return "Data Deleted";
    }
}
