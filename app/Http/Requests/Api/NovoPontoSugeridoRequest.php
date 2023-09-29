<?php

namespace App\Http\Requests\Api;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class NovoPontoSugeridoRequest extends FormRequest
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
            'subcategoria_id' => 'required|exists:subcategorias,id',
            'nome' => 'required|string|max:255',
            'endereco' => 'required|string',
            'lat' => 'required|numeric',
            'lon' => 'required|numeric',
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
            'subcategoria_id.required' => 'O campo subcategoria_id é obrigatório',
            'subcategoria_id.exists' => 'O campo subcategoria_id deve ser um id de subcategoria válido',
            'nome.required' => 'O campo nome é obrigatório',
            'nome.string' => 'O campo nome deve ser uma string',
            'nome.max' => 'O campo nome deve ter no máximo 255 caracteres',
            'endereco.required' => 'O campo endereco é obrigatório',
            'endereco.string' => 'O campo endereco deve ser uma string',
            'lat.required' => 'O campo lat é obrigatório',
            'lat.numeric' => 'O campo lat deve ser um número',
            'lon.required' => 'O campo lon é obrigatório',
            'lon.numeric' => 'O campo lon deve ser um número',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(apiResponse(true, $validator->errors()->first(), [], 422));
    }
}
