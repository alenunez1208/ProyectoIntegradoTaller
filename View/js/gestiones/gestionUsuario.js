function altaUsuario(oEvento) {
    var oE = oEvento || windows.event;
    var oForm = document.getElementById("frmAltaUsuario");

    if (validarAltaUsuario(oForm)) {
        var nombreUsu = oForm.txtNombre.value.trim();
        var apellidosUsu = oForm.txtApellidos.value.trim();
        var emailUsu = oForm.txtEmail.value.trim();
        var emailUsu2 = oForm.txtEmail2.value.trim();
        var tlfUsu = oForm.txtTlf.value.trim();
        var passwordUsu = oForm.txtPassword.value.trim();

        var oUsuario = new Usuario(nombreUsu, apellidosUsu, emailUsu, passwordUsu, tlfUsu);
        var datos = "datos=" + JSON.stringify(oUsuario);

        $.post("../Model/altaUsuario.php", datos, respuestaAltaUsuario, "json");
    }
}

function respuestaAltaUsuario(oDatosDevuelto, sStatus, oAjax) {
    if (oDatosDevuelto == true) {
        alert("Usuario dado de alta correctamente");
        document.frmAltaUsuario.reset();
    } else if (oDatosDevuelto == "existe") {
        alert("Usuario existente");
    } else {
        alert("Problemas en el alta de usuario");
    }

}

function validarAltaUsuario(frm) {
    var bValido = true;
    var error = "";

    //nombre
    var nombreUsuValidar = frm.txtNombre.value.trim();
    frm.txtNombre.value = frm.txtNombre.value.trim();

    if (!oExpRegNombre.test(nombreUsuValidar)) {
        frm.txtNombre.parentNode.classList.add("has-error");
        frm.txtNombre.focus();
        error = "Debe comprender entre 3 y 20 caracteres";
        falloValidacion(error, frm.txtNombre);
        bValido = false;
    } else {
        frm.txtNombre.parentNode.classList.remove("has-error");
        falloValidacion("", frm.txtNombre);
    }

    //apellidos
    var apellidosUsuValidar = frm.txtApellidos.value.trim();
    frm.txtApellidos.value = frm.txtApellidos.value.trim();

    if (!oExpRegApellidos.test(apellidosUsuValidar)) {
        frm.txtApellidos.parentNode.classList.add("has-error");
        frm.txtApellidos.focus();
        error = "Debe comprender entre 3 y 30 caracteres";
        falloValidacion(error, frm.txtApellidos);
        bValido = false;
    } else {
        frm.txtApellidos.parentNode.classList.remove("has-error");
        falloValidacion("", frm.txtApellidos);
    }

    //email1
    var bCorrecto= false;
    var email1UsuValidar = frm.txtEmail.value.trim();
    frm.txtEmail.value = frm.txtEmail.value.trim();

    if (!oExpRegCorreo.test(email1UsuValidar)) {
        frm.txtEmail.parentNode.classList.add("has-error");
        frm.txtEmail.focus();
        error = "Formato de email incorrecto";
        falloValidacion(error, frm.txtEmail);
        bValido = false;
    } else {
        frm.txtEmail.parentNode.classList.remove("has-error");
        bCorrecto= true;
        falloValidacion("", frm.txtEmail);
    }

    //email2
    var bCorrecto2= false;
    var email2UsuValidar = frm.txtEmail2.value.trim();
    frm.txtEmail2.value = frm.txtEmail2.value.trim();

    if (!oExpRegCorreo.test(email2UsuValidar)) {
        frm.txtEmail2.parentNode.classList.add("has-error");
        frm.txtEmail2.focus();
        error = "Formato de email incorrecto";
        falloValidacion(error, frm.txtEmail2);
        bValido = false;
    } else {
        frm.txtEmail2.parentNode.classList.remove("has-error");
        bCorrecto2= true;
        falloValidacion("", frm.txtEmail2);
    }

    //email1 y email2
    if(bCorrecto && bCorrecto2){
        if (email1UsuValidar!=email2UsuValidar) {
            frm.txtEmail.parentNode.classList.add("has-error");
            frm.txtEmail.focus();
            frm.txtEmail2.parentNode.classList.add("has-error");
            frm.txtEmail2.focus();
            error = "Error en la confimación, no coinciden";
            falloValidacion(error, frm.txtEmail);
            falloValidacion(error, frm.txtEmail2);
            bValido = false;
        } else {
            frm.txtEmail.parentNode.classList.remove("has-error");
            falloValidacion("", frm.txtEmail);
            frm.txtEmail2.parentNode.classList.remove("has-error");
            falloValidacion("", frm.txtEmail2);
        }
    }

    //telefono
    var  tlfUsuValidar= frm.txtTlf.value.trim();
    frm.txtTlf.value= frm.txtTlf.value.trim();
    
    if(!oExpRegTelefono.test(tlfUsuValidar)){
        frm.txtTlf.parentNode.classList.add("has-error");
		frm.txtTlf.focus();
		error= "El teléfono no es correcto";
		falloValidacion(error, frm.txtTlf);
		bValido= false;
	} else{
		frm.txtTlf.parentNode.classList.remove("has-error");
		falloValidacion("", frm.txtTlf);
    }

    //contraseña
    var  passUsuValidar= frm.txtPassword.value.trim();
    frm.txtPassword.value= frm.txtPassword.value.trim();
    
    if(!oExpRegPass.test(passUsuValidar)){
        frm.txtPassword.parentNode.classList.add("has-error");
		frm.txtPassword.focus();
		error= "Debe comprender entre 4 y 12 caracteres alfanuméricos";
		falloValidacion(error, frm.txtPassword);
		bValido= false;
	} else{
		frm.txtPassword.parentNode.classList.remove("has-error");
		falloValidacion("", frm.txtPassword);
    }

    return bValido;
}