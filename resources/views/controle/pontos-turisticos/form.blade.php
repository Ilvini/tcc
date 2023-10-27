@section('title', 'Formulário Pontos Turísticos')
@extends('layouts.default')

@section('content')
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />

    <ol class="breadcrumb float-xl-right">
        <li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Dashboard</a></li>
        <li class="breadcrumb-item active"><a href="{{ route('controle.pontos-turisticos.index') }}">Pontos Turísticos</a></li>
        <li class="breadcrumb-item active"><a href="javascript:;">Formulário</a></li>
    </ol>

    <h1 class="page-header">Pontos Turísticos</h1>

    <div class="row">
        <div style="width: 50vw">

            <div class="panel panel-inverse">
                <div class="panel-heading">
                    <h4 class="panel-title">Formulário de Pontos Turísticos</h4>
                    <div class="panel-heading-btn">
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i class="fa fa-redo"></i></a>
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger" data-click="panel-remove"><i class="fa fa-times"></i></a>
                    </div>
                </div>

                <div class="panel-body">
                    @if (isset($pontoTuristico->id))
                        {!! Form::model($pontoTuristico, [
                            'route' => ['controle.pontos-turisticos.update', $pontoTuristico->id],
                            'method' => 'POST',
                            'files' => true,
                        ]) !!}
                    @else
                        {!! Form::model(null, [
                            'route' => 'controle.pontos-turisticos.store',
                            'method' => 'POST',
                            'files' => true,
                        ]) !!}
                    @endif

                        Localização

                        <div style="height: 200px;" id="mapa"></div>

                        <div class="row mt-2">
                            <div class="form-group col-6">
                                <label for="lat">Latitude <span class="text-danger">*</span></label>
                                {!! Form::text('lat', null, ['class' => 'form-control', 'required', 'readonly']) !!}
                            </div>
                            <div class="form-group col-6">
                                <label for="lon">Longitude <span class="text-danger">*</span></label>
                                {!! Form::text('lon', null, ['class' => 'form-control', 'required', 'readonly']) !!}
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="subcategoria_id">Subcategoria <span class="text-danger">*</span></label>
                            {!! Form::select('subcategoria_id', ['' => 'Selecione'] + $categorias, null, [
                                'class' => 'form-control select2',
                                'required',
                            ]) !!}
                        </div>

                        <div class="form-group">
                            <label for="nome">Nome <span class="text-danger">*</span></label>
                            {!! Form::text('nome', null, ['class' => 'form-control', 'required', 'id' => 'nome-input']) !!}
                        </div>

                        <div class="form-group">
                            <label for="endereco">Endereço <span class="text-danger">*</span></label>
                            {!! Form::text('endereco', null, ['class' => 'form-control', 'required']) !!}
                        </div>

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

@section('scripts')
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3VyjjZCkX7uaO2SdhTcALligFKtZtZ2U&callback=initialize"></script>
    <script>

        function initialize() {
            map = new google.maps.Map(document.getElementById('mapa'), {
                disableDefaultUI: true,
                center: new google.maps.LatLng(-1.4557292, -48.4901785),
                zoom: 16,
            });

            @if (isset($pontoTuristico->lat))
                @if ($pontoTuristico->lat == null || $pontoTuristico->lon == null)
                    marker = new google.maps.Marker({
                    map:map,
                    draggable:true,
                    animation: google.maps.Animation.DROP,
                    position: new google.maps.LatLng(-1.4557292, -48.4901785),
                    });
                @else
                    marker = new google.maps.Marker({
                    map:map,
                    draggable:true,
                    animation: google.maps.Animation.DROP,
                    position: new google.maps.LatLng({{ $pontoTuristico->lat }}, {{ $pontoTuristico->lon }}),
                    });
                    map.setCenter(new google.maps.LatLng({{ $pontoTuristico->lat }}, {{ $pontoTuristico->lon }}))
                @endif
            @else
                marker = new google.maps.Marker({
                    map:map,
                    draggable:true,
                    animation: google.maps.Animation.DROP,
                    position: new google.maps.LatLng(-1.4557292, -48.4901785),
                });
            @endif

            google.maps.event.addListener(marker, 'dragend', function() {
                $('input[name="lat"]').val(marker.getPosition().lat())
                $('input[name="lon"]').val(marker.getPosition().lng())
            });
        }

        $('.select2').select2();

        $(document).ready(function() {

            $('#nome-input').on('blur', function() {
                var nome = $(this).val();

                if (nome) {
                    $.ajax({
                        url: "{{ route('api.wikipedia.buscar') }}" + '?title=' + nome,
                        type: 'GET',
                        success: function(response) {
                            console.log(response);
                            if (response == 'true') {
                                console.log(response);
                            }
                        }
                    });
                }
            });

        });

    </script>
@endsection
