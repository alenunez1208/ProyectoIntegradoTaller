<?php
    require_once("funciones.php");

    $sql="SELECT twitter from cuentas";

    $resultset= miClase::ejecutaConsulta($sql);

    $datos=$resultset->fetch(PDO::FETCH_ASSOC);

    echo json_encode($datos);
?>