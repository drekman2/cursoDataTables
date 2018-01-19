$(document).ready(function () {

    //Multiples Tablas en la misma página

    //Extender la funcion del dataTable por defecto con los datos que le pasemo
    $.extend(true, $.fn.dataTable.defaults, {
        info: false,
        paging: true,
        ordering: true,
        searching: true
    });
    $("#users-table").DataTable({
        columns: [
            {name: "id", data: "id"},
            {name: "Nombre", data: "Nombre"},
            {name: "email", data: "email"}
        ],
        //Ordenar por varias columnas
        columnDefs: [
            {targets: [0], orderData: [0, 1]},
            {targets: [1], orderData: [1, 2]},
            {targets: [2], orderData: [2, 1]}
        ],
        ajax: {
            url: "http://localhost/CursoDatatables/data/json/user.json"
        }
    });
    $("#product-table").DataTable({
        columns: [
            {name: "id", data: "id"},
            {name: "Nombre", data: "name"},
            {name: "precio", data: "price"}
        ],
        ajax: {
            url: "http://localhost/cursoDataTables/data/json/product.json"
        }
    });

});

