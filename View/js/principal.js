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
    $("#formulario div:not('#"+sForm+"')").hide("normal");
    $("#formulario #form").show("normal");
}

function cargarFrmPreguntas(){
    mostrarFormularios("frmPreguntasMostrar");
    
    if ($('#frmPreguntasMostrar').length == 0) {
        $("<div id='form'>").appendTo('#formulario').load("../View/formularios/frmPreguntas.html", function()
        {
            if(bFormularioPreguntasCargado){
                var btnEnviarPregunta= document.getElementById("btnEnviarPregunta");
                btnEnviarPregunta.addEventListener("click", enviarPregunta, false);
            } else{
                $.getScript("../View/js/clases/Pregunta.js");
                $.getScript("../View/js/gestionPregunta.js", function(){
                    var btnEnviarPregunta= document.getElementById("btnEnviarPregunta");
                    btnEnviarPregunta.addEventListener("click", enviarPregunta, false);
                });
            }
        });
    } else {
        $('#frmPreguntasMostrar').show("normal");
    }
}

function cargarFrmIndex(){
    mostrarFormularios("frmIndex");
    
    if ($('#frmIndex').length == 0) {
        $("<div id='form>").appendTo('#formulario').load("../View/formularios/frmIndex.html");
    } else {
        $('#frmIndex').show("normal");
    }
}

function cargarFrmLocalizacion(){
    mostrarFormularios("frmLocalizacion");
    
    if ($('#frmLocalizacion').length == 0) {
        $("<div id='form>").appendTo('#formulario').load("../View/formularios/frmLocalizacion.html");
    } else {
        $('#frmLocalizacion').show("normal");
    }
}
