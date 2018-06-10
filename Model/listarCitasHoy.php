<?php
    require_once("funciones.php");
    $fecha= $_GET["datos"];
    
    $sql= "SELECT apellidos, nombre, hora, asunto FROM vista_usuario_citas WHERE fecha_ori='$fecha' AND estado='aceptada'";

    $datos= miClase::ejecutaConsultaArray($sql);

    echo json_encode($datos);    
?>