$(document).ready(function () {
//Select row, column, cells, all

    var spanish = {
        "decimal": "",
        "emptyTable": "No hay información",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
        "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
        "infoFiltered": "(Filtrado de _MAX_ total entradas)",
        "lengthMenu": "Mostrar _MENU_ Entradas",
        "loadingRecords": "Cargando...",
        "processing": "Procesando...",
        "search": "Buscar:",
        "zeroRecords": "Sin resultados encontrados",
        "paginate": {
            "first": "Primero",
            "last": "Ultimo",
            "next": "Siguiente",
            "previous": "Anterior"
        },
        "buttons": {
            "selectAll": "Seleccionar todos",
            "selectNone": "No Seleccionar ninguno",
            "selectRows": "Seleccionar Fila",
            "selectColumns": "Seleccionar Columna",
            "selectCells": "Seleccionar Celda",
            "copy": "Copiar",
            "print": "Imprimir"
        }
    };
    //Extender la funcion del dataTable por defecto con los datos que le pasemo
    $.extend(true, $.fn.dataTable.defaults, {
        info: true,
        paging: true,
        ordering: true,
        searching: true,
        responsive: true,
        language: spanish,
        lengthMenu: [
            [10, 25, 50, -1], [10, 25, 50, "Todos"]
        ],
        dom: "Blfrtip",
        buttons: ['copy', 'csv', 'excel', 'pdf', 'print',
            'selectAll', 'selectNone', 'selectRows', 'selectColumns', 'selectCells'

        ],
        select: true
    });
//Cuando pulsemos los botones en el margen superior la columna se hace visible o invisible
    $("a.toogle-vis").on("click", function (e) {
        e.preventDefault();
        var column = table.column($(this).data("column"));
        column.visible(!column.visible());
    });
//Deshabilitar busqueda, informacion del nºregistros y el campo de búsqueda
    var table = $("#companies-table").DataTable({
        responsive: {
            details: {
                type: 'column',
                target: 'tr'
            }
        },
        info: true,
        paging: true,
        ordering: true,
        searching: true,
        order: [[1, 'asc']],
        columns: [
            {
                "className": 'details-control',
                "orderable": false,
                "data": null,
                "defaultContent": ''
            },
            {name: "id", data: "id"},
            {name: "Nombre", data: "name"},
            {name: "Comienzo", data: "starts"},
            {name: "Descripcion", data: "description", visible: false}
        ],
        ajax: {
            url: "http://localhost/cursoDataTables/data/json/companies.json"
        }
    });
    function format(d) {
        // `d` is the original data object for the row
        return "<table class='' cellpadding='5' cellspacing='0' border='0' style='padding-left:50px;'>" +
                "<tr role='row' class='odd'>" +
                "<td> Id </td>" +
                "<td>" + d.id + "</td>" +
                "</tr>" +
                "<tr role='row' class='odd'>" +
                "<td> Nombre </td>" +
                "<td>" + d.name + "</td>" +
                "</tr>" +
                "<tr role='row' class='odd'>" +
                "<td> Descripcion </td>" +
                "<td>" + d.description + "</td>" +
                "</tr>" +
                "</table>";
    }
    $('#companies-table tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        } else {
            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
    });
});