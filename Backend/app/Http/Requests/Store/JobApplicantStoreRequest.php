<?php

namespace App\Http\Requests\Store;

use Illuminate\Foundation\Http\FormRequest;

class JobApplicantStoreRequest extends FormRequest
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
            'job_id' => 'required|integer|exists:job_posts,id',
            'applicant_id' => 'required|integer|exists:users,id',
            'lib_status_id' => 'required|integer|exists:lib_application_statuses,id'
        ];
    }
}
