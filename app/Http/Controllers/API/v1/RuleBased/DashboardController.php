<?php

namespace App\Http\Controllers\api\v1\RuleBased;

use App\Models\Employer\Company;
use App\Models\Employer\JobApplicant;
use App\Models\Employer\JobPost;
use App\Models\Library\LibApplicationStatus;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController
{
    public function getDashboardData(){
        //job status
        $accepted = JobApplicant::where('lib_status_id', 1)->count();
        $pending = JobApplicant::where('lib_status_id', 2)->count();
        $rejected = JobApplicant::where('lib_status_id',3)->count();
        
        //applicant location
        $capasApplicant = User::where(DB::raw('LOWER(address)'), 'LIKE', '%' . strtolower('Capas') . '%')->count();
        $bambanApplicant = User::where(DB::raw('LOWER(address)'), 'LIKE', '%' . strtolower('Bamban') . '%')->count();
        $geronaApplicant = User::where(DB::raw('LOWER(address)'), 'LIKE', '%' . strtolower('Gerona') . '%')->count();
        $paniquiApplicant = User::where(DB::raw('LOWER(address)'), 'LIKE', '%' . strtolower('Paniqui') . '%')->count();
        $conceptionApplicant = User::where(DB::raw('LOWER(address)'), 'LIKE', '%' . strtolower('conception') . '%')->count();


        //applicant status
        $acceptedStatus = LibApplicationStatus::where('id', 1)->get();
        $pendingStatus = LibApplicationStatus::where('id', 2)->get();
        $rejectedStatus = LibApplicationStatus::where('id', 3)->get();

        //compoany status
        $verifiedComponies = Company::whereNotNull('verified')->count();
        $notVerifiedComponies = Company::whereNull('verified')->count();

        //user count
        $applicantCount = User::where('lib_role_id', 3)->count();
        $employerCount = User::where('lib_role_id', 2)->count();

        $searchWord = 'capas';
        $relation = [

            'jobApplication.applicant' => function ($query) use ($searchWord) {
                $query->where(DB::raw('LOWER(address)'), 'LIKE', '%' . strtolower($searchWord) . '%');
            }
        ];

        //capas
        $acceptedInCapas = $acceptedStatus->load($relation);
        $pendingInCapas = $pendingStatus->load($relation);
        $rejectedInCapas = $rejectedStatus->load($relation);

        //sectors
        $tech = User::where(DB::raw('LOWER(sector)'), 'LIKE', '%' . strtolower('Tech') . '%')->count();
        $finance = User::where(DB::raw('LOWER(sector)'), 'LIKE', '%' . strtolower('Finance') . '%')->count();
        $healthcare = User::where(DB::raw('LOWER(sector)'), 'LIKE', '%' . strtolower('Healthcare') . '%')->count();
        $educ = User::where(DB::raw('LOWER(sector)'), 'LIKE', '%' . strtolower('Educ') . '%')->count();
        // $others = User::whereNotIn(DB::raw('LOWER(sector)'), ['tech', 'finance', 'healthcare', 'educ'])->count();
        $others = User::whereRaw("
                        LOWER(sector) NOT LIKE '%tech%' AND
                        LOWER(sector) NOT LIKE '%finance%' AND
                        LOWER(sector) NOT LIKE '%healthcare%' AND
                        LOWER(sector) NOT LIKE '%educ%'
                    ")->count();

        $data = [
            'jobApplicant' => [
                'pending' => $pending,
                'accepted' => $accepted,
                'rejected' => $rejected,
            ],
            'userLocation' => [
                'capas' => $capasApplicant,
                'bamban' => $bambanApplicant,
                'gerona' => $geronaApplicant,
                'paniqui' => $paniquiApplicant,
                'conception' => $conceptionApplicant,
            ],
            'capasApplicant' => [
                'pending' => $pendingInCapas,
                'accepted' => $acceptedInCapas,
                'rejected' => $rejectedInCapas,
            ],
            'company' => [
                'verify' => $verifiedComponies,
                'notVerified' => $notVerifiedComponies,
            ],
            'user' => [
                'employer' => $employerCount,
                'applicant' => $applicantCount,
            ],
            'sector' => [
                'educ' => $educ,
                'tech' => $tech,
                'finance' => $finance,
                'healthcare' => $healthcare,
                'other' => $others,
            ],
        ];

        return response()->json($data);
    }

    public function search(Request $request) {
        $validated  = $request->validate([
            'type' => 'required',
            'term' => 'required',
        ]);

        // Sanitize search term to prevent issues with special characters
    $term = $validated['term'];
    $type = $validated['type'];
    $results = [];

    try {
        switch ($type) {
            case 'user':
                // Search in Users table for first, last, or middle name matches
                $results = User::where(function ($query) use ($term) {
                    $query->where('first_name', 'LIKE', "%{$term}%")
                          ->orWhere('last_name', 'LIKE', "%{$term}%")
                          ->orWhere('middle_name', 'LIKE', "%{$term}%");
                })
                ->select('id', 
                    DB::raw("CONCAT(first_name, ' ', COALESCE(middle_name, ''), ' ', last_name) as title")
                )
                ->get();
                break;
            case 'company':
                // Search in Company table for title matches
                $results = Company::where('title', 'LIKE', "%{$term}%")
                    ->get(['id', 'title']); // Customize selected columns as needed
                break;

            case 'jobs':
                // Search in Job table for title or description matches
                $results = JobPost::where('title', 'LIKE', "%{$term}%")
                    ->orWhere('desc', 'LIKE', "%{$term}%")
                    ->get(['id', 'title', 'desc']); // Customize selected columns as needed
                break;
            case 'employer':
                // Search in Job table for title or description matches
                $results = User::where(function ($query) use ($term) {
                    $query->where('first_name', 'LIKE', "%{$term}%")
                          ->orWhere('last_name', 'LIKE', "%{$term}%")
                          ->orWhere('middle_name', 'LIKE', "%{$term}%");
                })
                ->where('lib_role_id', 2)
                ->select('id', 
                    DB::raw("CONCAT(first_name, ' ', COALESCE(middle_name, ''), ' ', last_name) as title")
                )
                ->get();
                break;
            default:
                return response()->json(['message' => 'Invalid search type provided.'], 400);
        }

        return response()->json(['results' => $results]);
    } catch (\Exception $e) {
        return response()->json(['message' => 'An error occurred during the search.', 'error' => $e->getMessage()], 500);
    }
    }
}
