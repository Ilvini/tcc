var handleDateRangeFilter = function() {
    $.noConflict();

    moment.locale('pt-br');

    $('#daterange-filter span').html(moment().subtract(7, 'days').format('D MMMM YYYY') + ' - ' + moment().format('D MMMM YYYY'));
    $('#daterange-prev-date').html(moment().subtract(15, 'days').format('D MMMM') + ' - ' + moment().subtract(8, 'days').format('D MMMM YYYY'));

    $('#daterange-filter').daterangepicker({
        format: 'DD/MM/YYYY',
        startDate: moment().subtract(7, 'days'),
        endDate: moment(),
        // minDate: '06/01/2019',
        // maxDate: '06/07/2019',
        dateLimit: { days: 60 },
        showDropdowns: true,
        showWeekNumbers: true,
        timePicker: false,
        timePickerIncrement: 1,
        timePicker12Hour: true,
        ranges: {
            'Hoje': [moment(), moment()],
            'Ontem': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Últimos 7 Dias': [moment().subtract(6, 'days'), moment()],
            'Últimos 30 Dias': [moment().subtract(29, 'days'), moment()],
            'Este Mês': [moment().startOf('month'), moment().endOf('month')],
            'Mês Anterior': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        opens: 'right',
        drops: 'down',
        buttonClasses: ['btn', 'btn-sm'],
        applyClass: 'btn-primary',
        cancelClass: 'btn-default',
        separator: ' até ',
        locale: {
            applyLabel: 'Enviar',
            cancelLabel: 'Cancelar',
            fromLabel: 'De',
            toLabel: 'Até',
            customRangeLabel: 'Personalizado',
            daysOfWeek: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
            monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            firstDay: 0
        }
    }, function(start, end, label) {
        $('#daterange-filter span').html(start.format('D MMMM YYYY') + ' - ' + end.format('D MMMM YYYY'));
        
        var gap = end.diff(start, 'days');
        $('#daterange-prev-date').html(moment(start).subtract('days', gap).format('D MMMM') + ' - ' + moment(start).subtract('days', 1).format('D MMMM YYYY'));
    });
};

var Dashboard = function () {
	"use strict";
	return {
		//main function
		init: function () {
			handleDateRangeFilter();
		}
	};
}();

$(document).ready(function() {
	Dashboard.init();
});
