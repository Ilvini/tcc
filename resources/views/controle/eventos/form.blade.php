@section('title', 'Formulário Eventos')
@extends('layouts.default')

@section('content')
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />

    <ol class="breadcrumb float-xl-right">
        <li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Dashboard</a></li>
        <li class="breadcrumb-item active"><a href="{{ route('controle.eventos.index') }}">Eventos</a></li>
        <li class="breadcrumb-item active"><a href="javascript:;">Formulário</a></li>
    </ol>

    <h1 class="page-header">Eventos</h1>

    <div class="row">
        <div style="width: 50vw">

            <div class="panel panel-inverse">
                <div class="panel-heading">
                    <h4 class="panel-title">Formulário de Eventos</h4>
                    <div class="panel-heading-btn">
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i class="fa fa-redo"></i></a>
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger" data-click="panel-remove"><i class="fa fa-times"></i></a>
                    </div>
                </div>

                <div class="panel-body">
                    @if (isset($evento->id))
                        {!! Form::model($evento, [
                            'route' => ['controle.eventos.update', $evento->id],
                            'method' => 'POST',
                            'files' => true,
                        ]) !!}
                    @else
                        {!! Form::model(null, [
                            'route' => 'controle.eventos.store',
                            'method' => 'POST',
                            'files' => true,
                        ]) !!}
                    @endif

                        <div class="form-group">
                            <label for="nome">Nome <span class="text-danger">*</span></label>
                            {!! Form::text('nome', null, ['class' => 'form-control', 'required', 'id' => 'nome-input']) !!}
                        </div>

                        <div class="form-group">
                            <label for="cidade">Cidade <span class="text-danger">*</span></label>
                            {!! Form::text('cidade', null, ['class' => 'form-control', 'required']) !!}
                        </div>

                        <div class="form-group">
                            <label for="uf">UF <span class="text-danger">*</span></label>
                            {!! Form::text('uf', null, ['class' => 'form-control', 'required']) !!}
                        </div>
                        
                        <div class="form-group">
                            <label for="endereco">Endereço <span class="text-danger">*</span></label>
                            {!! Form::text('endereco', null, ['class' => 'form-control', 'required']) !!}
                        </div>

                        <div class="form-group">
                            <label for="descricao">Descrição <span class="text-danger">*</span></label>
                            {!! Form::textarea('descricao', null, ['class' => 'form-control', 'required']) !!}
                        </div>

                        <div class="form-group">
                            <label for="gratuito">Gratuito? <span class="text-danger">*</span></label>
                            {!! Form::select('gratuito', ['1' => 'Sim', '0' => 'Não'], null, ['class' => 'form-control', 'required']) !!}
                        </div>

                        <div class="form-group">
                            <label for="valor">Valor <span class="text-danger">*</span></label>
                            {!! Form::text('valor', null, ['class' => 'form-control', 'required']) !!}
                        </div>

                        <div class="form-group">
                            <label for="imagem_url">Imagem URL <span class="text-danger">*</span></label>
                            {!! Form::text('imagem_url', null, ['class' => 'form-control', 'required']) !!}
                        </div>

                        <div class="form-group">
                            <label for="ingresso_url">Ingresso URL <span class="text-danger">*</span></label>
                            {!! Form::text('ingresso_url', null, ['class' => 'form-control', 'required']) !!}
                        </div>

                        <div class="form-group">
                            <label for="data_de_inicio">Dt Inicio <span class="text-danger">*</span></label>
                            {!! Form::date('data_de_inicio', null, ['class' => 'form-control', 'required']) !!}
                        </div>
                        
                        <div class="form-group">
                            <label for="data_de_fim">Dt Fim <span class="text-danger">*</span></label>
                            {!! Form::date('data_de_fim', null, ['class' => 'form-control', 'required']) !!}
                        </div>

                        <button type="submit" class="btn btn-sm btn-primary m-r-5">Salvar</button>

                        <a href="{{ route('controle.eventos.index') }}" class="btn btn-sm btn-default">
                            Cancelar
                        </a>

                    {!! Form::close() !!}
                </div>
            </div>
        </div>
    </div>
@endsection
