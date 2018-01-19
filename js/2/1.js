$(document).ready(function () {

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
        ajax: {
            url: "http://localhost/cursoDataTables/data/json/user.json"
        }
    });
});

