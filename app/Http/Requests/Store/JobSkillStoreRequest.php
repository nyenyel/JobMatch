<?php

namespace App\Http\Requests\Store;

use Illuminate\Foundation\Http\FormRequest;

class JobSkillStoreRequest extends FormRequest
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
            'desc'=> 'required|string' ,
            'lib_skill_id'=> 'sometimes|integer|exists:lib_skills,id',
            'job_id'=> 'required|integer|exists:job_posts,id' ,
            'lib_profession_id'=> 'required|integer|exists:lib_professions,id' 
        ];
    }
}
