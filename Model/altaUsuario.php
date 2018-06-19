<?php
    require_once("funciones.php");

    $sDatos = $_REQUEST["datos"];
    $oDatos = json_decode($sDatos);

    $sql= "SELECT email FROM usuarios WHERE email='".$oDatos->emailUsuario."'";
    $resultset1= miClase::ejecutaConsulta($sql);
    $row= $resultset1->rowCount();

    if($row<=0){
        $sql= "INSERT INTO usuarios(nombre,apellidos,email,password,telefono,tipo,activo) values('".$oDatos->nombreUsuario."', '".$oDatos->apellidosUsuario."', '".$oDatos->emailUsuario."', '".$oDatos->passwordUsuario."', ".$oDatos->tlfUsuario.", 'usuario', true);";
        $resultset2= miClase::ejecutaConsultaAccion($sql);

        if($resultset2){
            $to_address = "carquintotaller@gmail.com";
            $from_address = $oDatos->emailUsuario;
            $subject = "BIENVENIDO";
            $message = "Bienvenido a nuestra plataforma online donde solo lo privilegiados podrán acceder.";
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
        echo json_encode("existe");
    }
?>
