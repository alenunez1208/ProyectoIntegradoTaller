<?php
    $sDatos = $_REQUEST["datos"];
    $oDatos = json_decode($sDatos);

    $to_address = "nunezmontequinto2@gmail.com";
    $from_address = $oDatos->email;
    $subject = $oDatos->titulo;
    $message = $oDatos->mensaje;
    $headers = array();
    $limite = '==MP_Bound_xyccr948x==';
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-type: multipart/alternative; limite="' . $limite . '"';
    $headers[] = 'From: ' . $from_address;
    $msg_body = 'This is a Multipart Message in MIME format.' . "\n";
    $msg_body .= '--' . $limite . "\n";
    $msg_body .= 'Content-type: text/html; charset="iso-8859-1"' . "\n";
    $msg_body .= 'Content-Transfer-Encoding: 7bit' . "\n\n";
    $msg_body .= $message . "\n";
    $msg_body .= '--' . $limite . "\n";
    $msg_body .= 'Content-type: text/plain; charset="iso-8859-1"' . "\n";
    $msg_body .= 'Content-Transfer-Encoding: 7bit' . "\n\n";
    $msg_body .= strip_tags($message) . "\n";
    $msg_body .= '--' . $limite . '--' . "\n";
    
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