function enviarPregunta(oEvento){
    var oE= oEvento || windows.event;
    var oForm= document.getElementById("frmPresupuesto");

    var titulo= oForm.txtTitulo.value.trim();
    var email= oForm.txtEmail.value.trim();
    var tlf= oForm.txtTelefono.value.trim();
    var mensaje= oForm.txtDescripcion.value.trim();

    var oPregunta= new Pregunta(titulo,email,tlf,mensaje);
    var datos= "datos="+JSON.stringify(oPregunta);

    $.post("../Model/enviarPregunta.php",datos,respuestaPregunta,"json");
}

function respuestaPregunta(oDatosDevuelto, sStatus, oAjax){
		if (oDatosDevuelto == true){
            alert("Correo enviado");
            document.frmPresupuesto.reset();
            rellenaCamposUsuario();
		} else {
			alert("Problemas en el envío del correo");
		}
}

function rellenaCamposUsuario(){
    var rellenaEmail= document.getElementById("txtEmailUsuario").value.trim();
    var rellenaTlf= document.getElementById("txtTlfUsuario").value.trim();
    $("#txtEmail").val(rellenaEmail);
    $("#txtTelefono").val(rellenaTlf);
}