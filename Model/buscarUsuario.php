<?php
    require_once("funciones.php");

    $id=$_GET['id'];

    $sql="SELECT id,nombre,apellidos,email,password,telefono from usuarios where id='".$id."';";

    $resultset= miClase::ejecutaConsulta($sql);

    $datos=$resultset->fetch(PDO::FETCH_ASSOC);

    echo json_encode($datos);
?>