function actualizarCalendar(oEvento){
    var oE = oEvento || windows.event;
    var oForm = document.getElementById("frmCambiarCalendar");

    var enlaceCalendar= oForm.txtEnlaceCalendar.value.trim();

    $.post("../Model/modificarCuentas.php", "plataforma=calendar&enlace="+enlaceCalendar, respuestaEnlaceCalendar, "json");
}

function respuestaEnlaceCalendar(oDatosDevuelto, sStatus, oAjax) {
    if (oDatosDevuelto == true) {
        alert("Calendario actualizado");
        document.frmCambiarCalendar.reset();
    } else {
        alert("Problemas al modificar enlace");
    }
}

function actualizarTwitter(oEvento){
    var oE = oEvento || windows.event;
    var oForm = document.getElementById("frmCambiarTwitter");

    var enlaceTwitter= oForm.txtEnlaceTwitter.value.trim();

    $.post("../Model/modificarCuentas.php", "plataforma=twitter&enlace="+enlaceTwitter, respuestaEnlaceTwitter, "json");
}

function respuestaEnlaceTwitter(oDatosDevuelto, sStatus, oAjax) {
    if (oDatosDevuelto == true) {
        alert("Twitter actualizado");
        document.frmCambiarTwitter.reset();
    } else {
        alert("Problemas al modificar enlace");
    }
}