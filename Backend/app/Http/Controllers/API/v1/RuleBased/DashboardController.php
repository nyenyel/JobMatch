<?php

namespace App\Http\Controllers\api\v1\RuleBased;

use App\Models\Employer\Company;
use App\Models\Employer\JobApplicant;
use App\Models\Library\LibApplicationStatus;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController
{
    public function getDashboardData(){
        $accepted = JobApplicant::where('lib_status_id', 1)->count();
        $pending = JobApplicant::where('lib_status_id', 2)->count();
        $rejected = JobApplicant::where('lib_status_id',3)->count();
        
        $capasApplicant = User::where(DB::raw('LOWER(address)'), 'LIKE', '%' . strtolower('Capas') . '%')->count();
        $bambanApplicant = User::where(DB::raw('LOWER(address)'), 'LIKE', '%' . strtolower('Bamban') . '%')->count();
        $geronaApplicant = User::where(DB::raw('LOWER(address)'), 'LIKE', '%' . strtolower('Gerona') . '%')->count();
        $paniquiApplicant = User::where(DB::raw('LOWER(address)'), 'LIKE', '%' . strtolower('Paniqui') . '%')->count();
        $conceptionApplicant = User::where(DB::raw('LOWER(address)'), 'LIKE', '%' . strtolower('conception') . '%')->count();

        $acceptedStatus = LibApplicationStatus::where('id', 1)->get();
        $pendingStatus = LibApplicationStatus::where('id', 2)->get();
        $rejectedStatus = LibApplicationStatus::where('id', 3)->get();

        $verifiedComponies = Company::whereNotNull('verified')->count();
        $notVerifiedComponies = Company::whereNull('verified')->count();

        $applicantCount = User::where('lib_role_id', 3)->count();
        $employerCount = User::where('lib_role_id', 2)->count();

        $searchWord = 'capas';
        $relation = [

            'jobApplication.applicant' => function ($query) use ($searchWord) {
                $query->where(DB::raw('LOWER(address)'), 'LIKE', '%' . strtolower($searchWord) . '%');
            }
        ];

        $acceptedInCapas = $acceptedStatus->load($relation);
        $pendingInCapas = $pendingStatus->load($relation);
        $rejectedInCapas = $rejectedStatus->load($relation);

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
        ];

        return response()->json($data);
    }
}
