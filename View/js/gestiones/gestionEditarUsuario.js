function rellenarCamposEditarUsuario(){
    var idUsuarioEditar= document.getElementById("txtIdUsuario").value.trim();
    var oUsuario= buscarUsuario(idUsuarioEditar);

    $("#txtNombreEditar").val(oUsuario.nombreUsuario);
    $("#txtApellidosEditar").val(oUsuario.apellidosUsuario);
    $("#txtEmailEditar").val(oUsuario.emailUsuario);
    $("#txtPassEditar").val(oUsuario.passwordUsuario);
    $("#txtPassConfirmarEditar").val(oUsuario.passwordUsuario);
    $("#txtTlfEditar").val(oUsuario.tlfUsuario);
}

function modificarDatosPersonales(oEvento){
    var oE= oEvento || windows.event;
    var oForm= document.getElementById("frmEditarUsuario");

    if(validarEditarUsuario(oForm)){
        var iId= document.getElementById("txtIdUsuario").value.trim();
        var sNombre= oForm.txtNombreEditar.value.trim();
        var sApellidos= oForm.txtApellidosEditar.value.trim();
        var sEmail= oForm.txtEmailEditar.value.trim();
        var iTlt= oForm.txtTlfEditar.value.trim();
        var sPass= oForm.txtPassEditar.value.trim();
    
        var oUsuario= new Usuario(sNombre,sApellidos,sEmail,iTlt,sPass);
        var datos = "id="+iId+"&datos=" + JSON.stringify(oUsuario);
    
        $.post("../Model/editarUsuario.php", datos, respuestaEditarUsuario, "json");
    }
}

function respuestaEditarUsuario(oDatosDevuelto, sStatus, oAjax) {
    if (oDatosDevuelto == true) {
        alert("Usuario modificado correctamente");
        document.frmEditarUsuario.reset();
        rellenarCamposEditarUsuario();
    }else if(oDatosDevuelto == false){
        alert("Problemas al modificar usuario");
        rellenarCamposEditarUsuario();
    } else{
        alert("El email ya esta registrado");
    }

}

function buscarUsuario(idUsuario){
    var oUsuario= null;
    var sDatos= "id="+idUsuario;
    
    $.ajax({
        url :"../Model/buscarUsuario.php",
        async : false,
        cache : false, 
        method : "GET", 
        dataType : "json",
        data : sDatos,
        complete : function(oDatosDevuelto, sStatus){
            if(sStatus=="success" && oDatosDevuelto.responseJSON.id!=null){
                oUsuario=new Usuario(oDatosDevuelto.responseJSON.nombre, oDatosDevuelto.responseJSON.apellidos, 
                oDatosDevuelto.responseJSON.email, oDatosDevuelto.responseJSON.password, oDatosDevuelto.responseJSON.telefono);
            }
        }
    });

    return oUsuario;
}

