$(document).ready(function () {
    //Extender la funcion del dataTable por defecto con los datos que le pasemo
    $.extend(true, $.fn.dataTable.defaults, {
        info: false,
        paging: false,
        ordering: true,
        searching: true
    });

    //Deshabilitar busqueda, informacion del nºregistros y el campo de búsqueda
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
            url: "http://localhost/cursoDataTables/data/json/user.json"
        }
    });
});

