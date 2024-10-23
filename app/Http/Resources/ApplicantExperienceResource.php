<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApplicantExperienceResource extends JsonResource
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
            'duration'=> $this->duration,
            'applicant'=> new UserResource($this->whenLoaded('applicant')),
            'profession' => new LibraryResource($this->whenLoaded('profession'))
        ];
    }
}
