<?php
    require_once("funciones.php");
    $sql= "SELECT * FROM vista_usuario_citas";

    $datos= miClase::ejecutaConsultaArray($sql);

    echo json_encode($datos);    
?>