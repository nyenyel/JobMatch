<?php

namespace App\Http\Controllers\API\v1\BasicController\User;

use App\Http\Requests\CompanyRequest;
use App\Http\Requests\Store\CompanyStoreRequest;
use App\Http\Requests\Update\CompanyUpdateRequest;
use App\Http\Resources\CompanyResource;
use App\Http\Service\SemaphoreService;
use App\Models\Employer\Company;
use App\Models\Library\LibCompanyVerificationImage;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CompanyController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $company = Company::all();
        $company->load(['owner', 'jobs']);
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
        $company->load(['owner.myReviews', 'jobs.skill.skill', 'jobs.level', 'jobs.employer', 'jobs.company']);
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
        $company->load([
            'owner',
        ]);
        $sms = new SemaphoreService();

        $phoneNo = $company->owner->phone_no;
        $message = 'Good day,   We regret to inform you that your company ' 
        . $company->title 
        . ' has been rejected for verification. Please upload the company again
        with more proof or eveidence that the company is legitimate.';
        
        // $smsResponse = "im fuckin testing you dumbass";
        $smsResponse = $sms->sendSMS($phoneNo, $message);
        $company->image()->delete();
        $company->delete();
        return response()->json([
            'phone_no' => $phoneNo,
            'sms_response' => $smsResponse,
        ]);
    }

    public function storeCompany(Request $request)
    {
        // Log the incoming request to inspect its structure
        $validatedData = $request->validate([
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'company' => 'required|string',
            'desc' => 'required|string',
            'owner_id' => 'required|integer' // Ensure you also validate owner_id
        ]);

        Log::info('Validation passed', $validatedData);

        if ($request->hasFile('images')) {
            $imageUrls = []; // Change the variable name to be more descriptive
            $company = Company::create([
                'title' => $request['company'], 
                'desc' => $request['desc'],
                'owner_id' => $request['owner_id'],
            ]); // Adjust according to your Company model

            foreach ($request->file('images') as $image) {
                $path = $image->store('uploads', 'public'); // Store image
                $imageUrl = url("storage/$path"); // Create the full URL for the image
                $imageUrls[] = $imageUrl; // Add the full URL to the array

                // Save the image link in the database
                LibCompanyVerificationImage::create([
                    'img' => $imageUrl, // Store the full image URL
                    'company_id' => $company->id, // Associate with company
                ]);
            }

            return response()->json([
                'message' => 'Images uploaded and stored successfully',
                'image_urls' => $imageUrls // Return the full URLs
            ], 200);
        }
        
        return response()->json(['message' => 'No images provided'], 400);
    }

    public function verifiedCompany(Request $request) {
        // Validate that owner_id is required and is an integer
        $request->validate([
            'owner_id' => 'required|integer'
        ]);
    
        // Fetch companies where owner_id matches and where verified is null
        $data = Company::where('owner_id', $request->input('owner_id'))
                        ->whereNotNull('verified')
                        ->get();
        $data->load('owner', 'jobs');
        
        // Return the data as a resource collection
        return CompanyResource::collection($data);
    }
    public function toVerifyCompany(){

        $data = Company::whereNull('verified')->get();
        $data->load('owner' ,'image');
        return CompanyResource::collection($data);
    }
    public function notifyTheVerification(Company $company){
        $data = 'You Company (Company name) has been verified';
        $company->update(['verified' => 1]);
        return response()->json([
            'message' => $data,
            'company' => $company
        ]);
    }
    public function givePartnership(Company $company) {

        if($company->partnered == null){
            $company->update(['partnered' => 1]);
        } else {
            $company->update(['partnered' => null]);
        }
        return response()->json(['data' => $company]);
    }
}
