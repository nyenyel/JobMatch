<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('lib_skills', function (Blueprint $table) {
            $table->id();
            $table->string('desc');
            $table->unsignedBigInteger('lib_profession_id');
            $table->unsignedBigInteger('lib_skill_type_id');
            $table->foreign('lib_profession_id')->references('id')->on('lib_professions');
            $table->foreign('lib_skill_type_id')->references('id')->on('lib_skill_types');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lib_skills');
    }
};
