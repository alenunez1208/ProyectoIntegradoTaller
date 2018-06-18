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
    $('#txtFecha').datepicker()
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

function solicitarUnaCita(oEvento) {
    var oE = oEvento || windows.event;
    var oForm = document.getElementById("frmSolicitaCita");

    var asunto = oForm.txtAsuntoCita.value.trim();
    var fecha = oForm.txtFecha.value.trim();
    var hora = oForm.comboHoras.options[comboHoras.selectedIndex].value.trim();
    var descripcion = oForm.txtMotivoCita.value.trim();
    var idUsu = document.getElementById("txtIdUsuario").value.trim();

    var oCita = new Cita(idUsu, asunto, fecha, hora, descripcion);
    var datos = "datos=" + JSON.stringify(oCita);

    $.post("../Model/pedirCita.php", datos, respuestaPedirCita, "json");
}

function respuestaPedirCita(oDatosDevuelto, sStatus, oAjax) {
    if (oDatosDevuelto == true) {
        alert("Cita Solicitada");
        document.frmSolicitaCita.reset();
        oCombo = document.getElementById("comboHoras");
        oCombo.innerHTML = "";
        var selectOp = document.createElement("option");
        selectOp.textContent = "Seleccione una hora..";
        oComboHoras.add(selectOp);
    } else {
        alert("Problemas al solicitar cita");
    }
}

function cargarCalendar1() {
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
            var conCalendar= document.getElementById("calendar1");
            var divCalendar = document.querySelector("#calendar1 iframe");

            if (divCalendar != null)
				divCalendar.remove();
				
			conCalendar.innerHTML= oFilas.calendar;
			divCalendar = document.querySelector("#calendar1 iframe");
            divCalendar.classList.add("calendar1");
        }
    }, false);

    //4. Hacer la llamada
    oAjax.send();
}