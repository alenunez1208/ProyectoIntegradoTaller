<?php
    require_once("funciones.php");

    $enlace = $_POST["enlace"];
    $plataforma = $_POST["plataforma"];
    
    if($plataforma=="calendar"){        
        $sql= "UPDATE cuentas SET calendar='$enlace'";
    } else if($plataforma=="twitter"){
        $sql= "UPDATE cuentas SET twitter='$enlace'";
    }

    $resultset= miClase::ejecutaConsultaAccion($sql);

    if($resultset){
        echo json_encode(true);        
    } else{
        echo json_encode(false);
    }
?>
