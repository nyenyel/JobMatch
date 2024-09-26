<?php

namespace App\Http\Resources;

use App\Models\Library\LibProfession;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SkillResource extends JsonResource
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
            'desc' => $this->desc,
            'profession' => new LibraryResource($this->whenLoaded('profession')),
            'skillType' => new LibraryResource($this->whenLoaded('skillType')),
            'links' => LinkResource::collection($this->whenLoaded('links')),
        ];
    }
}
