<?php

namespace App\Http\Controllers\api\v1\basiccontroller\library;

use App\Http\Resources\LibraryResource;
use App\Models\Library\LibProfessionLevel;
use Illuminate\Http\Request;

class LibProfessionLevelController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return LibraryResource::collection(LibProfessionLevel::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
