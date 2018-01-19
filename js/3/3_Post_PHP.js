$(document).ready(function () {
//Cargar Tabla con datos AJAX y pasar parametro

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
    //Extender la funcion del dataTable por defecto con los datos que le pasemos
    $.extend(true, $.fn.dataTable.defaults, {
        info: true,
        paging: true,
        ordering: true,
        searching: true,
        language: spanish,
        lengthMenu: [
            [10, 25, 50, -1], [10, 25, 50, "Todos"]
        ]
    });

    //Deshabilitar busqueda, informacion del nºregistros y el campo de búsqueda
    $("#rss-table").DataTable({
        columns: [
            {name: "Code", data: "Code"},
            {name: "Nombre", data: "Name"},
            {name: "Continente", data: "Continent"}
        ],
        columnDefs: [
            {targets: [0], orderData: [0, 1]},
            {targets: [1], orderData: [1, 2]}
        ],
        ajax: {
            url: "../../consultas/consultas.php",
            type: "POST",
            data: {
                "operacion": "consultaTabla"
            }
            //Comprobar datos devueltos
//            dataFilter: function (data) {
//                console.log(data);
//                var json = jQuery.parseJSON(data);
//                return JSON.stringify(json); // return JSON string
//            },
        }
    });

});