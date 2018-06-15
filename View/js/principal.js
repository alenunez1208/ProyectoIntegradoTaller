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
var bFormularioPreguntasCargado = false;
$("#inicio").click(cargarFrmIndex);
$("#localizacion").click(cargarFrmLocalizacion);
$("#presupuestosYPreguntas").click(function () {
    var usuario = "no";
    cargarFrmPreguntas(usuario);
});

function mostrarFormularios(sForm, sForm2, listado) {
    $("#" + sForm2 + " >div:not('." + sForm + "')").hide();

    if (listado) {
        $("#TodosLosListados").show("normal");
    } else {
        $("#TodosLosListados").hide();
    }
}

function cargarFrmIndex() {
    mostrarFormularios("frmIndex", "formulario");

    if ($('#frmIndex').length == 0) {
        $("<div class='frmIndex'>").appendTo('#formulario').load("../View/formularios/frmIndex.html");
    } else {
        $('.frmIndex').css("display", "block");
    }
}

function cargarFrmLocalizacion() {
    mostrarFormularios("frmLocalizacion", "formulario", false);

    if ($('#frmLocalizacion').length == 0) {
        $("<div class='frmLocalizacion'>").appendTo('#formulario').load("../View/formularios/frmLocalizacion.html");
    } else {
        $('.frmLocalizacion').css("display", "block");
    }
}

function cargarFrmPreguntas(usuario) {
    mostrarFormularios("frmPreguntasMostrar", "formulario", false);

    if ($('#frmPreguntasMostrar').length == 0) {
        $("<div class='frmPreguntasMostrar'>").appendTo('#formulario').load("../View/formularios/frmPreguntas.html", function () {
            if (bFormularioPreguntasCargado) {
                var btnEnviarPregunta = document.getElementById("btnEnviarPregunta");
                btnEnviarPregunta.addEventListener("click", enviarPregunta, false);
                if (usuario == "si") {
                    $("#txtEmail").attr("readonly", true);
                    $("#txtTelefono").attr("readonly", true);+
                    rellenaCamposUsuario();
                }
            } else {
                bFormularioPreguntasCargado = true;
                $.getScript("../View/js/clases/Pregunta.js");
                $.getScript("../View/js/gestiones/gestionPregunta.js", function () {
                    var btnEnviarPregunta = document.getElementById("btnEnviarPregunta");
                    btnEnviarPregunta.addEventListener("click", enviarPregunta, false);
                    if (usuario == "si") {
                        $("#txtEmail").attr("readonly", true);
                        $("#txtTelefono").attr("readonly", true);
                        rellenaCamposUsuario();
                    }
                });
            }
        });
    } else {
        $('.frmPreguntasMostrar').css("display", "block");
        rellenaCamposUsuario();
    }
}

/*----------------------------------------------------------------*/
/*-------------------------PANEL USUARIO--------------------------*/
$("#enlaceCerrarSesion").click(function () {
    $("#cerrarSesion").submit();
});
$("#presupuestosYPreguntasUsuario").click(function () {
    usuario = "si";
    cargarFrmPreguntas(usuario);
});
$("#solicitudDeCitas").click(cargarFrmSolicitudDeCitas);
$("#enlaceEditarUsuario").click(function(){
    var usuario= "usuario";
    cargarFrmEditarUsuario(usuario);
});

function cargarFrmSolicitudDeCitas() {
    mostrarFormularios("frmSolicitudDeCitasMostrar", "formulario", false);

    if ($('#frmSolicitudDeCitasMostrar').length == 0) {
        $("<div class='frmSolicitudDeCitasMostrar'>").appendTo('#formulario').load("../View/formularios/frmSolicitudDeCitas.html", function(){
            $.getScript("../View/js/clases/Cita.js");
            $.getScript("../View/js/gestiones/gestionPedirCita.js",function(){
                var btnEnviarSolicitud = document.getElementById("btnEnviarSolicitud");
                btnEnviarSolicitud.addEventListener("click", solicitarUnaCita, false);
            });
        });
    } else {
        $('.frmSolicitudDeCitasMostrar').css("display", "block");
    }
}

