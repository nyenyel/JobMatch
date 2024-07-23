<?php

namespace App\Http\Controllers\API\v1\BasicController\Library;

use App\Http\Requests\Store\LibrarySkillStoreRequest;
use App\Http\Resources\SkillResource;
use App\Models\Library\LibSkill;
use Illuminate\Http\Request;

class LibSkillController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $skill = LibSkill::all();
        $skill->load(['profession','skillType']);
        return SkillResource::collection($skill);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LibrarySkillStoreRequest $request)
    {
        $skill = LibSkill::create($request->validated());
        $skill->load(['profession','skillType']);
        return SkillResource::make($skill);
    }

    /**
     * Display the specified resource.
     */
    public function show(LibSkill $skill)
    {
        $skill->load(['profession','skillType']);
        return SkillResource::make($skill);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(LibrarySkillStoreRequest $request, LibSkill $skill)
    {
        $skill->update($request->validated());
        $skill->load(['profession','skillType']);
        return SkillResource::make($skill);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LibSkill $skill)
    {
        $skill->delete();
        return "Deleted Successfully";
    }
}
