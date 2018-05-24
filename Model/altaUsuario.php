<?php
    require_once("funciones.php");

    $sDatos = $_REQUEST["datos"];
    $oDatos = json_decode($sDatos);

    $sql= "SELECT email FROM usuarios WHERE email='".$oDatos->emailUsuario."'";
    $resultset1= miClase::ejecutaConsulta($sql);
    $row= $resultset1->rowCount();

    if($row<=0){
        $sql= "INSERT INTO usuarios values('','".$oDatos->nombreUsuario."', '".$oDatos->apellidosUsuario."', '".$oDatos->emailUsuario."', '".$oDatos->passwordUsuario."', ".$oDatos->tlfUsuario.", 'usuario', true);";
        $resultset2= miClase::ejecutaConsultaAccion($sql);

        if($resultset2){
            echo json_encode(true);
            
        } else{
            echo json_encode(false);
        }
    } else{
        echo json_encode("existe");
    }
?>
