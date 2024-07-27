<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobRecommendationController extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=> $this->id,
            'title'=> $this->title,
            'desc'=> $this->desc,
            'experience'=> $this->experience,
            'post_duration'=> $this->post_duration,
            'employer_id'=> $this->employer_id,
            'lib_profession_id'=> $this->lib_profession_id,
            'company_id'=> $this->company_id,
            'lib_job_status_id'=> $this->lib_job_status_id,
        ];
    }
}
