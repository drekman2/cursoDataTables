$(document).ready(function () {
    //Habilitar y deshabilitar búsquedas, órdenes, paginaciones y datos adicionales
    $("#users-table").DataTable({
        info: false,
        paging: false,
        ordering: false,
        searching: false,
        columns: [
            {name: "id", data: "id"},
            {name: "Nombre", data: "Nombre"},
            {name: "email", data: "email"}
        ],
        ajax: {
            url: "http://localhost/cursoDataTables/data/json/user.json"
        }
    });
});

