<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobPostResource extends JsonResource
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
            'title' => $this->title,
            'desc' => $this->desc,
            'post_duration' => $this->post_duration,
            'employer' => new UserResource($this->whenLoaded('employer')),
            'profession' => new LibraryResource($this->whenLoaded('profession')),
            'company' => new CompanyResource($this->whenLoaded('company')),
            'status' => new LibraryResource($this->whenLoaded('status')),
        ];
    }
}
