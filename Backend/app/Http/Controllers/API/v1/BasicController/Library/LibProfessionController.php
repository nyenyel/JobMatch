<?php

namespace App\Http\Controllers\API\v1\BasicController\Library;

use App\Http\Requests\Store\LibraryStoreRequest;
use App\Http\Requests\Update\LibraryUpdateRequest;
use App\Http\Resources\LibraryResource;
use App\Models\Library\LibProfession;
use Illuminate\Http\Request;

class LibProfessionController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return LibraryResource::collection(LibProfession::all());
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(LibraryStoreRequest $request)
    {
        $profession = LibProfession::create($request->validated());
        return LibraryResource::make($profession);
    }

    /**
     * Display the specified resource.
     */
    public function show(LibProfession $profession)
    {
        return LibraryResource::make($profession);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(LibraryUpdateRequest $request, LibProfession $profession)
    {
        $profession->update($request->validated());
        return LibraryResource::make($profession);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LibProfession $profession)
    {
        $profession->delete();
        return response()->noContent();
    }
}
