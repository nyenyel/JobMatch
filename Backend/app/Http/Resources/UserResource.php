<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'email'=> $this->email,
            'username'=> $this->username,
            'phone_no'=> $this->phone_no,
            'first_name'=> $this->first_name,
            'middle_name'=> $this->middle_name,
            'last_name'=> $this->last_name,
            'address'=> $this->address,
            'lib_gender_id'=> $this->lib_gender_id,
            'desc'=> $this->desc,
            'image'=> $this->image,
            'rating'=> $this->rating,
            'sector'=> $this->sector,
            'role'=> new LibraryResource($this->whenLoaded('role')),
            'gender'=> new LibraryResource($this->whenLoaded('gender')),
            'profession'=> new LibraryResource($this->whenLoaded('profession')),
            'review'=> ReviewResource::collection($this->whenLoaded('myReviews')),
            'company'=> CompanyResource::collection($this->whenLoaded('company')),
            'jobs'=> JobPostResource::collection($this->whenLoaded('jobPost')),
            'skill'=> ApplicantSkillResource::collection($this->whenLoaded('skill')),
            'experience'=> ApplicantExperienceResource::collection($this->whenLoaded('experience')),
            'application'=> JobApplicantResource::collection($this->whenLoaded('application')),
        ];
    }
}
