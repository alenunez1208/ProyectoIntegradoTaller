function enviarPregunta(oEvento) {
    var oE = oEvento || windows.event;
    var oForm = oE.target.parentNode.parentNode;

    if (validarFrmPreguntas(oForm)) {
        var titulo = oForm.txtTitulo.value.trim();
        var email = oForm.txtEmail.value.trim();
        var tlf = oForm.txtTelefono.value.trim();
        var mensaje = oForm.txtDescripcion.value.trim();

        var oPregunta = new Pregunta(titulo, email, tlf, mensaje);
        var datos = "datos=" + JSON.stringify(oPregunta);

        $.post("../Model/enviarPregunta.php", datos, respuestaPregunta, "json");
    }
}

function respuestaPregunta(oDatosDevuelto, sStatus, oAjax) {
    if (oDatosDevuelto == true) {
        alert("Correo enviado");
        document.frmPresupuesto.reset();
        rellenaCamposUsuario();
    } else {
        alert("Problemas en el envío del correo");
    }
}

function rellenaCamposUsuario() {
    var rellenaEmail = document.getElementById("txtEmailUsuario").value.trim();
    var rellenaTlf = document.getElementById("txtTlfUsuario").value.trim();
    $("#txtEmail").val(rellenaEmail);
    $("#txtTelefono").val(rellenaTlf);
}

function validarFrmPreguntas(frm) {
    var bValido = true;
    var error= "";

    //titulo
    var  tituloPregunta= frm.txtTitulo.value.trim();
    frm.txtTitulo.value= frm.txtTitulo.value.trim();
    
    if(!oExpRegTitulo.test(tituloPregunta)){
        frm.txtTitulo.parentNode.classList.add("has-error");
		frm.txtTitulo.focus();
		error= "Debe comprender entre 3 y 25 caracteres";
		falloValidacion(error, frm.txtTitulo);
		bValido= false;
	} else{
		frm.txtTitulo.parentNode.classList.remove("has-error");
		falloValidacion("", frm.txtTitulo);
    }
    
    //email
    var  emailPregunta= frm.txtEmail.value.trim();
    frm.txtEmail.value= frm.txtEmail.value.trim();
    
    if(!oExpRegCorreo.test(emailPregunta)){
        frm.txtEmail.parentNode.classList.add("has-error");
		frm.txtEmail.focus();
		error= "Formato de email incorrecto";
		falloValidacion(error, frm.txtEmail);
		bValido= false;
	} else{
		frm.txtEmail.parentNode.classList.remove("has-error");
		falloValidacion("", frm.txtEmail);
    }

    //telefono
    var  tlfPregunta= frm.txtTelefono.value.trim();
    frm.txtTelefono.value= frm.txtTelefono.value.trim();
    
    if(!oExpRegTelefono.test(tlfPregunta)){
        frm.txtTelefono.parentNode.classList.add("has-error");
		frm.txtTelefono.focus();
		error= "El teléfono no es correcto";
		falloValidacion(error, frm.txtTelefono);
		bValido= false;
	} else{
		frm.txtTelefono.parentNode.classList.remove("has-error");
		falloValidacion("", frm.txtTelefono);
    }

    //mensaje
    var  mensajePregunta= frm.txtDescripcion.value.trim();
    frm.txtDescripcion.value= frm.txtDescripcion.value.trim();
    
    if(!oExpRegDescripcion.test(mensajePregunta)){
        frm.txtDescripcion.parentNode.classList.add("has-error");
		frm.txtDescripcion.focus();
		error= "Debe comprender entre 5 y 350 caracteres";
		falloValidacion(error, frm.txtDescripcion);
		bValido= false;
	} else{
		frm.txtDescripcion.parentNode.classList.remove("has-error");
		falloValidacion("", frm.txtDescripcion);
    }

    return bValido;
}