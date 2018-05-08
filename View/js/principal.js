/*-----------------------CARGAR FRM LOGIN-------------------------*/
$("#myBtn").click(function () {
    if ($("#myModal").length == 0) {
        $('#formLogin').load("formularios/login.html", function () {
            $("#myModal").modal();
        });
    } else {
        $('#myModal').show("normal");
    }

});

$("#myBtnOther").click(function () {
    if ($("#myModal").length == 0) {
        $('#formLogin').load("formularios/login.html", function () {
            $("#myModal").modal();
        });
    } else {
        $('#myModal').show("normal");
    }

});
/*----------------------------------------------------------------*/

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
            
        });
    } else {
        $('#formulario').show("normal");
    }
}