@section('title', 'Horários de Funcionamento - Pontos Turísticos')
@extends('layouts.default')

@section('content')
    <ol class="breadcrumb float-xl-right">
        <li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Dashboard</a></li>
        <li class="breadcrumb-item active"><a href="javascript:;">Horários de Funcionamento - Pontos Turísticos</a></li>
    </ol>

    <h1 class="page-header">Controle de Horários de Funcionamento - Pontos Turísticos</h1>

    <div class="row">
        <div class="col-12">
            <div class="panel panel-inverse">
                <div class="panel-heading">
                    <h4 class="panel-title">Lista de Horários de Funcionamento - Pontos Turísticos</h4>
                    <div class="panel-heading-btn">
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i class="fa fa-redo"></i></a>
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger" data-click="panel-remove"><i class="fa fa-times"></i></a>
                    </div>
                </div>

                <div class="panel-body">
                    {!! Form::model(isset($pontoTuristico) ? $pontoTuristico : null, ['route' => ['controle.pontos-turisticos.updateHorarios', $pontoTuristico->id]]) !!}
                        <table class="table table-striped table-bordered table-td-valign-middle sortable">
                            <thead>
                                <tr>
                                    <th>Dia da Semana</th>
                                    <th>Abertura</th>
                                    <th>Fechamento</th>
                                    <th>Dia Todo</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach (range(1, 7) as $diaSemana)
                                    <tr>
                                        <td>
                                            {{ diaSemana($diaSemana) }}
                                        </td>
                                        <td>
                                            {!! Form::time('horarios[' . ($diaSemana - 1) . '][abertura]', null, []) !!}
                                        </td>
                                        <td>
                                            {!! Form::time('horarios[' . ($diaSemana - 1) . '][fechamento]', null, []) !!}
                                        </td>
                                        <td>
                                            {!! Form::checkbox('horarios[' . ($diaSemana - 1) . '][dia_todo]', 1, null, []) !!}
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>

                        <button type="submit" class="btn btn-sm btn-primary m-r-5">Salvar</button>

                        <a href="{{ route('controle.pontos-turisticos.index') }}" class="btn btn-sm btn-default">
                            Cancelar
                        </a>

                    {!! Form::close() !!}
                </div>
            </div>
        </div>
    </div>
@endsection
