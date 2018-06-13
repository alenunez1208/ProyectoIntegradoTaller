<?php
    require_once("funciones.php");
    $fecha= $_POST["datos"];
    
    $sql= "SELECT apellidos, nombre, hora, asunto FROM vista_usuario_citas WHERE fecha='$fecha' AND estado='aceptada' ORDER BY hora asc";

    $datos= miClase::ejecutaConsultaArray($sql);

    echo json_encode($datos);    
?>