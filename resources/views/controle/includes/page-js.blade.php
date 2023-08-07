<!-- ================== BEGIN BASE JS ================== -->
<script src="/assets/js/app.min.js"></script>
<script src="/assets/js/theme/default.min.js"></script>
<!-- ================== END BASE JS ================== -->
<script>
    function ordenar(obj) {
        $(".sortable tbody").sortable({
            placeholder: 'placeholder',
            forcePlaceholderSize: true,
            revert: 300,
            delay: 100,
            opacity: 0.8,
            containment: 'document',
            helper: function(e, tr) {
                var $originals = tr.children();
                var $helper = tr.clone();
                $helper.children().each(function(index) {
                    $(this).width($originals.eq(index).width())
                });
                return $helper;
            },
            update: function() {
                $.post('{{ route('controle.ordenacao') }}', {
                    obj: obj,
                    'id[]': $('.sortable tbody').sortable("toArray"),
                    _token: '{{ csrf_token() }}'
                });
            }
        }).disableSelection();
    }

    $('.selectLoad').change(function() {
        var id = $(this).find('option:selected').val();
        var tabela = $(this).data('tabela');
        var chave = $(this).data('chave');
        var campoRetorno = $(this).data('campo-retorno');

        if (id != "" && id != undefined) {
            $.ajax({
                url: "{{ route('selectload') }}",
                type: 'get',
                dataType: 'json',
                data: {
                    id: id,
                    tabela: tabela,
                    chave: chave
                },
                beforeSend: function() {
                    $("#" + campoRetorno).val("").change();
                    $("#" + campoRetorno).empty();
                }
            })
            .done(function(resp) {
                if (Object.keys(resp.json).length > 0) {
                    $("#" + campoRetorno).append('<option value="">Selecione</option>');
                    $.each(resp.json, function(index, valor) {
                        $("#" + campoRetorno).append('<option value="' + index + '">' + valor +
                            '</option>');

                    });
                } else {
                    $("#" + campoRetorno).append('<option value="">Nenhum registro encontrado</option>');
                }
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
        }
    });
</script>
@stack('scripts')
