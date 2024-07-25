<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobApplicantResource extends JsonResource
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
            'job' => new JobPostResource($this->whenLoaded('job')),
            'applicant' => new UserResource($this->whenLoaded('applicant')),
            'status' => new LibraryResource($this->whenLoaded('status')),
        ];
    }
}
