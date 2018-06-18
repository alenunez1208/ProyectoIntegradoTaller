<?php
    require_once("funciones.php");
    $sql= "SELECT c.email,c.asunto,c.fecha_esp,c.hora,c.motivo FROM citas c WHERE c.email NOT IN (SELECT u.email FROM usuarios u) ORDER BY c.fecha_esp asc";

    $datos= miClase::ejecutaConsultaArray($sql);

    echo json_encode($datos);    
?>