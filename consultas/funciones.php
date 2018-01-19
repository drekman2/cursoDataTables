<?php

function consultaDatos($db)
{
    $resultado = $db->fetchAll("SELECT * FROM country;");
    $salida = "";
    for ($i = 0; $i < count($resultado); $i++)
    {
        $salida.= "{";
        $salida.= generateColumn("Code", $resultado[$i]['Code'] . "&nbsp; &nbsp; &nbsp;", false);
        $salida.= generateColumn("Name", $resultado[$i]['Name'], false);
        $salida.= generateColumn("Continent", $resultado[$i]['Continent'], true);
        $salida.= "},";
    }
    //Enviamos la lista de objetos con JSON
    $tabla = '{"data":[' . substr($salida, 0, strlen($salida) - 1) . ']}';
    echo $tabla;
}

function generateColumn($nameColumn, $value, $esFin, $simbolo = "")
{
    return $esFin ? '"' . $nameColumn . '":"' . $value . '"' . "  " : '"' . $nameColumn . '":"' . $value . '' . $simbolo . '",';
}

function consultaPesadaAllDates($db)
{
    $resultado = $db->fetchAll("SELECT * FROM country;");
    $salida = "";
    for ($i = 0; $i < count($resultado); $i++)
    {
        $salida.= "{";
        $salida.= generateColumn("Code", $resultado[$i]['Code'] . "&nbsp; &nbsp; &nbsp;", false);
        $salida.= generateColumn("Name", $resultado[$i]['Name'], false);
        $salida.= generateColumn("Region", $resultado[$i]['Region'], false);
        $salida.= generateColumn("Continent", $resultado[$i]['Continent'], false);
        $salida.= generateColumn("GovernmentForm", $resultado[$i]['GovernmentForm'], true);
        $salida.= "},";
    }
    //Enviamos la lista de objetos con JSON
    $tabla = '{"data":[' . substr($salida, 0, strlen($salida) - 1) . ']}';
    echo $tabla;
}

function editarCountry($db)
{
    $arrayParam = [$_POST["name"], $_POST["region"], $_POST["id"]];
    $resultado = $db->executeByParam("UPDATE country SET Name=?,Region=? WHERE Code=?;", $arrayParam);
    echo $resultado;
}

function borrarCountry($db)
{
    $idDel = $_POST["id"];
    $resultado = $db->executeByParam("DELETE FROM country WHERE Code=?;", [$idDel]);
    echo $resultado;
}

function consultaPesada($db)
{
    $params = $_REQUEST;
    $columns = $params['columns'];
    $sql = "SELECT * FROM country";
    $where = !empty($params['search']['value']) ? generarWhere($columns, $params['search']['value']) : "";
    $sql .= $where;
    $columnOrder = intval($params['order'][0]['column']);
    $param = array($columns[$columnOrder]['data'], $params['order'][0]['dir'], intval($params['start']), intval($params['length']));
    $sql .=" ORDER BY " . $param[0] . " " . $param[1] . " LIMIT " . $param[2] . "," . $param[3];
    $data = $db->fetchAll($sql);
    $totalRecords = isset($where) && $where != '' ? count($data) : $db->fetchAll("SELECT COUNT(*) FROM country;")[0][0];
    $json_data = array(
        "draw" => intval($params['draw']),
        "recordsTotal" => intval($totalRecords),
        "recordsFiltered" => intval($totalRecords),
        "data" => $data   // total data array
    );
    echo json_encode($json_data);
}

function consultaVariasTablas($db)
{
    $params = $_REQUEST;
    $columns = $params['columns'];
    $sql = "SELECT Distinct(CountryCode) FROM city";
    $where = !empty($params['search']['value']) ? generarWhere($columns, $params['search']['value']) : "";
    $sql .= $where;
    $columnOrder = intval($params['order'][0]['column']);
    $param = array($columns[$columnOrder]['data'], $params['order'][0]['dir'], intval($params['start']), intval($params['length']));
    $sql .=" ORDER BY " . $param[0] . " " . $param[1] . " LIMIT " . $param[2] . "," . $param[3];
    $data = $db->fetchAll($sql);
    $arrayFinal = generarCustomArray($db, $data);
    $totalRecords = isset($where) && $where != '' ? count($arrayFinal) : $db->fetchAll("SELECT COUNT(Distinct(CountryCode)) FROM city;")[0][0];
    echo json_encode(
            array("draw" => intval($params['draw']),
                "recordsTotal" => intval($totalRecords),
                "recordsFiltered" => intval($totalRecords),
                "data" => $arrayFinal   // total data array
    ));
}

function generarWhere($columns, $charSearch)
{
    $where = " WHERE (";
    for ($i = 0; $i < count($columns); $i++)
    {
        $isSearchable = $columns[$i]['searchable'] === "true";
        if ($isSearchable)
        {
            $where .= $columns[$i]['data'] . " LIKE '" . $charSearch . "%' OR ";
        }
    }
    $where = substr($where, 0, strlen($where) - 3) . ")";
    return $where;
}

function generarCustomArray($db, $data)
{
    $arrayFinal = array();
    for ($i = 0; $i < count($data); $i++)
    {
        $dateCountry = $db->fetchAllByParam('SELECT Name,Continent,Region,GovernmentForm FROM country WHERE Code=?;', $data[$i][0]);
        if (count($dateCountry) > 0)
        {
            $arrayTemporal = generarArrayTemporal($data[$i][0], $dateCountry);
            array_push($arrayFinal, $arrayTemporal);
        }
        unset($arrayTemporal);
    }
    return $arrayFinal;
}

function generarArrayTemporal($primerCampo, $data)
{
    $arrayTemporal = array();
    $arrayTemporal['CountryCode'] = $primerCampo;
    foreach ($data[0] as $key => $value)
    {
        $arrayTemporal[$key] = $value;
    }
    return $arrayTemporal;
}
