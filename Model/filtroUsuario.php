<?php
    require_once("funciones.php");
   
    $emailUsuFiltro= $_POST["emailUsuario"];
    $estadUsu= $_POST["radioEstado"];
    
    if($estadUsu=="ambos"){
        if($emailUsuFiltro==""){
            $sql= "SELECT id,nombre,apellidos,email,telefono,activo FROM usuarios WHERE tipo='usuario' ORDER BY id desc";
        } else{
            $sql= "SELECT id,nombre,apellidos,email,telefono,activo FROM usuarios WHERE tipo='usuario' AND email LIKE '%$emailUsuFiltro%' ORDER BY id desc";
        }
    } else if($estadUsu=="activo"){
        if($emailUsuFiltro==""){
            $sql= "SELECT id,nombre,apellidos,email,telefono,activo FROM usuarios WHERE tipo='usuario' AND activo=true ORDER BY id desc";
        } else{
            $sql= "SELECT id,nombre,apellidos,email,telefono,activo FROM usuarios WHERE tipo='usuario' AND email LIKE '%$emailUsuFiltro%' AND activo=true ORDER BY id desc";
        }
    } else if($estadUsu=="baja"){
        if($emailUsuFiltro==""){
            $sql= "SELECT id,nombre,apellidos,email,telefono,activo FROM usuarios WHERE tipo='usuario' AND activo=false ORDER BY id desc";
        } else{
            $sql= "SELECT id,nombre,apellidos,email,telefono,activo FROM usuarios WHERE tipo='usuario' AND email LIKE '%$emailUsuFiltro%' AND activo=false ORDER BY id desc";
        }
    }

    $datos= miClase::ejecutaConsultaArray($sql);

    echo json_encode($datos); 
?>