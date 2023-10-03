@section('title', 'Categorias')
@extends('layouts.default')

@section('content')
    <ol class="breadcrumb float-xl-right">
        <li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Dashboard</a></li>
        <li class="breadcrumb-item active"><a href="javascript:;">Categorias</a></li>
    </ol>

    <h1 class="page-header">Controle de Categorias</h1>

    <div class="row">
        <div class="col-6">
            <div class="panel panel-inverse">
                <div class="panel-heading">
                    <h4 class="panel-title">Lista de Categorias</h4>
                    <div class="panel-heading-btn">
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i class="fa fa-redo"></i></a>
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger" data-click="panel-remove"><i class="fa fa-times"></i></a>
                    </div>
                </div>

                <div class="panel-body">

                    {!! Form::model(null, ['route' => 'controle.categorias.adicionar', 'method' => 'POST']) !!}

                        <div class="form-group">
                            <label for="categorias[]">Categorias <span class="text-danger">*</span></label>
                            {!! Form::select('categorias[]', $categorias, null, ['class' => 'form-control select2', 'required', 'multiple']) !!}
                        </div>

                        <button type="submit" class="btn btn-sm btn-primary m-r-5">Adicionar</button>

                    {!! Form::close() !!}

                    <hr>

                    @foreach ($selecionados as $categoriaSelecionada)
                    
                        <h5>
                            {{ $categoriaSelecionada->first()->categoria->nome }}
                        </h5>

                        <ul>
                            @foreach ($categoriaSelecionada as $subcategoria)
                                <li>
                                    {{ $subcategoria->nome }}
                                    <a href="{{ route('controle.categorias.delete', $subcategoria->id) }}" class="ml-2" title="Remover">
                                        <i class="fas fa-times" style="color: red;"></i>
                                    </a>
                                </li>
                            @endforeach
                        </ul>


                    @endforeach
                    
                </div>
            </div>
        </div>
    </div>
@endsection

@section('scripts')

    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

    <script>
        $('.select2').select2();
    </script>
@endsection
