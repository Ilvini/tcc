@section('title', 'Avaliações')
@extends('layouts.default')

@section('content')
    <ol class="breadcrumb float-xl-right">
        <li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Dashboard</a></li>
        <li class="breadcrumb-item active"><a href="javascript:;">Avaliações</a></li>
    </ol>

    <h1 class="page-header">Controle de Avaliações</h1>

    <div class="row">
        <div class="col-12">
            <div class="panel panel-inverse">
                <div class="panel-heading">
                    <h4 class="panel-title">Lista de Avaliações</h4>
                    <div class="panel-heading-btn">
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i class="fa fa-redo"></i></a>
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger" data-click="panel-remove"><i class="fa fa-times"></i></a>
                    </div>
                </div>

                <div class="panel-body">
                    <table class="table table-striped table-bordered table-td-valign-middle sortable">
                        <thead>
                            <tr>
                                <th>Usuário</th>
                                <th>Estrelas</th>
                                <th>Comentário</th>
                                <th>Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($avaliacoes as $avaliacao)
                                <tr>
                                    <td>{{ $avaliacao->cliente->nome ?? '- - -' }}</td>
                                    <td>{{ $avaliacao->estrelas }}</td>
                                    <td>{{ $avaliacao->comentario }}</td>
                                    <td>
                                        <a href="{{ route('controle.avaliacoes.aprovar', $avaliacao->id) }}"
                                            class="btn btn-success btn-sm">
                                            <i class="fa fa-check"></i>
                                            Aprovar
                                        </a>
                                        <a href="{{ route('controle.avaliacoes.reprovar', $avaliacao->id) }}"
                                            class="btn btn-danger btn-sm">
                                            <i class="fa fa-times"></i>
                                            Reprovar
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
