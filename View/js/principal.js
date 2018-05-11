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

var bFormularioPreguntasCargado= false;
$("#inicio").click(cargarFrmIndex);
$("#localizacion").click(cargarFrmLocalizacion);
$("#presupuestosYPreguntas").click(cargarFrmPreguntas);

function mostrarFormularios(sForm) {
    $("#formulario>div:not('."+sForm+"')").hide();	
}

function cargarFrmPreguntas(){
    mostrarFormularios("frmPreguntasMostrar");
    
    if ($('#frmPreguntasMostrar').length == 0) {
        $("<div class='frmPreguntasMostrar'>").appendTo('#formulario').load("../View/formularios/frmPreguntas.html", function()
        {
            if(bFormularioPreguntasCargado){
                var btnEnviarPregunta= document.getElementById("btnEnviarPregunta");
                btnEnviarPregunta.addEventListener("click", enviarPregunta, false);
            } else{
				bFormularioPreguntasCargado= true;
                $.getScript("../View/js/clases/Pregunta.js");
                $.getScript("../View/js/gestionPregunta.js", function(){
                    var btnEnviarPregunta= document.getElementById("btnEnviarPregunta");
                    btnEnviarPregunta.addEventListener("click", enviarPregunta, false);
                });
            }
        });
    } else {
        $('.frmPreguntasMostrar').css("display","block");
    }
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

console.log(document.getElementById("enlaceCerrarSesion"));
$("#enlaceCerrarSesion").click(function(){
	console.log("entro");
	$("#cerrarSesion").submit();
});
