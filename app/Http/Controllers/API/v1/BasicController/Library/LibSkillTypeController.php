<?php

namespace App\Http\Controllers\API\v1\BasicController\Library;

use App\Http\Requests\Store\LibraryStoreRequest;
use App\Http\Requests\Update\LibraryUpdateRequest;
use App\Http\Resources\LibraryResource;
use App\Models\Library\LibSkillType;
use Illuminate\Http\Request;

class LibSkillTypeController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return LibraryResource::collection(LibSkillType::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LibraryStoreRequest $request)
    {
        $skillType = LibSkillType::create($request->validated());
        return LibraryResource::make($skillType);
    }

    /**
     * Display the specified resource.
     */
    public function show(LibSkillType $skillType)
    {
        return LibraryResource::make($skillType);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(LibraryUpdateRequest $request, LibSkillType $skillType)
    {
        $skillType->update($request->validated());
        return LibraryResource::make($skillType);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LibSkillType $skillType)
    {
        $skillType->delete();
        return "Deleted Successfully";
    }
}
