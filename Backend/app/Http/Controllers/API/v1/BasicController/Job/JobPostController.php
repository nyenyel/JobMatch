<?php

namespace App\Http\Controllers\API\v1\BasicController\Job;

use App\Http\Requests\Store\JobPostStoreRequest;
use App\Http\Requests\Update\JobPostUpdateRequest;
use App\Http\Resources\JobPostResource;
use App\Models\Employer\JobPost;
use Illuminate\Http\Request;

class JobPostController
{
    private $relation = [
        'employer',
        'employer.company',
        'profession',
        'company',
        'status',
        'skill.skill',
        'application.applicant.profession',
        'application.applicant.skill.skill',
        'application.applicant.experience.profession',
        'level'
    ];

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $job = JobPost::all();
        return JobPostResource::collection($job->load($this->relation));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(JobPostStoreRequest $request)
    {
        $job = JobPost::create($request->validated());
        return JobPostResource::make($job->load($this->relation));
        
    }

    /**
     * Display the specified resource.
     */
    public function show(JobPost $job)
    {
        $relationWithCondition = [
            'employer',
            'employer.company',
            'profession',
            'company',
            'status',
            'skill.skill',
            'application' => function ($query) {
                $query->where('lib_status_id', 2);
            },
            'application.applicant.profession',
            'application.applicant.skill.skill',
            'application.applicant.experience.profession',
            'level'
        ];
        $loadedJob =$job->load($relationWithCondition);
        return JobPostResource::make( $loadedJob);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(JobPostUpdateRequest $request, JobPost $job)
    {
        $job->update($request->validated());
        return JobPostResource::make($job->load($this->relation));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JobPost $job)
    {
        $job->delete();
        return "Data Deleted";
    }
}
