<?php  

namespace App\Http\Service;

use App\Http\Resources\JobPostResource;
use App\Http\Resources\SkillResource;
use App\Http\Resources\UserResource;
use App\Models\Employer\JobPost;
use App\Models\User;

class JobFiltering{

    private $jobRelation = [
        'employer',
        'profession',
        'company',
        'status',
        'skill.skill'
    ];

    private $userRelation = [
        'profession',
        'skill.skill',
        'experience',
    ];
    public function JobRecommendation(User $user){
        $jobPost = $this->openJob();
        $jobPost->load($this->jobRelation);

        $user->load($this->userRelation);
        $user = UserResource::make($user);
        
        $data = [];
        $skillReq = [];
        $pj = 2;

        foreach($jobPost as $job){
            $jobProfession =$job->lib_profession_id;
            $pa = 0;
            $sa = 0;
            $sj = $job->skill->count();        
            $ae = 0;
            $je = $job->experience;

            if($user->lib_profession_id == $jobProfession){
                $pa += 2;
            }

            foreach($job->skill as $jobSkills){
                $skillExist = false;
                foreach($user->skill as $userSkills){
                    if($jobSkills->lib_skill_id == $userSkills->lib_skill_id ){
                        $sa +=1;
                        $skillExist = true;
                    }
                }
                if(!$skillExist){
                    $skillReq[] =$jobSkills->skill;
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

            $Ep = .45*($pj+$sj);
            $e = ($ae/$je)*$Ep;
            $numerator = $pa + $sa + $e;
            $denaminator = $Ep + $pj + $sj;
            $x = ($numerator/$denaminator)*100 ;
            $data[] = [
                'percentate' => number_format($x,2),
                'req' => SkillResource::collection($skillReq),
                'job' => JobPostResource::make($job)

            ];
        }
        return $data;
    }

    public function openJob(){
        $openJob = JobPost::where('lib_job_status_id', 1)->get();
        return $openJob;
    }
}