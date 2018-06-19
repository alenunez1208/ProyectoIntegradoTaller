<?php
    require_once("funciones.php");

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
            
            }
            $resultset3= miClase::ejecutaConsultaAccion($sql3);
             
                $to_address = "carquintotaller@gmail.com";
                $from_address = "carquintotaller@gmail.com";
                $subject = "CITA PENDIENTE";
                $message = "Tienes una cita pediente de confirmar. Consulte las citas pendientes.";
                $headers = array();
                $headers[] = 'MIME-Version: 1.0';
                $headers[] = 'Content-type: text/html; charset="iso-8859-1"' ;
                $headers[] ='Content-Transfer-Encoding: 7bit' ;
                $headers[] = 'From: ' . $from_address;
                
                $success = mail($to_address, $subject, $message,  join("\r\n",$headers));
                
                if($success){
                    echo json_encode(true);
                } 
        } else{            
            echo json_encode(false);
        }   
    } else{
        echo json_encode(false);
    }
       
?>