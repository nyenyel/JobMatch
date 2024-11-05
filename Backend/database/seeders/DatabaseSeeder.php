<?php

namespace Database\Seeders;

use App\Models\Library\LibApplicationStatus;
use App\Models\Library\LibGender;
use App\Models\Library\LibJobStatus;
use App\Models\Library\LibProfession;
use App\Models\Library\LibProfessionLevel;
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
            ['desc' => 'Pending'],
            ['desc' => 'Rejected'],
            ['desc' => 'Interview'],
        ], ['desc']);
        LibJobStatus::upsert([
            ['desc' => 'Open'],
            ['desc' => 'Close'],
        ], ['desc']);
        LibProfession::upsert([
            ['desc' => 'Dummy']
        ],['desc']);

        LibProfessionLevel::upsert([
            ['desc' => 'With diploma'],
            ['desc' => 'Without diploma'],
            ['desc' => 'Undergraduate'],
            ['desc' => 'Full-Time'],
            ['desc' => 'Part-Time'],
            ['desc' => 'Remote'],
            ['desc' => 'Freelance'],
            ['desc' => 'Entry-Level'],
            ['desc' => 'Mid-Level'],
            ['desc' => 'Senior-Level'],
            ['desc' => 'Internship'],
            ['desc' => 'Contract'],
            ['desc' => 'Temporary'],
            ['desc' => 'Industry'],
            ['desc' => 'Technology'],
            ['desc' => 'Healthcare'],
            ['desc' => 'Education'],
            ['desc' => 'Sales'],
            ['desc' => 'Marketing'],
            ['desc' => 'Engineering'],
            ['desc' => 'Finance'],
            ['desc' => 'Administration'],
            ['desc' => 'Customer Service'],
            ['desc' => 'Creative'],
            ['desc' => 'Skilled Trades'],
            ['desc' => 'Non-Profit'],
            ['desc' => 'Startups'],
            ['desc' => 'Management'],
        ], ['desc']);

        $updateFields = [
            'username', 
            'phone_no', 
            'first_name',
            'middle_name',
            'last_name',
            'address',
            'desc',
            'rating',
            'lib_role_id',
            'lib_gender_id',
            'lib_profession_id'
        ];
        $uniqueKeys = ['email'];

        $admin = [
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password'), // Don't forget to hash the password
            'username' => 'admin',
            'phone_no' => '09217583643',
            'first_name' => 'System',
            'middle_name' => '',
            'last_name' => 'Admin',
            'address' => 'Somewhere At Gerona',
            'desc' => 'Im the Current Accountant',
            'rating' => 0,
            'lib_role_id' => 1,
            'lib_gender_id' => 1,
            'lib_profession_id' => 1,
        ];
        $employer = [
            'email' => 'employer@gmail.com',
            'password' => bcrypt('password'), // Don't forget to hash the password
            'username' => 'employer',
            'phone_no' => '09217583643',
            'first_name' => 'Job',
            'middle_name' => '',
            'last_name' => 'Employer',
            'address' => 'Somewhere At Gerona',
            'desc' => 'Im the Current Accountant',
            'rating' => 0,
            'lib_role_id' => 2,
            'lib_gender_id' => 1,
            'lib_profession_id' => 1,
        ];
        $applicant = [
            'email' => 'applicant@gmail.com',
            'password' => bcrypt('password'), // Don't forget to hash the password
            'username' => 'applicant',
            'phone_no' => '09217583643',
            'first_name' => 'Applicant',
            'middle_name' => '',
            'last_name' => 'Job Seeker',
            'address' => 'Somewhere At Gerona',
            'desc' => 'Im the Current Accountant',
            'rating' => 0,
            'lib_role_id' => 3,
            'lib_gender_id' => 1,
            'lib_profession_id' => 1,
        ];
        User::upsert($admin, $uniqueKeys, $updateFields);
        User::upsert($employer, $uniqueKeys, $updateFields);
        User::upsert($applicant, $uniqueKeys, $updateFields);

    }
}
