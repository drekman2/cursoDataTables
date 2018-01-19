$(document).ready(function () {
    // Sobrescribir el desplegable para mostrar un número de resultados lengthMenu
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
//            [5, 10, 15, 25], [5, 10, 15, 25]
        ]
    });

    //Deshabilitar busqueda, informacion del nºregistros y el campo de búsqueda
    $("#product-table").DataTable({
        columns: [
            {name: "id", data: "id"},
            {name: "Nombre", data: "name"},
            {name: "Precio", data: "price"}
        ],
        columnDefs: [
            {targets: [0], orderData: [0, 1]},
            {targets: [1], orderData: [1, 2]},
            {targets: [2], render: function (data, type, row) {
                    return data.replace(/[\€]/g, '').replace(/,/g, '.') + ' €';
                }
            }
        ],
        ajax: {
            url: "http://localhost/cursoDataTables/data/json/product.json"
        }
    });
});

