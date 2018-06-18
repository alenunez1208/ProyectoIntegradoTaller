$.datepicker.regional['es'] = {
    closeText: 'Cerrar',
    prevText: '< Ant',
    nextText: 'Sig >',
    currentText: 'Hoy',
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
    dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
    weekHeader: 'Sm',
    dateFormat: 'dd/mm/yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
};

$.datepicker.setDefaults($.datepicker.regional['es']);

$(function () {
    $('#txtFechaFisico').datepicker()
        .on("input change", function (e) {
            cargarComboHoras(e.target.value);
        });
});

var oComboHoras = document.getElementById("comboHoras");

function cargarComboHoras(dFecha) {
    $.get("../Model/cargarComboHoras.php", "fecha=" + dFecha, function (sDatosDevuelto, sStatus, oAjax) {
        if (sStatus == "success") {
            var oFilas = JSON.parse(sDatosDevuelto);
            oCombo = document.getElementById("comboHoras");
            oCombo.innerHTML = "";

            for (var i = 0; i < oFilas.length; i++) {
                var selectOp = document.createElement("option");
                selectOp.value = oFilas[i].hora;
                selectOp.textContent = oFilas[i].hora;
                oComboHoras.add(selectOp);
            }
        }
    }, "text");
}

function altaCitaFisicaTaller(oEvento) {
    var oE = oEvento || windows.event;
    var oForm = document.getElementById("frmAltaCitaFisica");

    var email = oForm.txtEmailFisico.value.trim();
    var asunto = oForm.txtAsuntoCitaFisico.value.trim();
    var fecha = oForm.txtFechaFisico.value.trim();
    var hora = oForm.comboHoras.options[comboHoras.selectedIndex].value.trim();
    var descripcion = oForm.txtMotivoCitaFisica.value.trim();

    var oCita = new CitaFisica(email, asunto, fecha, hora, descripcion);
    var datos = "datos=" + JSON.stringify(oCita);

    $.post("../Model/altaCitaFisica.php", datos, respuestaAltaCitaFisica, "json");
}

function respuestaAltaCitaFisica(oDatosDevuelto, sStatus, oAjax) {
    if (oDatosDevuelto == true) {
        alert("Cita guardada");
        document.frmAltaCitaFisica.reset();
        oCombo = document.getElementById("comboHoras");
        oCombo.innerHTML = "";
        var selectOp = document.createElement("option");
        selectOp.textContent = "Seleccione una hora..";
        oComboHoras.add(selectOp);
    } else {
        alert("Problemas al guardar la cita");
    }
}

function cargarCalendar2() {
    // Instanciar objeto Ajax
    var oAjax = instanciarXHR();

    //2. Configurar la llamada --> Asincrono por defecto
    oAjax.open("GET", "../Model/cargarCalendar.php");

    //3. Asociar manejador de evento de la respuesta
    oAjax.addEventListener("readystatechange", function () {
        var oAjax = this;

        // 5. Proceso la respuesta cuando llega
        if (oAjax.readyState == 4 && oAjax.status == 200) {

            var sDatos = oAjax.responseText;

            var oFilas = JSON.parse(sDatos);
            console.log(oFilas.calendar);
            var conCalendar= document.getElementById("calendar2");
            var divCalendar = document.querySelector("#calendar2 iframe");

            if (divCalendar != null)
                divCalendar.remove();

                console.log(oFilas.calendar);
            conCalendar.innerHTML= oFilas.calendar;
            divCalendar = document.querySelector("#calendar2 iframe");
            divCalendar.classList.add("calendar2");
        }
    }, false);

    //4. Hacer la llamada
    oAjax.send();
}