<?php
    require_once('funciones.php');

    $username= $_POST["username"];

    $sql= "SELECT nombre,apellidos,email,password,telefono,tipo FROM usuarios WHERE email='$username'";

    $usuario= array();
    $resultset= miClase::ejecutaConsulta($sql);

    while($fila= $resultset->fetch_assoc()){
        $usuario[]= $fila;
    }
?>