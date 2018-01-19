<?php

class Conect_MySql {

    var $obj = [
        "dbname" => "world",
        "dbuser" => "root",
        "dbpwd" => "x8wsov6E1padF7twvd4c",
        "dbhost" => "localhost"
    ];
    var $db;

    public function __construct()
    {
        $this->db = $this->crearConexion();
    }

    private function crearConexion()
    {
        try {
            $opciones = [PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"];
            $host = $this->obj['dbhost'];
            $dbname = $this->obj['dbname'];
            $user = $this->obj['dbuser'];
            $pass = $this->obj['dbpwd'];
            $db = new PDO('mysql:host=' . $host . ';dbname=' . $dbname, $user, $pass, $opciones);
        } catch (PDOException $ex) {
            echo 'Error conectando a la BBDD. ' . $ex->getMessage();
        }
        return $db;
    }

    /**
     *
     * @param type $sql - INSERT INTO Tabla (name1, name2) VALUES (?, ?)
     * @param type $arrayParam - array($name1,$name2,$nameN)
     * return 0 or 1 if true -false
     */
    function executeByParam($sql, $arrayParam)
    {
        $stmt = $this->db->prepare($sql);
        for ($i = 0; $i < count($arrayParam); $i++)
        {
            $stmt->bindParam($i + 1, $arrayParam[$i]);
        }
        return $stmt->execute() ? 0 : 1;
    }

    function execute($sql)
    {
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
    }

    public function close_db()
    {
        unset($this->db);
    }

    /**
     *
     * @param type $sql
     * @return type Array
     */
    function fetchAll($sql)
    {
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        $resultado = $stmt->fetchAll();
        return $resultado;
    }

    /**
     *
     * @param type $sql - SELECT * FROM Tabla WHERE  Campo=?;
     * @param type $param
     * @return type Array
     */
    function fetchAllByParam($sql, $param)
    {
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(1, $param);
        $stmt->execute();
        $resultado = $stmt->fetchAll();
        return $resultado;
    }

    function fetchAllByParams($sql, $arrayParam)
    {
        $stmt = $this->db->prepare($sql);
        $tipoDato = ["integer" => PDO::PARAM_INT, "string" => PDO::PARAM_STR];
        for ($i = 0; $i < count($arrayParam); $i++)
        {
            $tip = gettype($arrayParam[$i]);
            $stmt->bindParam($i + 1, $arrayParam[$i], $tipoDato[$tip]);
        }
        $stmt->execute();
        $resultado = $stmt->fetchAll();
        return $resultado;
    }

}
