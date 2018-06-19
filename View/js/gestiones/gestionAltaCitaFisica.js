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

    if(validarCitaFisica(oForm)){
        var email = oForm.txtEmailFisico.value.trim();
        var asunto = oForm.txtAsuntoCitaFisico.value.trim();
        var fecha = oForm.txtFechaFisico.value.trim();
        var hora = oForm.comboHoras.options[comboHoras.selectedIndex].value.trim();
        var descripcion = oForm.txtMotivoCitaFisica.value.trim();
    
        var oCita = new CitaFisica(email, asunto, fecha, hora, descripcion);
        var datos = "datos=" + JSON.stringify(oCita);
    
        $.post("../Model/altaCitaFisica.php", datos, respuestaAltaCitaFisica, "json");
    }
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

function validarCitaFisica(frm){
    var bValido= true;
    var error= "";

    //email
    var  emailCitaFisica= frm.txtEmailFisico.value.trim();
    frm.txtEmailFisico.value= frm.txtEmailFisico.value.trim();
    
    if(!oExpRegCorreo.test(emailCitaFisica)){
        frm.txtEmailFisico.parentNode.classList.add("has-error");
		frm.txtEmailFisico.focus();
		error= "Formato de email incorrecto";
		falloValidacion(error, frm.txtEmailFisico);
		bValido= false;
	} else{
		frm.txtEmailFisico.parentNode.classList.remove("has-error");
		falloValidacion("", frm.txtEmailFisico);
    }

    //asunto
    var asuntoCitaFisica= frm.txtAsuntoCitaFisico.value.trim();
    frm.txtAsuntoCitaFisico.value= frm.txtAsuntoCitaFisico.value.trim();
    
    if(!oExpRegTitulo.test(asuntoCitaFisica)){
        frm.txtAsuntoCitaFisico.parentNode.classList.add("has-error");
		frm.txtAsuntoCitaFisico.focus();
		error= "Debe comprender entre 3 y 25 caracteres";
		falloValidacion(error, frm.txtAsuntoCitaFisico);
		bValido= false;
	} else{
		frm.txtAsuntoCitaFisico.parentNode.classList.remove("has-error");
		falloValidacion("", frm.txtAsuntoCitaFisico);
    }

    //fecha
    var fechaCitaFisica= frm.txtFechaFisico.value.trim();
    frm.txtFechaFisico.value= frm.txtFechaFisico.value.trim();
    
    if(!oExpRegFecha.test(fechaCitaFisica)){
        frm.txtFechaFisico.parentNode.classList.add("has-error");
		frm.txtFechaFisico.focus();
		error= "Formato incorrecto dd/mm/aaaa";
		falloValidacion(error, frm.txtFechaFisico);
		bValido= false;
	} else{
		frm.txtFechaFisico.parentNode.classList.remove("has-error");
		falloValidacion("", frm.txtFechaFisico);
    }

    //descripcion
    var descripcionCitaFisica= frm.txtMotivoCitaFisica.value.trim();
    frm.txtMotivoCitaFisica.value= frm.txtMotivoCitaFisica.value.trim();
    
    if(!oExpRegDescripcion.test(descripcionCitaFisica)){
        frm.txtMotivoCitaFisica.parentNode.classList.add("has-error");
		frm.txtMotivoCitaFisica.focus();
		error= "Debe comprender entre 5 y 350 caracteres";
		falloValidacion(error, frm.txtMotivoCitaFisica);
		bValido= false;
	} else{
		frm.txtMotivoCitaFisica.parentNode.classList.remove("has-error");
		falloValidacion("", frm.txtMotivoCitaFisica);
    }

    return bValido;
}