<?php	
    require_once("funciones.php");

    $id=$_POST['iIdCita'];
    $estado=$_POST["estado"];
    
    if($estado=="true"){
        $sql="UPDATE citas set estado='aceptada' where id='".$id."';";

        $n=miClase::ejecutaConsultaAccion($sql);

        if($n > 0){
            $sql3= "SELECT email FROM vista_usuario_citas WHERE id_cita=$id";
            $result= miClase::ejecutaConsulta($sql3);
            
            foreach($result as $emailUsuarioAEnviar){
                    $to_address = $emailUsuarioAEnviar["email"];
                    $from_address = "carquintotaller@gmail.com";
                    $subject = "CITA ACEPTADA";
                    $message = "Solicitud de cita aceptada. Gracias por contar con nuestros servicios.";
                    $headers = array();
                    $headers[] = 'MIME-Version: 1.0';
                    $headers[] = 'Content-type: text/html; charset="iso-8859-1"' ;
                    $headers[] ='Content-Transfer-Encoding: 7bit' ;
                    $headers[] = 'From: ' . $from_address;
                    
                    $success = mail($to_address, $subject, $message,  join("\r\n",$headers));
                          
            }
            
            $success = mail($to_address, $subject, $message,  join("\r\n",$headers));
            echo "Exito";
        } else{
            echo "Error";
        }
    } else{
        $sql="UPDATE citas set estado='denegada' where id='".$id."';";

        $n=miClase::ejecutaConsultaAccion($sql);

        if($n > 0){
            $sql3= "SELECT email FROM vista_usuario_citas WHERE id_cita=$id";
            $result= miClase::ejecutaConsulta($sql3);
            
            foreach($result as $emailUsuarioAEnviar){
                    $to_address = $emailUsuarioAEnviar["email"];
                    $from_address = "carquintotaller@gmail.com";
                    $subject = "CITA DENEGADA";
                    $message = "Solicitud de cita denegada. Gracias por contar con nuestros servicios.";
                    $headers = array();
                    $headers[] = 'MIME-Version: 1.0';
                    $headers[] = 'Content-type: text/html; charset="iso-8859-1"' ;
                    $headers[] ='Content-Transfer-Encoding: 7bit' ;
                    $headers[] = 'From: ' . $from_address;
                    
                    $success = mail($to_address, $subject, $message,  join("\r\n",$headers));
                          
            }
            
            $success = mail($to_address, $subject, $message,  join("\r\n",$headers));
            echo "Exito";
        } else{
            echo "Error";
        }
    }
?>