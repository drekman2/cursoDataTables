$(document).ready(function () {
    //Ocultar una columna y que no se ordene ni se busque en esa columna

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
            //Se puede poner que no sea ni visible ni buscable desde aquí también
            {name: "email", data: "email", visible: false, searchable: false}
        ],
        //Ordenar por varias columnas
        columnDefs: [
            {targets: [0], orderData: [0, 1]},
            {targets: [1], orderData: [1, 2]},
            //Se puede controlar que sean visibles dependiendo de una condicion
            {targets: [2], orderData: [2, 1], visible: false, searchable: false}
        ],
        ajax: {
            url: "http://localhost/cursoDataTables/data/json/user.json"
        }
    });

});

