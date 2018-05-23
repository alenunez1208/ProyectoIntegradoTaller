<?php
    $sDatos = $_REQUEST["datos"];
    $oDatos = json_decode($sDatos);
	$respuesta= false;

    $to_address = "carquintotaller@gmail.com";
    $from_address = $oDatos->email;
    $subject = $oDatos->titulo;
    $message = $oDatos->mensaje;
    $headers = array();
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-type: text/html; charset="iso-8859-1"' ;
    $headers[] ='Content-Transfer-Encoding: 7bit' ;
    $headers[] = 'From: ' . $from_address;
    
    $success = mail($to_address, $subject, $message,  join("\r\n",$headers));
    if ($success) {
		echo json_encode(true);
        
    } else {
        echo json_encode(false);
    }	
?>