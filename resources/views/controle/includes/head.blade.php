<meta charset="utf-8" />
<title>{{ $config->nome ?? 'Pitter' }} | @yield('title', 'Dashboard')</title>
@isset($config->config['layout']['logo'])
    <link rel="icon" type="image/x-icon"
        href="{{ route('imagem.render', 'company/p/' . $config->config['layout']['logo']) }}">
@endisset
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
<meta content="" name="description" />
<meta content="" name="author" />

<!-- ================== BEGIN BASE CSS STYLE ================== -->
<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
<link href="/assets/css/default/app.min.css" rel="stylesheet" />
<!-- ================== END BASE CSS STYLE ================== -->
{{-- Font Awesome --}}
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
    integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />
<script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="
    crossorigin="anonymous"></script>
{{-- select2 --}}
<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js" defer></script>
{{-- mask e inputmask --}}
{{-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> --}}
<script src="https://igorescobar.github.io/jQuery-Mask-Plugin/js/jquery.mask.min.js" defer></script>
{{-- WYSIHTML5 --}}
{{-- <link href="{{asset('./../assets/css/apple/app.min.css')}}" rel="stylesheet" /> --}}
<link href="{{ asset('./../assets/plugins/ionicons/css/ionicons.min.css') }}" rel="stylesheet" />
<link href="{{ asset('./../assets/plugins/bootstrap3-wysihtml5-bower/dist/bootstrap3-wysihtml5.min.css') }}"
    rel="stylesheet" />

<link href="{{ asset('./../assets/plugins/datatables.net-bs4/css/dataTables.bootstrap4.min.css') }}" rel="stylesheet" />
<link href="{{ asset('./../assets/plugins/datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css') }}"
    rel="stylesheet" />
<link href="{{ asset('./../assets/plugins/datatables.net-rowreorder-bs4/css/rowReorder.bootstrap4.min.css') }}"
    rel="stylesheet" />
@stack('css')
