<?php

namespace App\Http\Requests\Store;

use Illuminate\Foundation\Http\FormRequest;

class ApplicantSkllStoreReqeuest extends FormRequest
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
            'desc' => 'required|string',
            'lib_skill_id' => 'sometimes|exists:lib_skills,id',
            'lib_applicant_id' => 'required|exists:users,id',
            'lib_profession_id' => 'required'
        ];
    }
}
