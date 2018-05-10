<?php
    $sDatos = $_REQUEST["datos"];
    $oDatos = json_decode($sDatos);
    $resultado= false;

    $to_address = "nunezmontequinto2@gmail.com";
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
        echo '<h1>Enhorabuena!</h1>';
        echo '<p>El  siguiente mensaje ha sido enviado: <br/><br/>';
        echo '<b>To:</b> ' . $to_address . '<br/>';
        echo '<b>From:</b> ' . $from_address . '<br/>';
        echo '<b>Subject:</b> ' . $subject . '<br/>';
        echo '<b>Message:</b></p>';
        echo nl2br($message);
    } else {
        echo '<p><strong>Se produjo un error al enviar su mensaje.</strong></p>';
    }
?>