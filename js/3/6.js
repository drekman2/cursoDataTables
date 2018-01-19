$(document).ready(function () {
//Realizar búsquedas al pulsar en cualquier columna utilizando el eventos

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
    //Deshabilitar busqueda, informacion del nºregistros y el campo de búsqueda
    $("#employees-table").DataTable({
        order: [[2, 'asc']],
        columns: [
            {name: "id", data: "id"},
            {name: "name", data: "name"},
            {name: "country", data: "country", visible: false},
            {name: "age", data: "age"}
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
                            "<tr class='highlight'><td colspan='" + 4 + "'>" + group + "</td></tr>");
                }
                last = group;
            });
        },
        initComplete: function () {
            var api = this.api();
            api.$('td').click(function () {
                api.search(this.innerHTML).draw();
            });
        },
        ajax: {
            url: "http://localhost/cursoDataTables/data/json/employees.json"
        }
    });
});