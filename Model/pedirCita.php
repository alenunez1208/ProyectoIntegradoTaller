<?php
    require_once("funciones.php");
    require_once("cita.php");

    $sDatos = $_REQUEST["datos"];
    $oDatos = json_decode($sDatos);

    $sql= "INSERT INTO citas(asunto,fecha,fecha_esp,hora,motivo,estado) values('$oDatos->asunto', '$oDatos->fecha', '$oDatos->fechaEsp', '$oDatos->hora', '$oDatos->descripcion', '$oDatos->estado')";
    $resultset= miClase::ejecutaConsultaAccion($sql);
    
    if($resultset>0){
        $sql2= "SELECT id FROM citas WHERE fecha_esp='$oDatos->fechaEsp' AND hora='$oDatos->hora'";
        $idCita= miClase::ejecutaConsulta($sql2);

        if($idCita){
            foreach($idCita as $citaId){                
                $sql3= "INSERT INTO usuarios_citas(id_usuario,id_cita) values($oDatos->idUsuario, ".$citaId['id'].")";
                $resultset3= miClase::ejecutaConsultaAccion($sql3);
                echo json_encode(true);
            }
        } else{            
            echo json_encode(false);
        }   
    } else{
        echo json_encode(false);
    }
       
?>