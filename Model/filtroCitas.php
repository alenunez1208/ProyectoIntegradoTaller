<?php
    require_once("funciones.php");
   
    $emailUsuFiltro= $_POST["emailFiltroUsuario"];
    $estadoCitaUsu= $_POST["radioEstado"];
    //$estadoCitaUsu= "aceptada";
    
    if($estadoCitaUsu=="todas"){
        if($emailUsuFiltro==""){
            $sql= "SELECT apellidos,nombre,email,telefono,asunto,fecha,hora,motivo,estado FROM vista_usuario_citas ORDER BY fecha asc";
        } else{
            $sql= "SELECT apellidos,nombre,email,telefono,asunto,fecha,hora,motivo,estado FROM vista_usuario_citas WHERE email LIKE '%$emailUsuFiltro%' ORDER BY fecha asc";
        }
    } else if($estadoCitaUsu=="aceptada"){
        if($emailUsuFiltro==""){
            $sql= "SELECT apellidos,nombre,email,telefono,asunto,fecha,hora,motivo,estado FROM vista_usuario_citas WHERE estado='aceptada' ORDER BY fecha asc";
        } else{
            $sql= "SELECT apellidos,nombre,email,telefono,asunto,fecha,hora,motivo,estado FROM vista_usuario_citas WHERE estado='aceptada' AND email LIKE '%$emailUsuFiltro%' ORDER BY fecha asc";
        }
    } else if($estadoCitaUsu=="denegada"){
        if($emailUsuFiltro==""){
            $sql= "SELECT apellidos,nombre,email,telefono,asunto,fecha,hora,motivo,estado FROM vista_usuario_citas WHERE estado='denegada' ORDER BY fecha asc";
        } else{
            $sql= "SELECT apellidos,nombre,email,telefono,asunto,fecha,hora,motivo,estado FROM vista_usuario_citas WHERE estado='denegada' AND email LIKE '%$emailUsuFiltro%' ORDER BY fecha asc";
        }
    } else if($estadoCitaUsu==""){
        if($emailUsuFiltro==""){
            $sql= "SELECT c.email,c.asunto,c.fecha_esp,c.hora,c.motivo FROM citas c WHERE c.email NOT IN (SELECT u.email FROM usuarios u) ORDER BY c.fecha_esp asc";
        } else{
            $sql= "SELECT c.email,c.asunto,c.fecha_esp,c.hora,c.motivo FROM citas c WHERE c.email LIKE '%$emailUsuFiltro%' AND c.email NOT IN (SELECT u.email FROM usuarios u) ORDER BY c.fecha_esp asc";
        }
    }

    $datos= miClase::ejecutaConsultaArray($sql);

    echo json_encode($datos);   
?>