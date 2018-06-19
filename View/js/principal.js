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
        //cargarTwitter();
    } else {
        $('.frmIndex').css("display", "block");
        //cargarTwitter();
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
                    $("#txtTelefono").attr("readonly", true); +
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
$("#enlaceEditarUsuario").click(function () {
    var usuario = "usuario";
    cargarFrmEditarUsuario(usuario);
});

function cargarFrmSolicitudDeCitas() {
    mostrarFormularios("frmSolicitudDeCitasMostrar", "formulario", false);

    if ($('#frmSolicitudDeCitasMostrar').length == 0) {
        $("<div class='frmSolicitudDeCitasMostrar'>").appendTo('#formulario').load("../View/formularios/frmSolicitudDeCitas.html", function () {
            $.getScript("../View/js/clases/Cita.js");
            $.getScript("../View/js/gestiones/gestionPedirCita.js", function () {
                var btnEnviarSolicitud = document.getElementById("btnEnviarSolicitud");
                btnEnviarSolicitud.addEventListener("click", solicitarUnaCita, false);
                cargarCalendar1();
            });
        });
    } else {
        $('.frmSolicitudDeCitasMostrar').css("display", "block");
        cargarCalendar1();
    }
}

function cargarFrmEditarUsuario(tipo) {
    if (tipo == "usuario") {
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
            var btnEditarUsuario = document.getElementById("btnEditarUsuario");
            btnEditarUsuario.addEventListener("click", modificarDatosPersonales, false);
        }
    } else {
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
            var btnEditarUsuario = document.getElementById("btnEditarUsuario");
            btnEditarUsuario.addEventListener("click", modificarDatosPersonales, false);
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
$("#enlaceEditarUsuarioAdm").click(function () {
    var admin = "admin";
    cargarFrmEditarUsuario(admin);
});
$("#altaCitasFisicas").click(cargarFrmAltaCitasFisicas);
$("#enlaceAdmCuentas").click(cargarFrmAdmCuentas);
$("#listarCitasFisicas").click(cargarFrmListadoCitasFisicas);

function cargarFrmIndexAdmin() {
    mostrarFormularios("frmIndexAdminMostrar", "formularioAdmin", false);

    if ($('#frmIndexAdminMostrar').length == 0) {
        $("<div class='frmIndexAdminMostrar'>").appendTo('#formularioAdmin').load("../View/formularios/frmIndexAdmin.html", function () {
            $.getScript("../View/js/clases/Usuario.js");
            $.getScript("../View/js/gestiones/gestionListarCitasHoy.js", function () {
                var btnFiltrarFechas = document.getElementById("btnFiltrarFecha");
                btnFiltrarFechas.addEventListener("click", filtrarPorFecha, false);
                listadoDeCitasDeHoy();
                listadoDeCitasDeHoyNoUser();
                contadorDeCitasPendientes();
            });
        });
    } else {
        $('.frmIndexAdminMostrar').css("display", "block");
        document.frmFiltroFechas.reset();
        var btnFiltrarFechas = document.getElementById("btnFiltrarFecha");
        btnFiltrarFechas.addEventListener("click", filtrarPorFecha, false);
        listadoDeCitasDeHoy();
        listadoDeCitasDeHoyNoUser();
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
        var btnAltaUsuario = document.getElementById("btnAltaUsuario");
        btnAltaUsuario.addEventListener("click", altaUsuario, false);
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
            cargarCalendar1();
        });
    } else {
        $('.frmSolicituesPendientesMostrar').css("display", "block");
        listadoSolicituesPendientes();
        contadorDeCitasPendientes();
        cargarCalendar1();
    }
}

function cargarFrmListadoUsuarios() {
    mostrarFormularios("frmListadoUsuariosMostrar", "formularioAdmin", true);

    if ($('#frmListadoUsuariosMostrar').length == 0) {
        $("<div class='frmListadoUsuariosMostrar'>").appendTo('#formularioAdmin').load("../View/formularios/frmListadoUsuarios.html");
        $.getScript("../View/js/gestiones/gestionListarUsuarios.js", function () {
            var btnFiltroUsuario = document.getElementById("btnFiltrarEmailUsuario");
            btnFiltroUsuario.addEventListener("click", filtroUsuario, false);
            listadoUsuarios();
            contadorDeCitasPendientes();
        });
    } else {
        $('.frmListadoUsuariosMostrar').css("display", "block");
        document.frmFiltroEmailUsuario.reset();
        var btnFiltroCita = document.getElementById("btnFiltrarEmailUsuario");
        btnFiltroCita.addEventListener("click", filtroUsuario, false);
        listadoUsuarios();
        contadorDeCitasPendientes();
    }
}

function cargarFrmListadoCitas() {
    mostrarFormularios("frmListadoCitasMostrar", "formularioAdmin", true);

    if ($('#frmListadoCitasMostrar').length == 0) {
        $("<div class='frmListadoCitasMostrar'>").appendTo('#formularioAdmin').load("../View/formularios/frmListadoCitas.html");
        $.getScript("../View/js/gestiones/gestionListarCitas.js", function () {
            var btnFiltroCita = document.getElementById("btnFiltrarCitasUsuario");
            btnFiltroCita.addEventListener("click", filtroCitas, false);
            listadoCitasTotales();
            contadorDeCitasPendientes();
        });
    } else {
        $('.frmListadoCitasMostrar').css("display", "block");
        document.frmFiltroCitasUsuarios.reset();
        var btnFiltroCita = document.getElementById("btnFiltrarCitasUsuario");
        btnFiltroCita.addEventListener("click", filtroCitas, false);
        listadoCitasTotales();
        contadorDeCitasPendientes();
    }
}

