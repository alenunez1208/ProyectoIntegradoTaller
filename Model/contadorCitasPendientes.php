<?php
    require_once("funciones.php");

    $sql= "SELECT count(id_cita) FROM vista_usuario_citas WHERE estado='pendiente'";

    $resultset= miClase::ejecutaConsulta($sql);
    $row= $resultset->rowCount();

    echo $row;   
?>