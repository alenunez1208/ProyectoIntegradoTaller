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

function mostrarFormularios(sForm) {
    $("#formulario>div:not('."+sForm+"')").hide();	
}

function cargarFrmIndex(){
    mostrarFormularios("frmIndex");
    
    if ($('#frmIndex').length == 0) {
        $("<div class='frmIndex'>").appendTo('#formulario').load("../View/formularios/frmIndex.html");
    } else {
        $('.frmIndex').css("display","block");
    }
}

function cargarFrmLocalizacion(){
    mostrarFormularios("frmLocalizacion");
    
    if ($('#frmLocalizacion').length == 0) {
        $("<div class='frmLocalizacion'>").appendTo('#formulario').load("../View/formularios/frmLocalizacion.html");
    } else {
        $('.frmLocalizacion').css("display","block");
    }
}

function cargarFrmPreguntas(usuario){
    mostrarFormularios("frmPreguntasMostrar");
    
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


/*----------------------------------------------------------------*/