function cargarFrmAltaCitasFisicas() {
    mostrarFormularios("frmAltaCitaFisicaMostrar", "formularioAdmin", false);

    if ($('#frmAltaCitaFisicaMostrar').length == 0) {
        $("<div class='frmAltaCitaFisicaMostrar'>").appendTo('#formularioAdmin').load("../View/formularios/frmAltaCitaFisica.html");
        $.getScript("../View/js/clases/CitaFisica.js");
        $.getScript("../View/js/gestiones/gestionAltaCitaFisica.js", function () {
            var btnAltaCitaFisica = document.getElementById("btnAltaCitaFisica");
            btnAltaCitaFisica.addEventListener("click", altaCitaFisicaTaller, false);
            contadorDeCitasPendientes();
            cargarCalendar2();
        });
    } else {
        $('.frmAltaCitaFisicaMostrar').css("display", "block");
        var btnAltaCitaFisica = document.getElementById("btnAltaCitaFisica");
        btnAltaCitaFisica.addEventListener("click", altaCitaFisicaTaller, false);
        contadorDeCitasPendientes();
        cargarCalendar2();
    }
}

function cargarFrmListadoCitasFisicas() {
    mostrarFormularios("frmListadoCitasFisicasMostrar", "formularioAdmin", true);

    if ($('#frmListadoCitasFisicasMostrar').length == 0) {
        $("<div class='frmListadoCitasFisicasMostrar'>").appendTo('#formularioAdmin').load("../View/formularios/frmListadoCitasFisicas.html");
        $.getScript("../View/js/gestiones/gestionListarCitasFisicas.js", function () {
            var btnFiltrarEmailNoUser = document.getElementById("btnFiltrarEmailNoUser");
            btnFiltrarEmailNoUser.addEventListener("click", filtroEmailNoUser, false);
            listadoCitasFisicas();
            contadorDeCitasPendientes();
        });
    } else {
        $('.frmListadoCitasFisicasMostrar').css("display", "block");
        var btnFiltrarEmailNoUser = document.getElementById("btnFiltrarEmailNoUser");
        btnFiltrarEmailNoUser.addEventListener("click", filtroEmailNoUser, false);
        document.frmFiltroEmailNoUser.reset();
        listadoCitasFisicas();
        contadorDeCitasPendientes();
    }
}

function cargarFrmAdmCuentas() {
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

var oCapa = document.getElementById("anadirContador");
function contadorDeCitasPendientes() {
    $.get("../Model/contadorCitasPendientes.php", function (sDatosDevuelto, sStatus, oAjax) {
        if (sStatus == "success") {
            mostrar = document.querySelector(".contadorCitasPendientes");
            if (mostrar != null)
                mostrar.remove();

            var span = document.createElement("span");
            span.classList.add("contadorCitasPendientes");
            span.append(sDatosDevuelto);
            oCapa.appendChild(span);
        }
    }, "text");
}
/*----------------------------------------------------------------*/
/*----------------------EXPRESIONES REGULARES---------------------*/
function falloValidacion(sTexto, oInput) {
    var oTexto = document.createTextNode(sTexto);
    var oDiv = document.createElement("div");
    oDiv.setAttribute("id", "error");
    oDiv.appendChild(oTexto);
    var oAnterior = oInput.parentNode.querySelector("#error");

    if (oAnterior)
        oAnterior.textContent = sTexto;
    else
        oInput.parentNode.appendChild(oDiv);
}

var oExpRegTitulo = /^[a-z\s]{3,25}$/i; //ENTRE 3 y 25 CARACTERES
var oExpRegNombre = /^[a-z\s]{3,20}$/i; //ENTRE 3 y 20 CARACTERES
var oExpRegApellidos = /^[a-z\s]{3,30}$/i; //ENTRE 3 y 30 CARACTERES
var oExpRegPass = /^[A-Za-z0-9\s]{4,12}$/i; //ENTRE 4 y 12 CARACTERES ALFANUMERICOS
var oExpRegCorreo = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i; //EMAIL CORREO
var oExpRegTelefono = /^(\+34|0034|34)?[6|7|9][0-9]{8}$/; //TELEFONOS ESPAÑOLES
var oExpRegDescripcion = /^[a-z\s\d-]{5,350}$/i; // entre 5 y 350 caracteres con numeros
var oExpRegFecha = /^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/;
/*----------------------------------------------------------------*/
/*function cargarTwitter() {
    // Instanciar objeto Ajax
    var oAjax = instanciarXHR();

    //2. Configurar la llamada --> Asincrono por defecto
    oAjax.open("GET", "../Model/cargarTwitter.php");

    //3. Asociar manejador de evento de la respuesta
    oAjax.addEventListener("readystatechange", function () {
        var oAjax = this;

        // 5. Proceso la respuesta cuando llega
        if (oAjax.readyState == 4 && oAjax.status == 200) {

            var sDatos = oAjax.responseText;

            var oFilas = JSON.parse(sDatos);
            var conTw= document.getElementById("twitterCargar");
            var divTw = document.querySelector("#twitterCargar a");

            if (divTw != null)
            divTw.remove();
				
			conTw.innerHTML= oFilas.calendar;
			divTw = document.querySelector("#twitterCargar a");
        }
    }, false);

    //4. Hacer la llamada
    oAjax.send();
}*/