$(document).ready(function () {
    reseteoModal();

    //Eliminar registros con Ajax y actualizar la tabla con los datos actuales
    //Modales BootStrapt y validacion bootstrap-validator
    //Popovers- Agregue contenido pequeño de superposición

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
    //Extender la funcion del dataTable por defecto con los datos que le pasemo
    $.extend(true, $.fn.dataTable.defaults, {
        info: true,
        paging: true,
        ordering: true,
        searching: true,
        responsive: true,
        language: spanish,
        lengthMenu: [
            [10, 25, 50, -1], [10, 25, 50, "Todos"]
        ]
    });
    //Cuando pulsemos los botones en el margen superior la columna se hace visible o invisible
    $("a.toogle-vis").on("click", function (e) {
        e.preventDefault();
        var column = table.column($(this).data("column"));
        column.visible(!column.visible());
    });

    var table = $("#country-table").DataTable({
        columns: [
            {
                "className": 'details-control',
                "orderable": false,
                "data": null,
                "defaultContent": ''
            },
            {name: "Code", data: "Code"},
            {name: "Nombre", data: "Name"},
            {name: "Region", data: "Region"},
            {name: "Operaciones", render: function (data, type, row) {
                    var botonEdit = "<a href='#' class='btn btn-primary btn-xs edit popoverData'  data-toggle='modal' rel='popover' data-content='Pulse para editar " + row.Name + "' data-placement='left' data-trigger='hover' data-target='#modalEdit' data-id='" + row.Code + "' data-name='" + row.Name + "' data-region='" + row.Region + "'><span class='glyphicon glyphicon-pencil'></span> </a>";
                    var botonDel = "<a href='#' class='btn btn-danger btn-xs delete popoverData' data-toggle='modal' rel='popover' data-content='Pulse para borrar " + row.Name + "' data-placement='right' data-trigger='hover' data-target='#modalDelete' data-id='" + row.Code + "' data-name='" + row.Name + "'><span class='glyphicon glyphicon-trash'></span> </a>";
                    return botonEdit + " &nbsp;" + botonDel;
                }},
            {name: "GovernmentForm", data: "GovernmentForm", visible: false}
        ],
        ajax: {
            url: "../../consultas/consultas.php",
            type: "POST",
            data: {
                "operacion": "consultaPesadaAllDates"
            }
        }
    });

    function generarFilasByDatos(dataObject, arrayCampos) {
        var tableHija = "<table class='' cellpadding='5' cellspacing='0' border='0' style='padding-left:50px;'>";
        for (i = 0; i < arrayCampos.length; i++) {
            var dataAtri = arrayCampos[i];
            tableHija += "<tr><td>" + arrayCampos[i] + "</td><td>" + dataObject[dataAtri] + "</td></tr>";
        }
        tableHija += "</table>";
        return  tableHija;
    }

    $('#country-table tbody').on('click', 'td.details-control', function (e) {
        e.preventDefault();
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        } else {
            // Open this row
            row.child(generarFilasByDatos(row.data(), ["Code", "Name", "GovernmentForm"])).show();
            tr.addClass('shown');
        }
    });
    $(document).on('click', '.delete', function (e) {
        e.preventDefault();
        idDel = $(this).data('id').trim();
        $("#borrar").attr('data-id', idDel);
        $("#mensajeBorrado").html("¿Estás seguro de que quieres borrar " + $(this).data('name') + "?");
    });

    $(document).on('click', '#borrar', function () {
        $.post("../../consultas/consultas.php", {operacion: 'borrarCountry', id: idDel},
                function (datos) {
                    console.log(datos);
                    if (datos === "0") {
                        $('#modalDelete').modal('hide');
                        alert("Borrado Correcto");
                        table.ajax.reload();
                    }
                }).error(function () {
        });
    });

    $(document).on('click', '.edit', function (e) {
        e.preventDefault();
        var idEdit = $(this).data('id').trim();
        $("#idEdit").val(idEdit);
        $("#name").val($(this).data('name'));
        $("#region").val($(this).data('region'));
    });
    $('#formEdit').bootstrapValidator({
        message: 'Este valor no es valido',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        excluded: ':disabled', // <=== Adding the 'excluded' option
        fields: {
            name: {
                validators: {
                    notEmpty: {
                        message: 'El nombre es requerido'
                    }
                }
            },
            region: {
                validators: {
                    notEmpty: {
                        message: 'La region es requerida'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        // Obtén el formulario
        var form = $(e.target);
        $.post("../../consultas/consultas.php", form.serialize(),
                function (datos) {
                    if (datos === "0") {
                        alert("Actualización correcta");
                        $('#modalEdit').modal('hide');
                        table.ajax.reload();
                    } else {
                        alert("Actualización fallida");
                    }
                }).error(function () {
            console.log("error actualizar");
        });
        //Reseteamos formulario y plugin de validacion Bootstrap
        $('#formEdit').bootstrapValidator("resetForm", true);
    });
    function reseteoModal() {
        $('#modalEdit').on('shown.bs.modal', function () {
            $("#name").focus();
        });
        //resetear formulario modal (En cuanto se oculta) Login
        $('#modalEdit').on('hidden.bs.modal', function () {
            $(this).find('#formEdit').trigger('reset');
            console.log('Reinicio Modal');
            //Reseteamos formulario y plugin de validacion Bootstrap
            $('#formEdit').bootstrapValidator("resetForm", true);
        });
    }

    //Control Popovers
    $('#country-table tbody').on('mouseenter', 'td .popoverData', function (e) {
        e.preventDefault();
        $(this).popover();
    });

});