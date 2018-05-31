<?php
    require_once("funciones.php");
    $sql= "SELECT apellidos,nombre,email,telefono,asunto,fecha,hora,motivo,estado FROM vista_usuario_citas ORDER BY id_usuario desc";

    $datos= miClase::ejecutaConsultaArray($sql);

    echo json_encode($datos);    
?>