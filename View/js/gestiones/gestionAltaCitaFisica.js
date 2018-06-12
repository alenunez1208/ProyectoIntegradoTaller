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

function cargarComboHoras(dFecha){
    $.get("../Model/cargarComboHoras.php","fecha="+dFecha, function (sDatosDevuelto, sStatus, oAjax) {
        if (sStatus == "success") {
            var oFilas = JSON.parse(sDatosDevuelto);            
            oCombo= document.getElementById("comboHoras");
            oCombo.innerHTML="";
                
            for(var i=0; i<oFilas.length; i++){
                var selectOp= document.createElement("option");
                selectOp.value= oFilas[i].hora;
                selectOp.textContent= oFilas[i].hora;
                oComboHoras.add(selectOp);
            }
        }
    }, "text");
}

function altaCitaFisicaTaller(){
    var oE= oEvento || windows.event;
    var oForm= document.getElementById("frmAltaCitaFisica");

    var email= oForm.txtEmailFisico.value.trim();
    var asunto= oForm.txtAsuntoCitaFisico.value.trim();
    var fecha= oForm.txtFechaFisico.value.trim();
    var hora= oForm.comboHoras.options[comboHoras.selectedIndex].value.trim();
    var descripcion= oForm.txtMotivoCitaFisica.value.trim();
    
    var oCita= new CitaFisica(email,asunto,fecha,hora,descripcion);
    var datos= "datos="+JSON.stringify(oCita);

    $.post("../Model/altaCitaFisica.php",datos,respuestaAltaCitaFisica,"json");
}

function respuestaAltaCitaFisica(oDatosDevuelto, sStatus, oAjax){
    if (oDatosDevuelto == true){
        alert("Cita guardada");
        document.frmAltaCitaFisica.reset();
    } else {
        alert("Problemas al guardar la cita");
    }
}