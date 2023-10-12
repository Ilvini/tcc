<?php

namespace App\Http\Requests\Api;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class NovaAvaliacaoRequest extends FormRequest
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
            'estrelas' => 'required|integer|between:1,5',
            'comentario' => 'required|string|max:255',
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
            'estrelas.required' => 'O campo estrelas é obrigatório',
            'estrelas.integer' => 'O campo estrelas deve ser um número inteiro',
            'estrelas.between' => 'O campo estrelas deve ser um número entre 1 e 5',
            'comentario.required' => 'O campo comentário é obrigatório',
            'comentario.string' => 'O campo comentário deve ser uma string',
            'comentario.max' => 'O campo comentário deve ter no máximo 255 caracteres',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(apiResponse(true, $validator->errors()->first(), [], 422));
    }
}
