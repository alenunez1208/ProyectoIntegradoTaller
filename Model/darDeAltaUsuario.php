<?php	
    require_once("funciones.php");

    $id=$_POST['id'];
    
	$sql="UPDATE usuarios set activo=true where id='".$id."';";

	$n=miClase::ejecutaConsultaAccion($sql);

	if($n > 0)
	{
		echo "Exito";
	}
	else
		echo "Error";
?>