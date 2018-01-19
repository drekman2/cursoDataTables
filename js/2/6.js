$(document).ready(function () {
    //Controlar el alto de la tabla y hacer scroll
    //
    //vw: Relative to 1% of the width of the viewport*
    //Viewport = the browser window size.
    //If the viewport is 50cm wide, 1vw = 0.5cm.

    $.extend(true, $.fn.dataTable.defaults, {
        info: false,
        paging: false,
        ordering: true,
        searching: true
    });
    $("#users-table").DataTable({
        stateSave: false, //Esta propiedad es la que hace que guarde el estado de la tabla
        scrollY: "30vh",
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

