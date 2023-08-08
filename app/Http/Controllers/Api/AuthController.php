<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ClienteLoginRequest;
use App\Http\Requests\Api\ClienteNovaSenhaRequest;
use App\Http\Requests\Api\NovaSenhaRequest;
use App\Http\Requests\Api\RecuperaSenhaRequest;
use App\Models\Cliente;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function login(ClienteLoginRequest $request)
    {
        try {
            $cliente = Cliente::where('email', $request->email)->first();

            if (!$cliente || !Hash::check($request->password, $cliente->password)) {
                return apiResponse(true, 'Credenciais inválidas', null, 401);
            }

            return apiResponse(false, 'Sem erros', [
                'token' => $cliente->createToken('api')->plainTextToken,
                'nome' => $cliente->nome,
            ]);
        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }

    public function alterarSenha(ClienteNovaSenhaRequest $request)
    {
        try {
            $cliente = auth()->user();

            $cliente->password = $request->password;
            $cliente->save();

            return apiResponse(false, 'Senha atualizada com sucesso');
        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }

    public function logout()
    {
        try {
            auth()->user()->tokens()->delete();

            return apiResponse(false, 'Logout realizado com sucesso');
        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }

    public function checarToken()
    {
        try {
            return apiResponse(false, 'Token válido');
        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }

    public function recuperarSenha(RecuperaSenhaRequest $request)
    {
        $input = $request->only(['email']);

        try {

            $cliente = Cliente::where('email', $input['email'])->first();

            if ($cliente) {

                $data = ['link'];
                $hash = md5($cliente->id . $cliente->updated_at . ENV('APP_KEY'));
                $link = route('api.recuperar-senha', ['id' => $cliente->id, 'hash' => $hash]);

                Mail::send('emails.recuperar-email', compact($data), function ($message) use ($cliente) {
                    $message->from('contato@myprotein.com.br', 'My Protein');
                    $message->to($cliente->email, $cliente->nome);
                    $message->bcc('ilvini.pitter@hotmail.com', 'Pitter');
                    $message->subject('Recuperação de senha!');
                });

                return apiResponse(false, 'Email enviado com sucesso');
            }

            return apiResponse(true, 'Email não encontrado', [], 404);
        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }

    public function novaSenhaForm($id, $hash)
    {
        try {
            $cliente = Cliente::find($id);

            if (!$cliente) {
                return abort(404);
            }
            if ($hash != md5($cliente->id . $cliente->updated_at . ENV('APP_KEY'))) {
                return abort(401);
            }

            $url = env('FRONT_URL') . '/recuperar-senha/' . $cliente->id . '/' . $hash;

            return redirect($url);
        } catch (\Throwable $th) {
            Log::error($th);
            return abort(500);
        }
    }

    public function novaSenha(NovaSenhaRequest $request, $id, $hash)
    {
        $input = $request->only(['password']);

        try {

            $usuario = Cliente::find($id);

            if (!$usuario) {
                return apiResponse(true, 'Link expirado, tente novamente', [], 404);
            }

            if ($hash != md5($usuario->id . $usuario->updated_at . ENV('APP_KEY'))) {
                return apiResponse(true, 'Link expirado, tente novamente', [], 401);
            }

            if ($usuario->update($input)) {
                return apiResponse(false, 'Senha alterada com sucesso', [], 401);
            }
        } catch (\Throwable $th) {
            Log::error($th);
            return apiResponse(true, 'Erro interno', null, 500);
        }
    }
}
