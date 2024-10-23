<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LibraryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'desc' =>$this->desc,
            'application' =>  JobApplicantResource::collection($this->whenLoaded('jobApplication')),
            'skill' =>  SkillResource::collection($this->whenLoaded('skill'))
        ];
    }
}
