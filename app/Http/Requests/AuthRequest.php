<?php

namespace App\Http\Requests;

use App\Models\Library\LibGender;
use App\Models\Library\LibProfession;
use App\Models\Library\LibRole;
use Illuminate\Foundation\Http\FormRequest;

class AuthRequest extends FormRequest
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
        $maxRole = LibRole::count();
        $maxProfession = LibProfession::count();
        $maxGender= LibGender::count();

        return [
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|max:16',
            'username' => 'required|string|min:3|max:16',
            'phone_no' => 'required|numeric|digits:11',
            'first_name' => 'required|regex:/^[A-Za-z\s]+$/',
            'last_name' => 'required|string|regex:/^[A-Za-z\s]+$/',
            'middle_name' => 'sometimes|string|regex:/^[A-Za-z\s]+$/',
            'address' => 'required|string',
            'desc' => 'required|string',
            'rating' => 'required|numeric',
            'lib_role_id' => 'required|integer|between:1,' . $maxRole,
            'lib_gender_id' => 'required|integer|between:1,'.$maxGender,
            'lib_profession_id' => 'required|integer|between:1,'.$maxProfession,
        ];
    }
}
