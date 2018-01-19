$(document).ready(function () {
//Traducir los mensajes de la tabla

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
    $.extend(true, $.fn.dataTable.defaults, {
        info: true,
        paging: true,
        ordering: true,
        searching: true,
        language: spanish
                //En otras versiones en teoría funcionaba
//        "language": {
//            //Server
//            //"url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
//            //Local
//            //"url": "../data/json/languajeSpanish.json"
//            "url": "../data/json/languaje/Spanish.lang"
//        }

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