function cargarFrmEditarUsuario(tipo){
    if(tipo=="usuario"){
        mostrarFormularios("frmEditarUsuarioMostrar", "formulario", false);

        if ($('#frmEditarUsuarioMostrar').length == 0) {
            $("<div class='frmEditarUsuarioMostrar'>").appendTo('#formulario').load("../View/formularios/frmEditarUsuario.html", function () {
                $.getScript("../View/js/clases/Usuario.js");
                $.getScript("../View/js/gestiones/gestionEditarUsuario.js", function () {
                    rellenarCamposEditarUsuario();
                    var btnEditarUsuario = document.getElementById("btnEditarUsuario");
                    btnEditarUsuario.addEventListener("click", modificarDatosPersonales, false);
                });
            });
        } else {
            $('.frmEditarUsuarioMostrar').css("display", "block");
            rellenarCamposEditarUsuario();
        }
    } else{
        mostrarFormularios("frmEditarUsuarioMostrar", "formularioAdmin", false);

        if ($('#frmEditarUsuarioMostrar').length == 0) {
            $("<div class='frmEditarUsuarioMostrar'>").appendTo('#formularioAdmin').load("../View/formularios/frmEditarUsuario.html", function () {
                $.getScript("../View/js/gestiones/gestionEditarUsuario.js", function () {
                    contadorDeCitasPendientes();
                    rellenarCamposEditarUsuario();
                    var btnEditarUsuario = document.getElementById("btnEditarUsuario");
                    btnEditarUsuario.addEventListener("click", modificarDatosPersonales, false);
                });
            });
        } else {
            $('.frmEditarUsuarioMostrar').css("display", "block");
            contadorDeCitasPendientes();
            rellenarCamposEditarUsuario();
        }
    }
}


/*----------------------------------------------------------------*/

/*----------------------PANEL ADMINISTRADOR-----------------------*/
cargarFrmIndexAdmin();
var bFrmAltaUsuarioCargado = false;
$("#inicioAdmin").click(cargarFrmIndexAdmin)
$("#altaUsuarios").click(cargarFrmAltaUsuario);
$("#solicitudCitas").click(cargarFrmSolicitudes);
$("#listadoTodosUsuarios").click(cargarFrmListadoUsuarios);
$("#listarTodasCitas").click(cargarFrmListadoCitas);
$("#enlaceEditarUsuarioAdm").click(function(){
    var admin= "admin";
    cargarFrmEditarUsuario(admin);
});
$("#altaCitasFisicas").click(cargarFrmAltaCitasFisicas);
$("#enlaceAdmCuentas").click(cargarFrmAdmCuentas);

function cargarFrmIndexAdmin() {
    mostrarFormularios("frmIndexAdminMostrar", "formularioAdmin", false);

    if ($('#frmIndexAdminMostrar').length == 0) {
        $("<div class='frmIndexAdminMostrar'>").appendTo('#formularioAdmin').load("../View/formularios/frmIndexAdmin.html", function () {
            $.getScript("../View/js/clases/Usuario.js");
            $.getScript("../View/js/gestiones/gestionListarCitasHoy.js", function () {
                var btnFiltrarFechas = document.getElementById("btnFiltrarFecha");
                btnFiltrarFechas.addEventListener("click", filtrarPorFecha, false);
                listadoDeCitasDeHoy();
                contadorDeCitasPendientes();
            });
        });
    } else {
        $('.frmIndexAdminMostrar').css("display", "block");
        listadoDeCitasDeHoy();
        contadorDeCitasPendientes();
    }
}

function cargarFrmAltaUsuario() {
    mostrarFormularios("frmAltaUsuarioMostrar", "formularioAdmin", false);

    if ($('#frmAltaUsuarioMostrar').length == 0) {
        $("<div class='frmAltaUsuarioMostrar'>").appendTo('#formularioAdmin').load("../View/formularios/frmAltaUsuario.html", function () {
            if (bFrmAltaUsuarioCargado) {
                var btnAltaUsuario = document.getElementById("btnAltaUsuario");
                btnAltaUsuario.addEventListener("click", altaUsuario, false);
                contadorDeCitasPendientes();
            } else {
                bFrmAltaUsuarioCargado = true;
                $.getScript("../View/js/gestiones/gestionUsuario.js", function () {
                    var btnAltaUsuario = document.getElementById("btnAltaUsuario");
                    btnAltaUsuario.addEventListener("click", altaUsuario, false);
                    contadorDeCitasPendientes();
                });
            }
        });
    } else {
        $('.frmAltaUsuarioMostrar').css("display", "block");
        contadorDeCitasPendientes();
    }
}