function validarEditarUsuario(frm){
    var bValido= true;
    var error="";

    //nombre
    var nombreEditValidar = frm.txtNombreEditar.value.trim();
    frm.txtNombreEditar.value = frm.txtNombreEditar.value.trim();

    if (!oExpRegNombre.test(nombreEditValidar)) {
        frm.txtNombreEditar.parentNode.classList.add("has-error");
        frm.txtNombreEditar.focus();
        error = "Debe comprender entre 3 y 20 caracteres";
        falloValidacion(error, frm.txtNombreEditar);
        bValido = false;
    } else {
        frm.txtNombreEditar.parentNode.classList.remove("has-error");
        falloValidacion("", frm.txtNombreEditar);
    }

    //apellidos
    var apellidosEditValidar = frm.txtApellidosEditar.value.trim();
    frm.txtApellidosEditar.value = frm.txtApellidosEditar.value.trim();

    if (!oExpRegApellidos.test(apellidosEditValidar)) {
        frm.txtApellidosEditar.parentNode.classList.add("has-error");
        frm.txtApellidosEditar.focus();
        error = "Debe comprender entre 3 y 30 caracteres";
        falloValidacion(error, frm.txtApellidosEditar);
        bValido = false;
    } else {
        frm.txtApellidosEditar.parentNode.classList.remove("has-error");
        falloValidacion("", frm.txtApellidosEditar);
    }

    //email
    var emailEditValidar = frm.txtEmailEditar.value.trim();
    frm.txtEmailEditar.value = frm.txtEmailEditar.value.trim();

    if (!oExpRegCorreo.test(emailEditValidar)) {
        frm.txtEmailEditar.parentNode.classList.add("has-error");
        frm.txtEmailEditar.focus();
        error = "Formato de email incorrecto";
        falloValidacion(error, frm.txtEmailEditar);
        bValido = false;
    } else {
        frm.txtEmailEditar.parentNode.classList.remove("has-error");
        bCorrecto= true;
        falloValidacion("", frm.txtEmailEditar);
    }

    //telefono
    var  tlfEditValidar= frm.txtTlfEditar.value.trim();
    frm.txtTlfEditar.value= frm.txtTlfEditar.value.trim();
    
    if(!oExpRegTelefono.test(tlfEditValidar)){
        frm.txtTlfEditar.parentNode.classList.add("has-error");
		frm.txtTlfEditar.focus();
		error= "El teléfono no es correcto";
		falloValidacion(error, frm.txtTlfEditar);
		bValido= false;
	} else{
		frm.txtTlfEditar.parentNode.classList.remove("has-error");
		falloValidacion("", frm.txtTlfEditar);
    }

    //contraseña1
    var bCorrecto1= false;
    var  passEditValidar1= frm.txtPassEditar.value.trim();
    frm.txtPassEditar.value= frm.txtPassEditar.value.trim();
    
    if(!oExpRegPass.test(passEditValidar1)){
        frm.txtPassEditar.parentNode.classList.add("has-error");
		frm.txtPassEditar.focus();
		error= "Debe comprender entre 4 y 12 caracteres alfanuméricos";
		falloValidacion(error, frm.txtPassEditar);
		bValido= false;
	} else{
		frm.txtPassEditar.parentNode.classList.remove("has-error");
        falloValidacion("", frm.txtPassEditar);
        bCorrecto1= true;
    }

    //contraseña2
    var bCorrecto2= false;
    var  passEditValidar2= frm.txtPassConfirmarEditar.value.trim();
    frm.txtPassConfirmarEditar.value= frm.txtPassConfirmarEditar.value.trim();
    
    if(!oExpRegPass.test(passEditValidar2)){
        frm.txtPassConfirmarEditar.parentNode.classList.add("has-error");
		frm.txtPassConfirmarEditar.focus();
		error= "Debe comprender entre 4 y 12 caracteres alfanuméricos";
		falloValidacion(error, frm.txtPassConfirmarEditar);
		bValido= false;
	} else{
		frm.txtPassConfirmarEditar.parentNode.classList.remove("has-error");
        falloValidacion("", frm.txtPassConfirmarEditar);
        bCorrecto2= true;
    }

    //pass1 y pass2
    if(bCorrecto1 && bCorrecto2){
        if (passEditValidar1!=passEditValidar2) {
            frm.txtPassEditar.parentNode.classList.add("has-error");
            frm.txtPassEditar.focus();
            frm.txtPassConfirmarEditar.parentNode.classList.add("has-error");
            frm.txtPassConfirmarEditar.focus();
            error = "Error en la confimación, no coinciden";
            falloValidacion(error, frm.txtPassEditar);
            falloValidacion(error, frm.txtPassConfirmarEditar);
            bValido = false;
        } else {
            frm.txtPassEditar.parentNode.classList.remove("has-error");
            falloValidacion("", frm.txtPassEditar);
            frm.txtPassConfirmarEditar.parentNode.classList.remove("has-error");
            falloValidacion("", frm.txtPassConfirmarEditar);
        }
    }

    return bValido;
}