<?php

namespace App\Http\Requests\Api;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ClienteUpdateRequest extends FormRequest
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
            'nome' => 'required|string',
            'email' => 'required|string|email|unique:clientes,email,' . auth()->user()->id,
            'celular' => 'required|string',
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
            'nome.required' => 'O campo nome é obrigatório',
            'nome.string' => 'O campo nome deve ser uma string',
            'email.required' => 'O campo email é obrigatório',
            'email.string' => 'O campo email deve ser uma string',
            'email.email' => 'O campo email deve ser um email válido',
            'email.unique' => 'O email informado já está em uso',
            'celular.required' => 'O campo celular é obrigatório',
            'celular.string' => 'O campo celular deve ser uma string',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(apiResponse(true, $validator->errors()->first(), [
            'titulo' => 'Campo inválido',
            'descricao' => $validator->errors()->first(),
        ], 422));
    }
}