function cargarFrmSolicitudes() {
    mostrarFormularios("frmSolicituesPendientesMostrar", "formularioAdmin", true);

    if ($('#frmSolicituesPendientesMostrar').length == 0) {
        $("<div class='frmSolicituesPendientesMostrar'>").appendTo('#formularioAdmin').load("../View/formularios/frmSolicitudesPendientes.html");
        $.getScript("../View/js/gestiones/gestionListarSolicitudes.js", function () {
            listadoSolicituesPendientes();
            contadorDeCitasPendientes();
        });
    } else {
        $('.frmSolicituesPendientesMostrar').css("display", "block");
        listadoSolicituesPendientes();
        contadorDeCitasPendientes();
    }
}

function cargarFrmListadoUsuarios() {
    mostrarFormularios("frmListadoUsuariosMostrar", "formularioAdmin", true);
    
    if ($('#frmListadoUsuariosMostrar').length == 0) {
        $("<div class='frmListadoUsuariosMostrar'>").appendTo('#formularioAdmin').load("../View/formularios/frmListadoUsuarios.html");
        $.getScript("../View/js/gestiones/gestionListarUsuarios.js", function () {
            listadoUsuarios();
            contadorDeCitasPendientes();
        });
    } else {
        $('.frmListadoUsuariosMostrar').css("display", "block");
        listadoUsuarios();
        contadorDeCitasPendientes();
    }
}

function cargarFrmListadoCitas() {
    mostrarFormularios("frmListadoCitasMostrar", "formularioAdmin", true);

    if ($('#frmListadoCitasMostrar').length == 0) {
        $("<div class='frmListadoCitasMostrar'>").appendTo('#formularioAdmin').load("../View/formularios/frmListadoCitas.html");
        $.getScript("../View/js/gestiones/gestionListarCitas.js", function () {
            listadoCitasTotales();
            contadorDeCitasPendientes();
        });
    } else {
        $('.frmListadoCitasMostrar').css("display", "block");
        listadoCitasTotales();
        contadorDeCitasPendientes();
    }
}

function cargarFrmAltaCitasFisicas(){
    mostrarFormularios("frmAltaCitaFisicaMostrar", "formularioAdmin", false);

    if ($('#frmAltaCitaFisicaMostrar').length == 0) {
        $("<div class='frmAltaCitaFisicaMostrar'>").appendTo('#formularioAdmin').load("../View/formularios/frmAltaCitaFisica.html");
        $.getScript("../View/js/clases/CitaFisica.js");
        $.getScript("../View/js/gestiones/gestionAltaCitaFisica.js", function () {
            var btnAltaCitaFisica = document.getElementById("btnAltaCitaFisica");
            btnAltaCitaFisica.addEventListener("click", altaCitaFisicaTaller, false);
            contadorDeCitasPendientes();
        });
    } else {
        $('.frmAltaCitaFisicaMostrar').css("display", "block");
        contadorDeCitasPendientes();
    }
}

function cargarFrmAdmCuentas(){
    mostrarFormularios("frmConfigurarCuentasMostrar", "formularioAdmin", false);

    if ($('#frmConfigurarCuentasMostrar').length == 0) {
        $("<div class='frmConfigurarCuentasMostrar'>").appendTo('#formularioAdmin').load("../View/formularios/frmConfigurarCuentas.html");
        $.getScript("../View/js/gestiones/gestionConfigurarCuentas.js", function () {
            contadorDeCitasPendientes();
        });
    } else {
        $('.frmConfigurarCuentasMostrar').css("display", "block");
        contadorDeCitasPendientes();
    }
}

var oCapa= document.getElementById("anadirContador");
function contadorDeCitasPendientes(){
	$.get("../Model/contadorCitasPendientes.php", function (sDatosDevuelto, sStatus, oAjax) {
		if (sStatus == "success") {
            mostrar= document.querySelector(".contadorCitasPendientes");
            if (mostrar != null)
                mostrar.remove();
                
            var span= document.createElement("span");
            span.classList.add("contadorCitasPendientes");
            span.append(sDatosDevuelto);
            oCapa.appendChild(span);
		}
	}, "text");
}
/*----------------------------------------------------------------*/
