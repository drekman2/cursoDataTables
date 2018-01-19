$(document).ready(function () {
//Tabla de contenidos

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
        },
        "buttons": {
            "selectAll": "Seleccionar todos",
            "selectNone": "No Seleccionar ninguno",
            "selectRows": "Seleccionar Fila",
            "selectColumns": "Seleccionar Columna",
            "selectCells": "Seleccionar Celda",
            "copy": "Copiar",
            "print": "Imprimir"
        }
    };
    var datos = [{"id": 1, "grupo": "Primeros Pasos", "numSubElement": 3},
        {"id": 2, "grupo": "Mejorando Nuestras Tablas", "numSubElement": 8},
        {"id": 3, "grupo": "Temas Avanzados", "numSubElement": 10},
        {"id": 4, "grupo": "Utilizando Extensiones De Datatables Con El Dom", "numSubElement": 3},
        {"id": 5, "grupo": "Tablas Anidadas Ocultas", "numSubElement": 1},
        {"id": 6, "grupo": "Datatables Con Datos De Un Servidor (Server Side) ", "numSubElement": 5}
    ];

    var urls = [["webs/1_Primeros_Pasos/1.html", "webs/1_Primeros_Pasos/2.html", "webs/1_Primeros_Pasos/3.html"],
        ["webs/2_Mejorando_Nuestras_Tablas/1.html", "webs/2_Mejorando_Nuestras_Tablas/2.html", "webs/2_Mejorando_Nuestras_Tablas/3.html", "webs/2_Mejorando_Nuestras_Tablas/4.html", "webs/2_Mejorando_Nuestras_Tablas/5.html",
            "webs/2_Mejorando_Nuestras_Tablas/6.html", "webs/2_Mejorando_Nuestras_Tablas/7.html", "webs/2_Mejorando_Nuestras_Tablas/8.html"],
        ["webs/3_Temas_Avanzados/1.html", "webs/3_Temas_Avanzados/2.html", "webs/3_Temas_Avanzados/3.html", "webs/3_Temas_Avanzados/3_AJAX_PARAM.html", "webs/3_Temas_Avanzados/4.html", "webs/3_Temas_Avanzados/5.html", "webs/3_Temas_Avanzados/6.html",
            "webs/3_Temas_Avanzados/7.html", "webs/3_Temas_Avanzados/8.html", "webs/3_Temas_Avanzados/9.html"],
        ["webs/4_Utilizando_Extensiones_Dom/1.html", "webs/4_Utilizando_Extensiones_Dom/2.html", "webs/4_Utilizando_Extensiones_Dom/OtrasExtensiones/customButtons.html"],
        ["webs/5_Tablas_Anidadas_Ocultas/1.html"],
        ["webs/6_Datos_Servidor/1.html", "webs/6_Datos_Servidor/DatosVariasTablas.html", "webs/6_Datos_Servidor/3.html", "webs/6_Datos_Servidor/4.html","webs/6_Datos_Servidor/tablaCompleta.html"]
    ];
    var description = [["Desarrollar nuestra primera tabla", "Carga de datos utilizando archivos JSON", "Habilitar y deshabilitar búsquedas, órdenes, paginaciones y datos adicionales"],
        ["Extender el comportamiento base de Datatables de forma global", "Ordenación de resultados por múltiples columnas", "Múltiples tablas en la misma página", "Ocultar columnas y desactivar búsquedas", "Guardar el estado de nuestras tablas al refrescar la página",
            "Añadir Scrolls y controlar el tamaño de nuestras tablas con CSS3", "Traducir todas las tablas de nuestra aplicación", "Modificar el contenido de cada columna con el método render"],
        ["Sumar y mostrar los valores monetarios por página y total de páginas", "Sobrescribir el desplegable para mostrar un número de resultados", "Cargar datos en Datatables desde una variable", "Consulta AJAX directamente Datatable", "Destacar valores monetarios altos en Datatables aplicando clases CSS", "Agrupando resultados por una columna", "Realizar búsquedas al pulsar en cualquier columna utilizando el eventos", "Añadir campos de texto en el footer para realizar búsquedas",
            "Añadir campos de selección para búsquedas sólo para las columnas candidatas", "Mostrar y ocultar columnas de forma dinámica"],
        ["Añadir botones y lógica para imprimir y exportar nuestras tablas a Excel, Pdf, Csv", "Añadir botones para seleccionar columnas, filas y celdas", "Más sobre las extensiones", "Botones personalizando iconos"],
        ["Añadir tablas ocultas con información adicional que se puedan desplegar"],
        ["Consumir 20.000 registros de un servidor, optimización y pruebas de carga", "Consulta al servidor con datos de varias tablas", "Añadir botones de acción a Datatables utilizando atributos data Sin Funcion", "Eliminar registros con Ajax y actualizar la tabla con los datos actuales","Ejemplo de DrawCallback con datos de servidor paginados, los agrupa segun carga no ordena datos"]
    ];

    //Cuando pulsemos los botones en el margen superior la columna se hace visible o invisible
    $("a.toogle-vis").on("click", function (e) {
        e.preventDefault();
        var column = table.column($(this).data("column"));
        column.visible(!column.visible());
    });
    var table = $("#content-table").DataTable({
        responsive: {
            details: {
                type: 'column',
                target: 'tr'
            }
        },
        info: true,
        order: [[1, 'asc']],
        ordering: true,
        searching: true,
        language: spanish,
        columns: [
            {
                "className": 'details-control',
                "orderable": false,
                "data": null,
                "defaultContent": ''
            },
            {name: "Id", data: "id"},
            {name: "Grupo", data: "grupo"}
        ],
        data: datos
    });
    function generarFilasByDatos(dataObject, arrayCampos) {
        var tableHija = "<table class='display table' cellpadding='5' cellspacing='0' border='0' style='padding-left:50px;'>";
        tableHija += "<th>Nº Vídeo</th><th>Enlace</th><th>Descripción</th>";
        var id = parseInt(dataObject[arrayCampos[0]] - 1);
        var numSubElement = parseInt(dataObject[arrayCampos[1]]);
        for (i = 0; i < numSubElement; i++) {
            tableHija += "<tr><td>" + (i + 1) + "</td><td>" + "<a href='" + urls[id][i] + "'>" + urls[id][i] + "</a>" + "</td><td>" + description[id][i] + "</td></tr>";
        }
        tableHija += "</table>";
        return  tableHija;
    }

    $('#content-table tbody').on('click', 'td.details-control', function (e) {
        e.preventDefault();
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        } else {
            // Open this row
            row.child(generarFilasByDatos(row.data(), ["id", "numSubElement"])).show();
            tr.addClass('shown');
        }
    });
});