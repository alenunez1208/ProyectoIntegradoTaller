function altaUsuario(oEvento){
    var oE= oEvento || windows.event;
    var oForm= document.getElementById("frmAltaUsuario");

    var nombreUsu= oFrom.txtNombre.value.trim();
    var apellidosUsu= oFrom.txtApellidos.value.trim();
    var emailUsu= oForm.txtEmail.value.trim();
    var emailUsu2= oForm.txtEmail2.value.trim();
    var tlfUsu= oForm.txtTlf.value.trim();
    var passwordUsu= oForm.txtPassword.value.trim();

    var oUsuario= new oUsuario(nombreUsu,apellidosUsu,emailUsu,passwordUsu,tlfUsu);
    var datos= "datos="+JSON.stringify(oUsuario);
   
    $.post("../Model/altaUsuario.php",datos,respuestaPregunta,"json");
}

function respuestaPregunta(oDatosDevuelto, sStatus, oAjax){
		if (oDatosDevuelto == true){
            alert("Usuario dado de alta correctamente");
            document.frmAltaUsuario.reset();
		} else {
			alert("Problemas en el alta de usuario");
		}
	
}