<?php
    require_once("funciones.php");

    $fecha= $_GET["fecha"];

    $sql= "SELECT h.hora FROM horas h WHERE h.hora NOT IN (SELECT c.hora FROM citas c WHERE c.fecha_esp='$fecha')";
    $datos= miClase::ejecutaConsultaArray($sql);

    echo json_encode($datos);   
?>