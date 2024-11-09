<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
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
            'email'=> 'sometimes|unique:users,email,' . $this->user->id,
            'password' => 'sometimes|nullable|confirmed|min:6',
            'image' => 'sometimes|nullable|image|mimes:jpg,jpeg,png|max:2048', // Validate the single image
            'address'=> 'sometimes',
            'lib_gender_id'=> 'sometimes',
            'first_name'=> 'sometimes',
            'last_name'=> 'sometimes',
            'middle_name'=> 'sometimes',
            'phone_no'=> 'sometimes',
            'username'=> 'sometimes|unique:users,username,' . $this->user->id,
            'desc'=> 'sometimes',
            'sector'=> 'sometimes',
        ];
    }
}
