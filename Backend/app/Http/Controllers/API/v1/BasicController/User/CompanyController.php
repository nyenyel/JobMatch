<?php

namespace App\Http\Controllers\API\v1\BasicController\User;

use App\Http\Requests\Store\CompanyStoreRequest;
use App\Http\Requests\Update\CompanyUpdateRequest;
use App\Http\Resources\CompanyResource;
use App\Models\Employer\Company;
use Illuminate\Http\Request;

class CompanyController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $company = Company::all();
        $company->load(['owner']);
        return CompanyResource::collection($company);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CompanyStoreRequest $request)
    {
        $company = Company::create($request->validated());
        $company->load(['owner']);
        return CompanyResource::make($company);
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company)
    {
        $company->load(['owner']);
        return CompanyResource::make($company);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(CompanyUpdateRequest $request, Company $company)
    {  
        $company->update($request->validated());
        $company->load(['owner']);
        return CompanyResource::make($company);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        $company->delete();
        return "Data Deleted";
    }
}
