<?php
    require_once("funciones.php");
    $fecha= $_POST["datos"];
    
    $sql= "SELECT c.email, c.hora, c.asunto FROM citas c WHERE c.fecha_esp='$fecha' AND c.estado='aceptada' AND c.email NOT IN (SELECT u.email FROM usuarios u) ORDER BY hora asc";

    $datos= miClase::ejecutaConsultaArray($sql);

    echo json_encode($datos);    
?>