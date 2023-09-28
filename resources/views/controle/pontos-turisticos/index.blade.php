@section('title', 'Pontos Turísticos')
@extends('layouts.default')

@section('content')
    <ol class="breadcrumb float-xl-right">
        <li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Dashboard</a></li>
        <li class="breadcrumb-item active"><a href="javascript:;">Pontos Turísticos</a></li>
    </ol>

    <h1 class="page-header">Controle de Pontos Turísticos</h1>

    <div class="row">
        <div class="col-12">
            <div class="panel panel-inverse">
                <div class="panel-heading">
                    <h4 class="panel-title">Lista de Pontos Turísticos</h4>
                    <div class="panel-heading-btn">
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i class="fa fa-redo"></i></a>
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger" data-click="panel-remove"><i class="fa fa-times"></i></a>
                    </div>
                </div>

                <div class="panel-body">
                    <div class="btn-group mr-5">
                        <div class="d-flex align-items-center justify-content-center mr-10 mb-3">
                            <a href="{{ route('controle.pontos-turisticos.create') }}" class="btn btn-success btn-sm">
                                <i class="fa fa-save"></i>
                                Cadastrar
                            </a>
                        </div>
                    </div>
                    <table class="table table-striped table-bordered table-td-valign-middle sortable">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Endereço</th>
                                <th>Categoria/Subcategoria</th>
                                <th>Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($pontoTuristicos as $pontoTuristico)
                                <tr>
                                    <td>{{ $pontoTuristico->nome }}</td>
                                    <td>{{ $pontoTuristico->endereco }}</td>
                                    <td>{{ $pontoTuristico->subcategoria->categoria->nome }} > {{ $pontoTuristico->subcategoria->nome }}</td>
                                    <td>
                                        <a href="{{ route('controle.pontos-turisticos.edit', $pontoTuristico->id) }}"
                                            class="btn btn-primary btn-sm">
                                            <i class="fa fa-edit"></i>
                                            Editar
                                        </a>
                                        <a data-url="{{ route('controle.pontos-turisticos.delete', $pontoTuristico->id) }}" href="javascript:;"
                                            class="btn btn-danger btn-sm atencao">
                                            <i class="fa fa-trash-alt"></i>
                                            Excluir
                                        </a>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
@endsection
