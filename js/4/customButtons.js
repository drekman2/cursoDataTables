$(document).ready(function () {
//Custom Buttons
//Añadiendo clase a lso botones y colocarles en un contenedor

//Grupos botones

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
        language: spanish,
        lengthMenu: [
            [10, 25, 50, -1], [10, 25, 50, "Todos"]
        ],
        pageLength: 10,
        dom: "Blfrtip",
        buttons: [{extend: 'copy', text: '<i class="fa fa-files-o"></i>'}, {extend: 'csv', text: '<i class="fa fa-table"></i>'}, {extend: 'excel', text: '<i class="fa fa-file-excel-o" aria-hidden="true"></i>'}, {extend: 'pdf', text: '<i class="fa fa-file-pdf-o" aria-hidden="true"></i>'}, {extend: 'print', text: '<i class="fa fa-file-pdf-o" aria-hidden="true"></i>'},
            'selectAll', 'selectNone', 'selectRows', 'selectColumns', 'selectCells'
        ],
        select: true
    });
    //Cuando pulsemos los botones en el margen superior la columna se hace visible o invisible
    $("a.toogle-vis").on("click", function (e) {
        e.preventDefault();
        var column = tableEmployees.column($(this).data("column"));
        //var column = tableEmployees.columns($(this).attr("data-column"));
        column.visible(!column.visible());
    });
//Deshabilitar busqueda, informacion del nºregistros y el campo de búsqueda
    var tableEmployees = $("#users-table").DataTable({
        responsive: {
            details: {
                type: 'column',
                target: 'tr'
            }
        },
        order: [[2, 'asc']],
        columns: [
            {name: "id", data: "id"},
            {name: "Nombre", data: "name"},
            {name: "Pais", data: "Pais", visible: false},
            {name: "Fecha inicio", data: "fecha inicio"}
        ],
        columnDefs: [
            {targets: [0]},
            {targets: [1]},
            {targets: [2]},
            {targets: [3]}

        ],
        ajax: {
            url: "http://localhost/cursoDataTables/data/json/empleados.json"
        }
    });
});