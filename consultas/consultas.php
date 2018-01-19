<?php

//Client
include_once 'clases/conexion.php';
include_once './funciones.php';
$db = new Conect_MySql();

$operacion = 'consulta';
if (isset($_POST['operacion']))
{
    $operacion = $_POST['operacion'];
}

switch ($operacion)
{
    case 'consultaTabla':
        consultaDatos($db);
        break;
    case 'consultaPesada':
        consultaPesada($db);
        break;
    case 'consultaPersonalizadaVariasTablas':
        consultaVariasTablas($db);
        break;
    case 'consultaPesadaAllDates':
        consultaPesadaAllDates($db);
        break;
    case 'borrarCountry':
        borrarCountry($db);
        break;
    case 'editarCountry':
        editarCountry($db);
        break;
    default:
        break;
}