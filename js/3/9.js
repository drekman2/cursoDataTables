$(document).ready(function () {
//Mostrar y ocultar columnas de forma dinámica

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
        }};
    //Extender la funcion del dataTable por defecto con los datos que le pasemo
    $.extend(true, $.fn.dataTable.defaults, {
        info: false,
        paging: true,
        ordering: true,
        searching: true,
        language: spanish,
        lengthMenu: [
            [10, 25, 50, -1], [10, 25, 50, "Todos"]
        ]
    });

//Cuando pulsemos los botones en el margen superior la columna se hace visible o invisible
    $("a.toogle-vis").on("click", function (e) {
        e.preventDefault();
        var column = tableEmployees.column($(this).data("column"));
        //var column = tableEmployees.columns($(this).attr("data-column"));
        column.visible(!column.visible());
    });
    //Deshabilitar busqueda, informacion del nºregistros y el campo de búsqueda
    var tableEmployees = $("#empleados-table").DataTable({
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
        drawCallback: function (settings) {
            var api = this.api();
            var rows = api.rows({page: 'current'}).nodes();
            var last = null;
            api.column(2, {page: 'current'}).data().each(function (group, i) {
                if (last !== group) {
                    $(rows).eq(i).before(
                            "<tr class='highlight'><td colspan='" + 3 + "'>" + group + "</td></tr>");
                }
                last = group;
            });
        },
        ajax: {
            url: "http://localhost/cursoDataTables/data/json/empleados.json"
        }
    });



});