<?php
    require_once("funciones.php");
    $fecha= $_GET["datos"];
    
    $sql= "SELECT apellidos, nombre, hora, asunto FROM vista_usuario_citas WHERE fecha='$fecha' AND estado='aceptada' ORDER BY fecha_original desc";

    $datos= miClase::ejecutaConsultaArray($sql);

    echo json_encode($datos);    
?>