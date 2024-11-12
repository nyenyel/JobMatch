<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompanyResource extends JsonResource
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
            'partnered' => $this->partnered,
            'desc' => $this->desc,
            'length' => $this->length,
            'verified' => $this->verified,
            'owner' => new UserResource(resource: $this->whenLoaded('owner')),
            'image' => ImageResource::collection($this->whenLoaded('image')),
            'jobs' => JobPostResource::collection($this->whenLoaded('jobs')),
        ];
    }
}
