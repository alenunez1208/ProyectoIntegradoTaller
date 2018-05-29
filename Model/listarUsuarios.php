<?php
    require_once("funciones.php");
    $sql= "SELECT id,nombre,apellidos,email,telefono,activo FROM usuarios WHERE tipo='usuario' ORDER BY id desc";

    $datos= miClase::ejecutaConsultaArray($sql);

    echo json_encode($datos);    
?>