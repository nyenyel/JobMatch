<?php

namespace Database\Seeders;

use App\Models\Library\LibApplicationStatus;
use App\Models\Library\LibGender;
use App\Models\Library\LibRole;
use App\Models\Library\LibSkillType;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        LibRole::upsert([
            ['desc' => 'Admin'],
            ['desc' => 'Employer'],
            ['desc' => 'Applicant'],
        ], ['desc']);

        LibGender::upsert([
            ['desc' => 'Male'],
            ['desc' => 'Female'],
        ], ['desc']);

        LibSkillType::upsert([
            ['desc' => 'General'],
            ['desc' => 'Technical'],
        ], ['desc']);

        LibApplicationStatus::upsert([
            ['desc' => 'Accepted'],
            ['desc' => 'Rejected'],
        ], ['desc']);
        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
