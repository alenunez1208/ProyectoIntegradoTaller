<?php
    require_once("funciones.php");

    $sql= "SELECT apellidos, nombre, hora, asunto FROM vista_usuario_citas WHERE fecha_original='2018-05-14' ORDER BY fecha_original desc";

    $datos= miClase::ejecutaConsultaArray($sql);

    echo json_encode($datos);    
?>