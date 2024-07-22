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
        Schema::create('job_posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('desc');
            $table->date('post_duration');
            $table->unsignedBigInteger('employer_id');
            $table->unsignedBigInteger('lib_profession_id');
            $table->unsignedBigInteger('company_id');
            $table->foreign('employer_id')->references('id')->on('users');
            $table->foreign('lib_profession_id')->references('id')->on('lib_professions');
            $table->foreign('company_id')->references('id')->on('companies');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_posts');
    }
};
