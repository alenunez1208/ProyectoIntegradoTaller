cargarFrmIndex();
/*-----------------------CARGAR FRM LOGIN-------------------------*/
$("#myBtn").click(function () {
    if ($("#myModal").length == 0) {
        $('#formLogin').load("../View/formularios/login.html", function () {
            $("#myModal").modal();
        });
    } else {
        $('#myModal').show("normal");
    }

});
/*----------------------------------------------------------------*/
/*--------------------------SIN LOGUEO----------------------------*/
var bFormularioPreguntasCargado= false;
$("#inicio").click(cargarFrmIndex);
$("#localizacion").click(cargarFrmLocalizacion);
$("#presupuestosYPreguntas").click(function(){
    var usuario= "no";
    cargarFrmPreguntas(usuario);
});

function mostrarFormularios(sForm,sForm2) {
    $("#"+sForm2+" >div:not('."+sForm+"')").hide();	
}

function cargarFrmIndex(){
    mostrarFormularios("frmIndex","formulario");
    
    if ($('#frmIndex').length == 0) {
        $("<div class='frmIndex'>").appendTo('#formulario').load("../View/formularios/frmIndex.html");
    } else {
        $('.frmIndex').css("display","block");
    }
}

function cargarFrmLocalizacion(){
    mostrarFormularios("frmLocalizacion","formulario");
    
    if ($('#frmLocalizacion').length == 0) {
        $("<div class='frmLocalizacion'>").appendTo('#formulario').load("../View/formularios/frmLocalizacion.html");
    } else {
        $('.frmLocalizacion').css("display","block");
    }
}

function cargarFrmPreguntas(usuario){
    mostrarFormularios("frmPreguntasMostrar","formulario");
    
    if ($('#frmPreguntasMostrar').length == 0) {
        $("<div class='frmPreguntasMostrar'>").appendTo('#formulario').load("../View/formularios/frmPreguntas.html", function()
        {
            if(bFormularioPreguntasCargado){
                var btnEnviarPregunta= document.getElementById("btnEnviarPregunta");
                btnEnviarPregunta.addEventListener("click", enviarPregunta, false);
                if(usuario == "si"){
                    $("#txtEmail").attr("readonly",true);
                    $("#txtTelefono").attr("readonly",true);
                }
            } else{
				bFormularioPreguntasCargado= true;
                $.getScript("../View/js/clases/Pregunta.js");
                $.getScript("../View/js/gestionPregunta.js", function(){
                    var btnEnviarPregunta= document.getElementById("btnEnviarPregunta");
                    btnEnviarPregunta.addEventListener("click", enviarPregunta, false);
                    if(usuario == "si"){
                        $("#txtEmail").attr("readonly",true);
                        $("#txtTelefono").attr("readonly",true);
                    }
                });
            }
        });
    } else {
        $('.frmPreguntasMostrar').css("display","block");
    }
}

/*----------------------------------------------------------------*/
/*-------------------------PANEL USUARIO--------------------------*/
$("#enlaceCerrarSesion").click(function(){
	$("#cerrarSesion").submit();
});

$("#presupuestosYPreguntasUsuario").click(function(){
    usuario= "si";
    cargarFrmPreguntas(usuario);
});

$("#solicitudDeCitas").click(cargarFrmSolicitudDeCitas);

function cargarFrmSolicitudDeCitas(){
    mostrarFormularios("frmSolicitudDeCitasMostrar","formulario");
    
    if ($('#frmSolicitudDeCitasMostrar').length == 0) {
        $("<div class='frmSolicitudDeCitasMostrar'>").appendTo('#formulario').load("../View/formularios/frmSolicitudDeCitas.html");
    } else {
        $('.frmSolicitudDeCitasMostrar').css("display","block");
    }
}
/*----------------------------------------------------------------*/

/*----------------------PANEL ADMINISTRADOR-----------------------*/
cargarFrmIndexAdmin();
$("#inicioAdmin").click(cargarFrmIndexAdmin)
$("#altaUsuarios").click(cargarFrmAltaUsuario);
$("#solicitudCitas").click(cargarFrmSolicitudes);

function cargarFrmIndexAdmin(){
    mostrarFormularios("frmIndexAdminMostrar","formularioAdmin");
    
    if ($('#frmIndexAdminMostrar').length == 0) {
        $("<div class='frmIndexAdminMostrar'>").appendTo('#formularioAdmin').load("../View/formularios/frmIndexAdmin.html");
    } else {
        $('.frmIndexAdminMostrar').css("display","block");
    }
}

function cargarFrmAltaUsuario(){
    mostrarFormularios("frmAltaUsuarioMostrar","formularioAdmin");
    
    if ($('#frmAltaUsuarioMostrar').length == 0) {
        $("<div class='frmAltaUsuarioMostrar'>").appendTo('#formularioAdmin').load("../View/formularios/frmAltaUsuario.html");
    } else {
        $('.frmAltaUsuarioMostrar').css("display","block");
    }
}

function cargarFrmSolicitudes(){
    mostrarFormularios("frmLocalizacion","formularioAdmin");

    if ($('#frmLocalizacion').length == 0) {
        $("<div class='frmLocalizacion'>").appendTo('#formularioAdmin').load("../View/formularios/frmLocalizacion.html");
    } else {
        $('.frmLocalizacion').css("display","block");
    }
}

/*----------------------------------------------------------------*/
