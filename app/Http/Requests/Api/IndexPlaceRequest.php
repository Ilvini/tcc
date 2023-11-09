<?php

namespace App\Http\Requests\Api;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class IndexPlaceRequest extends FormRequest
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
            'lat' => 'required|numeric',
            'lon' => 'required|numeric',
            'raio' => 'required|numeric',
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
            'lat.required' => 'O campo latitude é obrigatório',
            'lat.numeric' => 'O campo latitude deve ser numérico',
            'lon.required' => 'O campo longitude é obrigatório',
            'lon.numeric' => 'O campo longitude deve ser numérico',
            'raio.required' => 'O campo raio é obrigatório',
            'raio.numeric' => 'O campo raio deve ser numérico',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(apiResponse(true, $validator->errors()->first(), [], 422));
    }
}
