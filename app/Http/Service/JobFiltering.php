<?php  

namespace App\Http\Service;

use App\Http\Resources\JobPostResource;
use App\Http\Resources\SkillResource;
use App\Http\Resources\UserResource;
use App\Models\Employer\JobPost;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class JobFiltering{

    private $jobRelation = [
        'employer',
        'profession',
        'company',
        'status',
        'skill.skill.links'
    ];

    private $userRelation = [
        'profession',
        'skill.skill',
        'experience',
    ];
    // public function JobRecommendation(User $user){
    //     $jobPost = $this->openJob();
    //     $jobPost->load($this->jobRelation);

    //     $user->load($this->userRelation);
    //     $user = UserResource::make($user);
        
    //     $data = [];
    //     $skillReq = [];
    //     $pj = 2;

    //     foreach($jobPost as $job){
    //         $jobProfession =$job->lib_profession_id;
    //         $pa = 0;
    //         $sa = 0;
    //         $sj = $job->skill->count();        
    //         $ae = 0;
    //         $je = $job->experience;

    //         if($user->lib_profession_id == $jobProfession){
    //             $pa += 2;
    //         }

    //         foreach($job->skill as $jobSkills){
    //             $skillExist = false;
    //             foreach($user->skill as $userSkills){
    //                 if($jobSkills->lib_skill_id == $userSkills->lib_skill_id ){
    //                     $sa +=1;
    //                     $skillExist = true;
    //                 }
    //             }
    //             if(!$skillExist){
    //                 $skillReq[] =$jobSkills->skill;
    //             }
    //         }
    //         foreach($user->experience as $experience){
    //             if($experience->profession_id == $jobProfession){
    //                 $ae += $experience->duration;
    //             }
    //         }
    //         if($ae > $je){
    //             $ae = $je;
    //         }

    //         $Ep = .45*($pj+$sj);
    //         $e = ($ae/$je)*$Ep;
    //         $numerator = $pa + $sa + $e;
    //         $denaminator = $Ep + $pj + $sj;
    //         $x = ($numerator/$denaminator)*100 ;
    //         $data[] = [
    //             'percentate' => number_format($x,2),
    //             'req' => SkillResource::collection($skillReq),
    //             'job' => JobPostResource::make($job)

    //         ];
    //     }
    //     return $data;
    // }

    public function JobRecommendation(User $user){
        $jobPost = $this->openJob();
        $jobPost->load($this->jobRelation);
    
        $user->load($this->userRelation);
        $user = UserResource::make($user);
    
        $data = [];
        $pj = 2;
    
        foreach($jobPost as $job){
            $jobProfession = $job->lib_profession_id;
            $pa = 0;
            $sa = 0;
            $sj = $job->skill->count();        
            $ae = 0;
            $je = $job->experience;
            $skillRecom = [];
            $skillReq = [];
    
            if($user->lib_profession_id == $jobProfession){
                $pa += 2;
            }
    
            foreach($job->skill as $jobSkills){
                $skillExist = false;
                foreach($user->skill as $userSkills){
                    if($jobSkills->lib_skill_id == $userSkills->lib_skill_id ||  $jobSkills->skill->desc === $userSkills->skill->desc){
                        $sa += 1;
                        $skillExist = true;
                    } 
                }
                if(!$skillExist){
                    $skillReq[] = $jobSkills->skill;
                    foreach($jobSkills->skill->links as $link){
                        $skillRecom [] = $link;
                        Log::info('Recomendation', ['linkgs' => $link]);
                    }
                }
            }
            foreach($user->experience as $experience){
                if($experience->profession_id == $jobProfession){
                    $ae += $experience->duration;
                }
            }
            if($ae > $je){
                $ae = $je;
            }
    
            $Ep = .45 * ($pj + $sj);
            
            // Check to prevent division by zero for $je and $denaminator
            $e = ($je > 0) ? ($ae / $je) * $Ep : 0;
            $numerator = $pa + $sa + $e;
            $denaminator = $Ep + $pj + $sj;
            $x = ($denaminator > 0) ? ($numerator / $denaminator) * 100 : 0;
    
            // if($x != 0){

                $data[] = [
                    'percentage' => number_format($x, 2),
                    'req' => SkillResource::collection($skillReq),
                    'job' => JobPostResource::make($job->load('level')),
                    'recommendation' => $skillRecom,
                ];
            // }

        }
        usort($data, function ($a, $b) {
            return $b['percentage'] <=> $a['percentage'];
        });

        return $data;
    }

    public function SingleJobRecommendation(User $user, JobPost $job)
    {
        $job->load($this->jobRelation);
        $user->load($this->userRelation);

        $user = UserResource::make($user);

        $data = [];
        $skillReq = [];
        $pj = 2;
        
        $jobProfession = $job->lib_profession_id;
        $pa = 0;
        $sa = 0;
        $sj = $job->skill->count();
        $ae = 0;
        $je = $job->experience;

        // Profession match
        if ($user->lib_profession_id == $jobProfession) {
            $pa += 2;
        }

        // Skill match
        foreach ($job->skill as $jobSkills) {
            $skillExist = false;
            foreach ($user->skill as $userSkills) {
                if ($jobSkills->lib_skill_id == $userSkills->lib_skill_id || $jobSkills->skill->desc === $userSkills->skill->desc) {
                    $sa += 1;
                    $skillExist = true;
                    break;
                }
            }
            if (!$skillExist) {
                foreach($jobSkills->skill->links as $link){
                    $skillReq[] = $link;
                }
            }
        }

        // Experience match
        foreach ($user->experience as $experience) {
            if ($experience->profession_id == $jobProfession) {
                $ae += $experience->duration;
            }
        }
        $ae = min($ae, $je); // Limit experience to job's required experience

        $Ep = .45 * ($pj + $sj);

        // Match percentage calculation
        $e = ($je > 0) ? ($ae / $je) * $Ep : 0;
        $numerator = $pa + $sa + $e;
        $denominator = $Ep + $pj + $sj;
        $matchPercentage = ($denominator > 0) ? ($numerator / $denominator) * 100 : 0;

        // $accepted = $job->employer->jobPost->application()->where('lib_status_id', 3)->count();
         
        $accepted = $job->employer->jobPost()->withCount(['application' => function ($query) {
            $query->where('lib_status_id', 1);
        }])->get()->sum('application_count');

        return response()->json([
            'percentage' => number_format($matchPercentage, 2),
            'recommendation' => $skillReq,
            'accepted' => $accepted
        ]);
    }
    
    public function openJob(){
        $openJob = JobPost::where('lib_job_status_id', 1)->has('skill')->get();
        return $openJob;
    }
}