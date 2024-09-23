<?php

namespace App\Http\Controllers\api\v1\basiccontroller\Library;

use App\Http\Resources\LibraryResource;
use App\Models\Library\LibApplicationStatus;
use Illuminate\Http\Request;

class LibAplicationStatusController
{
    protected $relation = [
        'jobApplication.job',
        'jobApplication.job.employer',
        'jobApplication.job.company',
        'jobApplication.applicant',
        'jobApplication.status'
    ];
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(LibApplicationStatus $applicationStatus)
    {
        return LibraryResource::make($applicationStatus->load($this->relation));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
