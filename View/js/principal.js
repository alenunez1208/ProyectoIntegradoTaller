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
$("#presupuestosYPreguntas").click(cargarFrmPreguntas());

function mostrarFormularios(sForm) {
    $("#formulario form:not('#" + sForm + "')").hide("normal");
    $("#formulario").show("normal");
}

function cargarFrmPreguntas(){
    mostrarFormularios("frmPreguntasMostrar");
    
    if ($('#frmPreguntasMostrar').length == 0) {
        $('#formulario').load("formularios/frmPreguntas.html", function()
        {
            if(bFormularioPreguntasCargado){
                var btnEnviarPregunta= document.getElementById("btnEnviarPregunta");
                btnEnviarPregunta.addEventListener("click", enviarPregunta, false);
            } else{
                $.getScript("js/clases/Pregunta.js");
                $.getScript("js/gestionPregunta.js", function(){
                    var btnEnviarPregunta= document.getElementById("btnEnviarPregunta");
                    btnEnviarPregunta.addEventListener("click", enviarPregunta, false);
                });
            }
        });
    } else {
        $('#formulario').show("normal");
    }
}
