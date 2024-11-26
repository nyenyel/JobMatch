<?php

namespace App\Http\Controllers\api\v1\RuleBased;

use App\Models\Employer\Company;
use App\Models\Employer\JobApplicant;
use App\Models\Employer\JobPost;
use App\Models\Library\LibApplicationStatus;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DashboardController
{
    public function getDashboardData(){
        //job status
        $accepted = JobApplicant::where('lib_status_id', 1)->count();
        $pending = JobApplicant::where('lib_status_id', 2)->count();
        $rejected = JobApplicant::where('lib_status_id',3)->count();
        
        //applicant location
        $arangurenApplicant = User::where(DB::raw('LOWER(address)'), 'LIKE', '%' . strtolower('Aranguren') . '%')->count();
        $buenoApplicant = User::where(DB::raw('LOWER(address)'), 'LIKE', '%' . strtolower('Bueno') . '%')->count();
        $cristoReyApplicant = User::where(DB::raw('LOWER(address)'), 'LIKE', '%' . strtolower('Cristo Rey') . '%')->count();
        $cubcubApplicant = User::where(DB::raw('LOWER(address)'), 'LIKE', '%' . strtolower('Cubcub') . '%')->count();
        $cutcut1stApplicant = User::where(DB::raw('LOWER(address)'), 'LIKE', '%' . strtolower('Cutcut 1st') . '%')->count();
        $cutcut2ndApplicant = User::where(DB::raw('LOWER(address)'), 'LIKE', '%' . strtolower('Cutcut 2nd') . '%')->count();
        $doloresApplicant = User::where(DB::raw('LOWER(address)'), 'LIKE', '%' . strtolower('Dolores') . '%')->count();
        $estradaApplicant = User::where(DB::raw('LOWER(address)'), 'LIKE', '%' . strtolower('Estrada') . '%')->count();
        $lawyApplicant = User::where(DB::raw('LOWER(address)'), 'LIKE', '%' . strtolower('Lawy') . '%')->count();
        $mangaApplicant = User::where(DB::raw('LOWER(address)'), 'LIKE', '%' . strtolower('Manga') . '%')->count();
        $manlapigApplicant = User::where(DB::raw('LOWER(address)'), 'LIKE', '%' . strtolower('Manlapig') . '%')->count();
        $marugluApplicant = User::where(DB::raw('LOWER(address)'), 'LIKE', '%' . strtolower('Maruglu') . '%')->count();
        $oDonnellApplicant = User::where(DB::raw('LOWER(address)'), 'LIKE', '%' . strtolower("O'Donnell") . '%')->count();
        $santaJulianaApplicant = User::where(DB::raw('LOWER(address)'), 'LIKE', '%' . strtolower('Santa Juliana') . '%')->count();
        $santaLuciaApplicant = User::where(DB::raw('LOWER(address)'), 'LIKE', '%' . strtolower('Santa Lucia') . '%')->count();
        $santaRitaApplicant = User::where(DB::raw('LOWER(address)'), 'LIKE', '%' . strtolower('Santa Rita') . '%')->count();
        $santoDomingo1stApplicant = User::where(DB::raw('LOWER(address)'), 'LIKE', '%' . strtolower('Santo Domingo 1st') . '%')->count();
        $santoDomingo2ndApplicant = User::where(DB::raw('LOWER(address)'), 'LIKE', '%' . strtolower('Santo Domingo 2nd') . '%')->count();
        $santoRosarioApplicant = User::where(DB::raw('LOWER(address)'), 'LIKE', '%' . strtolower('Santo Rosario') . '%')->count();
        $talagaApplicant = User::where(DB::raw('LOWER(address)'), 'LIKE', '%' . strtolower('Talaga') . '%')->count();

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
        $tech = Company::where(DB::raw('LOWER(sector)'), 'LIKE', '%' . strtolower('Tech') . '%')->count();
        $finance = Company::where(DB::raw('LOWER(sector)'), 'LIKE', '%' . strtolower('Finance') . '%')->count();
        $healthcare = Company::where(DB::raw('LOWER(sector)'), 'LIKE', '%' . strtolower('Healthcare') . '%')->count();
        $educ = Company::where(DB::raw('LOWER(sector)'), 'LIKE', '%' . strtolower('Educ') . '%')->count();
        // $others = User::whereNotIn(DB::raw('LOWER(sector)'), ['tech', 'finance', 'healthcare', 'educ'])->count();
        $others = Company::whereRaw("
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
                'aranguren' => $arangurenApplicant,
                'bueno' => $buenoApplicant,
                'cristo_rey' => $cristoReyApplicant,
                'cubcub' => $cubcubApplicant,
                'cutcut_1st' => $cutcut1stApplicant,
                'cutcut_2nd' => $cutcut2ndApplicant,
                'dolores' => $doloresApplicant,
                'estrada' => $estradaApplicant,
                'lawy' => $lawyApplicant,
                'manga' => $mangaApplicant,
                'manlapig' => $manlapigApplicant,
                'maruglu' => $marugluApplicant,
                'o_donnell' => $oDonnellApplicant,
                'santa_juliana' => $santaJulianaApplicant,
                'santa_lucia' => $santaLuciaApplicant,
                'santa_rita' => $santaRitaApplicant,
                'santo_domingo_1st' => $santoDomingo1stApplicant,
                'santo_domingo_2nd' => $santoDomingo2ndApplicant,
                'santo_rosario' => $santoRosarioApplicant,
                'talaga' => $talagaApplicant,
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

        $user = Auth::user();
        
        // Sanitize search term to prevent issues with special characters
        $term = $validated['term'];
        $type = $validated['type'];
        $results = [];

        try {
            switch ($type) {
                case 'user':
                    $user->role->desc === 'Employer' ? 
                        // Search in Users table for first, last, or middle name matches
                        $results = User::where(function ($query) use ($term) {
                            $query->where('first_name', 'LIKE', "%{$term}%")
                                ->orWhere('last_name', 'LIKE', "%{$term}%")
                                ->orWhere('middle_name', 'LIKE', "%{$term}%");
                        })->where('lib_role_id', 3 )
                        ->select('id', 
                            DB::raw("CONCAT(first_name, ' ', COALESCE(middle_name, ''), ' ', last_name) as title")
                        )
                        ->get()
                        // Search in Users table for first, last, or middle name matches
                    :
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
