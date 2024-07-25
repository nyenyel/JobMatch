<?php

namespace App\Http\Controllers\API\v1\BasicController\Job;

use App\Http\Requests\Store\JobApplicantStoreRequest;
use App\Http\Requests\Update\JobApplicantUpdateRequest;
use App\Http\Resources\JobApplicantResource;
use App\Models\Employer\JobApplicant;
use Illuminate\Http\Request;

class JobApplicantController
{
    private $relation = [
        'job',
        'applicant',
        'status'
    ];
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $applicant = JobApplicant::all();
        return JobApplicantResource::collection($applicant->load($this->relation));
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(JobApplicantStoreRequest $request)
    {
        $applicant = JobApplicant::create($request->validated());
        return JobApplicantResource::make($applicant->load($this->relation));
        
    }

    /**
     * Display the specified resource.
     */
    public function show(JobApplicant $jobApplicant)
    {
        return JobApplicantResource::make($jobApplicant->load($this->relation));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(JobApplicantUpdateRequest $request, JobApplicant $jobApplicant)
    {
        $jobApplicant->update($request->validated());
        return JobApplicantResource::make($jobApplicant->load($this->relation));
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JobApplicant $jobApplicant)
    {
        $jobApplicant->delete();
        return "Data Deleted";
    }
}
