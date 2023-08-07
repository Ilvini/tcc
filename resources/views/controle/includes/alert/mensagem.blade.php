<link href="{{ asset('./../assets/plugins/gritter/css/jquery.gritter.css') }}" rel="stylesheet" />
<script src="{{ asset('./../assets/plugins/gritter/js/jquery.gritter.js') }}"></script>
<script src="{{ asset('./../assets/plugins/sweetalert/dist/sweetalert.min.js') }}"></script>
<script src="{{ asset('./../assets/plugins/sweetalert/dist/sweetalert2.min.js') }}"></script>
<script>
    $(document).ready(function() {
        @if (session()->has('msg'))
            $.gritter.add({
                title: 'Sucesso!',
                text: "<span style='color:#FFF;font-size:13px'>{{ session('msg') }}</span>",
                image: '/pitterdashboard/img/success.png',
                sticky: false,
                time: 5000,
                close: 'fechar'
            });
        @endif

        @if (isset($errors) and count($errors))
            $.gritter.add({
                title: 'Erro!',
                text: "{!! implode('<br>', $errors->all()) !!}",
                image: '/pitterdashboard/img/error.png',
                sticky: true
            });
        @endif

        // Exibe o modal de exclusão de registro
        // Sweetalert 2
        $('.atencao').on('click', function(event) {
            event.preventDefault();
            var url = $(this).attr('data-url');
            Swal.fire({
                title: "Atenção!",
                text: "Deseja continuar com esta operação?",
                icon: "warning",
                confirmButtonText: 'Confirmar',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                reverseButtons: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = url
                }
            })
        });
    });
</script>
