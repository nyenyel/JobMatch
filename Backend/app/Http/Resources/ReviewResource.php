<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
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
            'rate' => $this->rate,
            'review' => $this->review,
            'by' => new UserResource($this->whenLoaded('reviewedBy')),
            'for' => new UserResource($this->whenLoaded('reviewedFor')),
        ];
    }
}
