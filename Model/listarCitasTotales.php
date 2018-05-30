<?php
    require_once("funciones.php");
    $sql= "SELECT apellidos,nombre,email,telefono,asunto,fecha,hora,motivo,estado FROM vista_usuario_citas";

    $datos= miClase::ejecutaConsultaArray($sql);

    echo json_encode($datos);    
?>