<?php
    include("funciones.php");
    
    $username= $_POST["username"];
    $pass= $_POST["password"];

    $sql= "SELECT nombre,apellidos,email,password,tipo FROM usuarios";

?>
