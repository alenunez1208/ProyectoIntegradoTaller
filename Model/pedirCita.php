<?php
    require_once("funciones.php");

    $sDatos = $_REQUEST["datos"];
    $oDatos = json_decode($sDatos);

    $sql= "INSERT INTO citas(asunto,fecha,fecha_esp,hora,motivo,estado) values('".$oDatos->asunto."', ".$oDatos->fecha.", '".$oDatos->fechaEsp."', '".$oDatos->hora."', '".$oDatos->descripcion."', '".$oDatos->estado."');";
    $resultset= miClase::ejecutaConsultaAccion($sql);
    
    if($resultset){
        $sql2= "SELECT id FROM citas WHERE fecha='$fechaA' AND hora='$horaA'";
        $idCita= miClase::ejecutaConsulta($sql2);

        echo "<pre>";
        print_r($idCita);
        echo "</pre>";

        if($idCita){
            $sql3= "INSERT INTO usuario_citas(id_usuario,id_cita) values($idUsu, $idCita);";
            $resultset3= miClase::ejecutaConsultaAccion($sql3);
            echo json_encode(true);
        } else{            
            echo json_encode(false);
        }        
    } else{
        echo json_encode(false);
    }
?>