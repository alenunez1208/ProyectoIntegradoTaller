<?php	
    require_once("funciones.php");

    $id=$_POST['iIdCita'];
    $estado=$_POST["estado"];
    
    if($estado=="true"){
        $sql="UPDATE citas set estado='aceptada' where id='".$id."';";

        $n=miClase::ejecutaConsultaAccion($sql);

        if($n > 0){
            echo "Exito";
        } else{
            echo "Error";
        }
    } else{
        $sql="UPDATE citas set estado='denegada' where id='".$id."';";

        $n=miClase::ejecutaConsultaAccion($sql);

        if($n > 0){
            echo "Exito";
        } else{
            echo "Error";
        }
    }
        
?>