$(document).ready(function () {
//Cargar Tabla con una variable

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
    var datos = [{"id": 1, "name": "Foil - Round Foil", "price": "€534,01"},
        {"id": 2, "name": "Uniform Linen Charge", "price": "€26,63"},
        {"id": 3, "name": "Cookie Trail Mix", "price": "€955,26"},
        {"id": 4, "name": "Bread - Italian Sesame Poly", "price": "€978,73"},
        {"id": 5, "name": "Banana - Green", "price": "€563,70"},
        {"id": 6, "name": "Appetizer - Veg Assortment", "price": "€956,93"},
        {"id": 7, "name": "Pork Casing", "price": "€417,12"},
        {"id": 8, "name": "Sambuca - Opal Nera", "price": "€482,71"},
        {"id": 9, "name": "Cheese - Wine", "price": "€307,53"},
        {"id": 10, "name": "Fish - Bones", "price": "€797,51"},
        {"id": 11, "name": "Tart Shells - Barquettes, Savory", "price": "€190,53"},
        {"id": 12, "name": "Silicone Parch. 16.3x24.3", "price": "€434,84"}
    ];
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
        data: datos
    });

});