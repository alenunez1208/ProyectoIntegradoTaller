<?php
    require_once("funciones.php");
    $sql= "SELECT apellidos,nombre,email,telefono,asunto,fecha,hora,motivo,id_cita FROM vista_usuario_citas WHERE estado='pendiente' ORDER BY id_cita desc";

    $datos= miClase::ejecutaConsultaArray($sql);

    echo json_encode($datos);    
?>