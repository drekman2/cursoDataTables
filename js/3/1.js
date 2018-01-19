$(document).ready(function () {
    //Sumar y mostrar los valores monetarios por página y total de páginas

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
        language: spanish
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
        },
        //Calculo de sumatorios por página y total de registros
        footerCallback: function (row, data, star, end, display) {
            var api = this.api();
            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === 'string' ?
                        i.replace(/[\€]/g, '').replace(/,/g, '.') * 1 :
                        typeof i === 'number' ?
                        i : 0;
            };
            var total = api
                    .column(2)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);
            var totalPage = api
                    .column(2, {page: 'current'})
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);
            // Update footer
            $(api.column(2).footer()).html(
                    totalPage.toFixed(2) + '€'
                    );
            $("#sumTotalprice").html(total.toFixed(2) + '€ total');
        }
    });
});

