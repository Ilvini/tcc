@extends('layouts.default')

@section('content')

    <h1 class="page-header">Grupo de Usuários</h1>

    <div class="row">
        <div style="width: 100vw">

            <div class="panel panel-inverse">
                <div class="panel-heading">
                    <h4 class="panel-title">{{isset($role) ? 'Atualização de Grupo de Usuários' : 'Cadastro de Grupo de Usuários'}}</h4>
                    <div class="panel-heading-btn">
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default"
                            data-click="panel-expand"><i class="fa fa-expand"></i></a>
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success"
                            data-click="panel-reload"><i class="fa fa-redo"></i></a>
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning"
                            data-click="panel-collapse"><i class="fa fa-minus"></i></a>
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger"
                            data-click="panel-remove"><i class="fa fa-times"></i></a>
                    </div>
                </div>

                <div class="panel-body">
                    {{ $msg ?? '' }}
                    @if (isset($role))
                        {!! Form::model($role, ['method' => 'post', 'route' => ['controle.roles.update', $role->id]]) !!}
                    @else
                        {!! Form::model(null, ['route' => 'controle.roles.store']) !!}
                    @endif
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <div class="form-group">
                                <strong>Nome:</strong>
                                {!! Form::text('name', null, ['placeholder' => 'Nome', 'class' => 'form-control']) !!}
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <div class="form-group">
                                <strong>Permissões:</strong>
                                <br />
                                @if (isset($role))
                                    @foreach ($permission as $value)
                                        <label>{{ Form::checkbox('permission[]', $value->id, in_array($value->id, $rolePermissions) ? true : false, ['class' => 'name']) }}
                                            {{ $value->name }}</label>
                                        <br />
                                    @endforeach
                                @else
                                    @foreach ($permission as $value)
                                        <label>{{ Form::checkbox('permission[]', $value->id, false, ['class' => 'name']) }}
                                            {{ $value->name }}</label>
                                        <br />
                                    @endforeach
                                @endif
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <button type="submit" class="btn btn-sm btn-primary m-r-5">Salvar</button>
                            <a href="{{ route('controle.roles.index') }}" class="btn btn-sm btn-default">Cancelar</a>
                        </div>
                    </div>
                    {!! Form::close() !!}
                </div> <!-- panel-body -->

            </div>

        </div>
    </div>
@endsection
