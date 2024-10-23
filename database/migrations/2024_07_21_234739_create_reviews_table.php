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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->float('rate');
            $table->string('review');
            $table->unsignedBigInteger('reviewed_by');
            $table->unsignedBigInteger('reviewed_for');
            $table->foreign('reviewed_by')->references('id')->on('users');
            $table->foreign('reviewed_for')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
