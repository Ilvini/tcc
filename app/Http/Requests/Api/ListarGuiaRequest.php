<?php

namespace App\Http\Requests\Api;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ListarGuiaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'estado' => 'required|max:2',
            'cidade' => 'required',
        ];
    }

    /**
     * Get the validation messages that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function messages()
    {
        return [
            'estado.required' => 'O campo estado é obrigatório',
            'estado.max' => 'O campo estado deve ter no máximo 2 caracteres',
            'cidade.required' => 'O campo cidade é obrigatório',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(apiResponse(true, $validator->errors()->first(), [], 422));
    }
}
