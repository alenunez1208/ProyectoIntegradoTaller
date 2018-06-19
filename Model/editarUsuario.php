<?php
    require_once("funciones.php");

    $sDatos= $_POST["datos"];
    $oDatos = json_decode($sDatos);
    $id= $_POST["id"];
    $nombre= $oDatos->nombreUsuario;
    $apellidos= $oDatos->apellidosUsuario;
    $email= $oDatos->emailUsuario;
    $tlf= $oDatos->passwordUsuario;
    $pass= $oDatos->tlfUsuario;

    $sql1= "SELECT id FROM usuarios WHERE email='$email'";
    $res= miClase::ejecutaConsulta($sql1);
    $row= $res->rowCount();    
    
    if($row>0){
        echo json_encode("existe");
    } else{
        $sql= "UPDATE usuarios SET nombre='$nombre', apellidos='$apellidos', email='$email', password='$pass', telefono='$tlf' WHERE id='".$id."';";
        $resultset= miClase::ejecutaConsultaAccion($sql);
    
        if($resultset>0){
            echo json_encode(true); 
        } else{
            echo json_encode(false);
        } 
    }
?>