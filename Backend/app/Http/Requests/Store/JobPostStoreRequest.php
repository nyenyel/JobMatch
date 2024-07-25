<?php

namespace App\Http\Requests\Store;

use Illuminate\Foundation\Http\FormRequest;

class JobPostStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string',
            'desc' => 'required|string',
            'post_duration' => 'required|date',
            'employer_id' => 'required|integer|exists:users,id',
            'lib_profession_id' => 'required|integer|exists:lib_professions,id',
            'company_id' => 'required|integer|exists:companies,id',
            'lib_job_status_id' => 'required|integer|exists:lib_job_statuses,id',

        ];
    }
}
