$(document).ready(function () {
//Añadir botones de acción a Datatables utilizando atributos data

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
        ]
    });
//Cuando pulsemos los botones en el margen superior la columna se hace visible o invisible
    $("a.toogle-vis").on("click", function (e) {
        e.preventDefault();
        var column = table.column($(this).data("column"));
        column.visible(!column.visible());
    });

    var table = $("#country-table").DataTable({
        columns: [
            {
                "className": 'details-control',
                "orderable": false,
                "data": null,
                "defaultContent": ''
            },
            {name: "Code", data: "Code"},
            {name: "Nombre", data: "Name"},
            {name: "Region", data: "Region"},
            {name: "Operaciones", render: function (data, type, row) {
                    return "<a href='#' class='btn btn-primary btn-xs edit' data-id='" + row.id + "'><span class='glyphicon glyphicon-pencil'></span> </a>" +
                            " " + "<a href='#' class='btn btn-danger btn-xs delete' data-id='" + row.id + "'><span class='glyphicon glyphicon-trash'></span> </a>";
                }},
            {name: "GovernmentForm", data: "GovernmentForm", visible: false}
        ],
        ajax: {
            url: "../../consultas/consultas.php",
            type: "POST",
            data: {
                "operacion": "consultaPesadaAllDates"
            }
        }
    });
    function generarFilasByDatos(dataObject, arrayCampos) {
        var tableHija = "<table class='' cellpadding='5' cellspacing='0' border='0' style='padding-left:50px;'>";
        for (i = 0; i < arrayCampos.length; i++) {
            var dataAtri = arrayCampos[i];
            tableHija += "<tr><td>" + arrayCampos[i] + "</td><td>" + dataObject[dataAtri] + "</td></tr>";
        }
        tableHija += "</table>";
        return  tableHija;
    }

    $('#country-table tbody').on('click', 'td.details-control', function (e) {
        e.preventDefault();
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        } else {
            // Open this row
            row.child(generarFilasByDatos(row.data(), ["Code", "Name", "GovernmentForm"])).show();
            tr.addClass('shown');
        }
    });




});