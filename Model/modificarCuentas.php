<?php
    require_once("funciones.php");
    
    $plataforma = $_POST["txtPlataforma"];
    
    if($plataforma=="calendar"){      
        $enlace = $_POST["txtEnlaceCalendar"];  
        $sql= "UPDATE cuentas SET calendar='$enlace'";
    } else if($plataforma=="twitter"){   
        $enlace = $_POST["txtEnlaceTwitter"]; 
        $sql= "UPDATE cuentas SET twitter='$enlace'";
    }

    $resultset= miClase::ejecutaConsultaAccion($sql);

    if($resultset){                    
        header('Location: ../Controller/index.php');
    } else{         
        header('Location: ../Controller/index.php');   
    }
?>
