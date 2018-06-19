<?php	
    require_once("funciones.php");

    $id=$_POST['id'];
    
	$sql="UPDATE usuarios set activo=true where id='".$id."';";

	$n=miClase::ejecutaConsultaAccion($sql);

	if($n > 0)
	{
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
		echo "Exito";        
    } else {
        echo "ErrorMail";
    }
	}
	else
		echo "Error";
?>