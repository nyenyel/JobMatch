<?php

namespace App\Http\Requests\Store;

use App\Models\Library\LibProfession;
use App\Models\Library\LibSkillType;
use Illuminate\Foundation\Http\FormRequest;

class LibrarySkillStoreRequest extends FormRequest
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
            'lib_profession_id' => 'sometimes|integer|exists:lib_professions,id',
            'lib_skill_type_id' => 'required|integer|exists:lib_skill_types,id',
        ];
    }
}
