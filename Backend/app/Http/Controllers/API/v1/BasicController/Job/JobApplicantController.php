<?php

namespace App\Http\Controllers\API\v1\BasicController\Job;

use App\Http\Controllers\api\v1\basiccontroller\SMS\SMSController;
use App\Http\Requests\Store\JobApplicantStoreRequest;
use App\Http\Requests\Update\JobApplicantUpdateRequest;
use App\Http\Resources\JobApplicantResource;
use App\Models\Employer\JobApplicant;
use App\Http\Service\SemaphoreService;
use GuzzleHttp\Psr7\Message;
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
        $validated = $request->validated();
        $alreadyApplied = JobApplicant::where('job_id', $validated['job_id'])
                                    ->where('applicant_id' , $validated['applicant_id'])
                                    ->first();
        if($alreadyApplied){
            return response()->json(['message' => 'You already applied for this job post.']);
        } else {
            $applicant = JobApplicant::create($validated);
            return response()->json(['message' => 'Applied Succesfully.']);
            // return JobApplicantResource::make($applicant->load($this->relation));
        }

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

    public function updateApplicationStatus(Request $request, JobApplicant $jobApplicant){
        $validated = $request->validate(['lib_status_id' => 'required|integer']);
        $jobApplicant->update($validated);
        $jobApplicant->load(['applicant', 'job']);
        $sms = new SemaphoreService();

        $message = '';
        if ($validated['lib_status_id'] === 1) {
            $message = 'Congratulations!
            Your application for the job '
            . $jobApplicant->job->title 
            . ' has been accepted.
            You can now contact the employer through the website at JobMatching Space';
        } elseif ($validated['lib_status_id'] === 3) {
            $message = 'Good day,   We regret to inform you that your application for the job ' 
            . $jobApplicant->job->title 
            . ' has been rejected. 
            Better luck next time!';
        }

        return $sms->sendSMS($jobApplicant->applicant->phone_no, 
        'Test Message
        ' . $message);
    }
}
