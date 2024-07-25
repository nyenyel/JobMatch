<?php

namespace App\Http\Requests\Store;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class ReviewStoreRequest extends FormRequest
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
            'rate'=> 'required|numeric|between:1,5',
            'review'=> 'required|string',
            'reviewed_by'=> 'required|integer|exists:users,id',
            'reviewed_for'=> 'required|integer|exists:users,id',
        ];
    }
}
