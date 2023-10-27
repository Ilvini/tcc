<?php

namespace App\Http\Requests\Api;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class NovaInformacaoRequest extends FormRequest
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
            'tipo' => 'required|in:Descricao,Curiosidade,Dica,Historia,Lenda,Outro',
            'titulo' => 'required|string|max:255',
            'descricao' => 'required|string',
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
            'tipo.required' => 'O campo tipo é obrigatório',
            'titulo.required' => 'O campo título é obrigatório',
            'titulo.max' => 'O campo título deve ter no máximo 255 caracteres',
            'descricao.required' => 'O campo descrição é obrigatório',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(apiResponse(true, $validator->errors()->first(), [], 422));
    }
}
