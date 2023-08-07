@php
$sidebarClass = !empty($sidebarTransparent) ? 'sidebar-transparent' : '';
@endphp

    <style>
        .page-sidebar-minified .sidebar-minify-btn i:before {
            content: '\f101' !important;
        }

        #sidebar {
            background: #2d353c;
        }
        .sidebar .nav>li.active>a {
            background: #242b30 !important;
        }
        .nav>li>a i {
            background: 0 0!important;
            /* color: rgba(255,255,255,.6) !important; */
        }
        .nav>li>a:hover i {
            color: #fff !important;
        }
        /* .nav>li.active>a i {
            color: #0A7A75 !important;
        } */
        .nav>li.expand i {
            color: #fff !important;
        }

        /* a:focus, a:hover {
            color: white !important;
        } */

        .nav-profile {
            background-image: url("{{ route('imagem.render', 'background_image/'. $config->config['layout']['background_image']) }}") !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            background-repeat: no-repeat !important;
            background-size: cover !important;
        }

        .nav-profile a {
            background: rgba(32,37,42,.75) !important;
        }
    </style>

<div id="sidebar" class="sidebar">
    <div data-scrollbar="true" data-height="100%">
        <ul class="nav">
            <li class="nav-profile with-shadow">
                <a href="{{ route('dashboard') }}">
                    <div class="image">
                        @if (isset(Auth::user()->imagem))
                        <img src="{{ route('imagem.render', "user/p/". Auth::user()->imagem) }}" alt="{{ Auth::user()->name }}" />                           
                        @else
                        <img src="{{ asset('assets/img/user/user-12.jpg') }}" alt="" />
                        @endif
                    </div>
                    <div class="info">
                        {{ Auth::user()->name }}
                    </div>
                </a>
            </li>
        </ul>

        <ul class="nav">
            <li class="nav-header">Navegação</li>

			<li class="has-sub {{ activeMenu('dashboard') }}">
				<a href="{{ route('dashboard') }}">
					<i class="fa fa-tachometer-alt"></i>
					<span>Dashboard</span>
				</a>
			</li>

            @can('Visualizar Categorias')
                <li class="has-sub {{ activeMenu('controle.categorias') }}">
                    <a href="{{ route('controle.categorias.index') }}">
                        <i class="fas fa-cube"></i>
                        <span>Categorias</span>
                    </a>
                </li>
            @endcan

            @can('Visualizar Tags')
                <li class="has-sub {{ activeMenu('controle.tags') }}">
                    <a href="{{ route('controle.tags.index') }}">
                        <i class="fas fa-tag"></i>
                        <span>Tags</span>
                    </a>
                </li>
            @endcan
            
            @can('Visualizar Marcas')
                <li class="has-sub {{ activeMenu('controle.marcas') }}">
                    <a href="{{ route('controle.marcas.index') }}">
                        <i class="far fa-registered"></i>
                        <span>Marcas</span>
                    </a>
                </li>
            @endcan
            
            @can('Visualizar Produtos')
                <li class="has-sub {{ activeMenu('controle.produtos') }}">
                    <a href="{{ route('controle.produtos.index') }}">
                        <i class="fas fa-shopping-cart"></i>
                        <span>Produtos</span>
                    </a>
                </li>
            @endcan
            
            @can('Visualizar Combos')
                <li class="has-sub {{ activeMenu('controle.combos') }}">
                    <a href="{{ route('controle.combos.index') }}">
                        <i class="fas fa-shapes"></i>
                        <span>Combos</span>
                    </a>
                </li>
            @endcan

            @can('Visualizar Pedidos')
                <li class="has-sub {{ activeMenu('controle.pedidos') }}">
                    <a href="{{ route('controle.pedidos.index') }}">
                        <i class="fas fa-receipt"></i>
                        <span>Pedidos</span>
                    </a>
                </li>
            @endcan

            @can('Visualizar Cupons')
                <li class="has-sub {{ activeMenu('controle.cupoms') }}">
                    <a href="{{ route('controle.cupoms.index') }}">
                        <i class="fas fa-certificate"></i>
                        <span>Cupons de Desconto</span>
                    </a>
                </li>
            @endcan

            @can('Visualizar Depoimentos')
                <li class="has-sub {{ activeMenu('controle.depoimentos') }}">
                    <a href="{{ route('controle.depoimentos.index') }}">
                        <i class="fas fa-hand-holding-heart"></i>
                        <span>Depoimentos</span>
                    </a>
                </li>
            @endcan
            
            @can('Visualizar Publicações do Instagram')
                <li class="has-sub {{ activeMenu('controle.instagram') }}">
                    <a href="{{ route('controle.instagram.index') }}">
                        <i class="fab fa-instagram"></i>
                        <span>Publicações do Instagram</span>
                    </a>
                </li>
            @endcan

            @can('Visualizar usuário')
                <li
                    class="has-sub {{ activeMenu(['controle.usuario', 'controle.roles']) }}">
                    <a href="javascript:;">
                        <b class="caret"></b>
                        <i class="fa fa-lock"></i>
                        <span>Controle de Acesso</span>
                    </a>
                    <ul class="sub-menu">
                        <li class="has-sub {{ activeMenu('controle.usuario') }}">
                            <a href="{{ route('controle.usuario.index') }}">
                                <i class="fas fa-user"></i>
                                <span>Usuários</span>
                            </a>
                        </li>
                        <li class="has-sub {{ activeMenu('controle.roles') }}">
                            <a href="{{ route('controle.roles.index') }}">
                                <i class="fas fa-user-friends"></i>
                                <span>Grupo de usuários</span>
                            </a>
                        </li>
                    </ul>
                </li>
            @endcan

            @can('Alterar config')
                <li class="has-sub {{ activeMenu('controle.config') }}">
                    <a href="{{ route('controle.config.edit') }}">
                        <i class="fas fa-cog"></i>
                        <span>Configurações</span>
                    </a>
                </li>
            @endcan

            @can('Alterar Empresa')
                <li class="has-sub {{ activeMenu('controle.empresa') }}">
                    <a href="{{ route('controle.empresa.edit') }}">
                        <i class="fas fa-cog"></i>
                        <span>Dados da Empresa</span>
                    </a>
                </li>
            @endcan

            <li><a href="javascript:;" class="sidebar-minify-btn" data-click="sidebar-minify"><i
                        class="fa fa-angle-double-left"></i></a></li>
        </ul>
    </div>
</div>
