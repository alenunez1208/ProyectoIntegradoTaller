var oCapaList = document.getElementById("listadoCitasHoy");
var oCapaList2 = document.getElementById("listadoCitasHoyNoUser");
var dateobj = new Date();
function pad(n) {return n < 10 ? "0"+n : n;}

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
    $('#txtFechaFiltrar').datepicker();
});

function listadoDeCitasDeHoy() {
    $('#txtFechaFiltrar').val(pad(dateobj.getDate())+"/"+pad(dateobj.getMonth()+1)+"/"+dateobj.getFullYear());

    // Instanciar objeto Ajax
    var oAjax = instanciarXHR();

    //1. Preparar parametros
    var result = pad(dateobj.getDate())+"/"+pad(dateobj.getMonth()+1)+"/"+dateobj.getFullYear();
    var datos= "datos="+result;
    //2. Configurar la llamada --> Asincrono por defecto
    oAjax.open("POST","../Model/listarCitasHoy.php");

    //3. Asociar manejador de evento de la respuesta
    oAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    oAjax.addEventListener("readystatechange", respuestaListadoCitasHoy, false);

    //4. Hacer la llamada
    oAjax.send(datos);
}

function listadoDeCitasDeHoyNoUser() {
    // Instanciar objeto Ajax
    var oAjax = instanciarXHR();

    //1. Preparar parametros
    var result = pad(dateobj.getDate())+"/"+pad(dateobj.getMonth()+1)+"/"+dateobj.getFullYear();
    var datos= "datos="+result;
    //2. Configurar la llamada --> Asincrono por defecto
    oAjax.open("POST","../Model/listarCitasNoUser.php");

    //3. Asociar manejador de evento de la respuesta
    oAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    oAjax.addEventListener("readystatechange", respuestaListadoCitasHoyNoUser, false);

    //4. Hacer la llamada
    oAjax.send(datos);
}

function filtrarPorFecha(oEvento){
    var oE= oEvento || windows.event;
    var oForm= document.getElementById("frmFiltroFechas");

    if(validarFiltroFecha(oForm)){
        var fecha= oForm.txtFechaFiltrar.value.trim();

        // Instanciar objeto Ajax
        var oAjax = instanciarXHR();
    
        //1. Preparar parametros
        var datos= "datos="+fecha;
        //2. Configurar la llamada --> Asincrono por defecto
        oAjax.open("POST","../Model/listarCitasHoy.php");
    
        //3. Asociar manejador de evento de la respuesta
        oAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        oAjax.addEventListener("readystatechange", respuestaListadoCitasHoy, false);
    
        //4. Hacer la llamada
        oAjax.send(datos);
    
        // Instanciar objeto Ajax
        var oAjax2 = instanciarXHR();
    
        //1. Preparar parametros
        var datos2= "datos="+fecha;
        //2. Configurar la llamada --> Asincrono por defecto
        oAjax2.open("POST","../Model/listarCitasNoUser.php");
    
        //3. Asociar manejador de evento de la respuesta
        oAjax2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        oAjax2.addEventListener("readystatechange", respuestaListadoCitasHoyNoUser, false);
    
        //4. Hacer la llamada
        oAjax2.send(datos2);
    }
}

function respuestaListadoCitasHoy(){
    var oAjax = this;

	// 5. Proceso la respuesta cuando llega
	if (oAjax.readyState == 4 && oAjax.status == 200) {
        var sDatos = oAjax.responseText;

        var oFilas = JSON.parse(sDatos);

        var listaEliminar = document.querySelector(".listaDeCitasDeHoy");
		if (listaEliminar != null)
            listaEliminar.remove();

        var oLista;

        oLista= document.createElement("ul");
        oLista.classList.add("listaDeCitasDeHoy");

        for(var i=0;i<oFilas.length;i++){
            oFila= document.createElement("LI");
            oTexto= document.createTextNode(oFilas[i].nombre+", "+oFilas[i].apellidos+": "+oFilas[i].hora+" "+oFilas[i].asunto);
            oFila.appendChild(oTexto);
            oLista.appendChild(oFila);
        }
        
		oCapaList.appendChild(oLista);
    }
}

function respuestaListadoCitasHoyNoUser(){
    var oAjax = this;

	// 5. Proceso la respuesta cuando llega
	if (oAjax.readyState == 4 && oAjax.status == 200) {
        var sDatos = oAjax.responseText;

        var oFilas = JSON.parse(sDatos);

        var listaEliminar = document.querySelector(".listaDeCitasDeHoyNoUser");
		if (listaEliminar != null)
            listaEliminar.remove();

        var oLista;

        oLista= document.createElement("ul");
        oLista.classList.add("listaDeCitasDeHoyNoUser");

        for(var i=0;i<oFilas.length;i++){
            oFila= document.createElement("LI");
            oTexto= document.createTextNode(oFilas[i].email+": "+oFilas[i].hora+" "+oFilas[i].asunto);
            oFila.appendChild(oTexto);
            oLista.appendChild(oFila);
        }
        
		oCapaList2.appendChild(oLista);
    }
}

function validarFiltroFecha(frm){
    var bValido= true;
    var error= "";

    //fecha
    var  fechaFiltroValidar= frm.txtFechaFiltrar.value.trim();
    frm.txtFechaFiltrar.value= frm.txtFechaFiltrar.value.trim();
    
    if(!oExpRegFecha.test(fechaFiltroValidar)){
        frm.txtFechaFiltrar.parentNode.classList.add("has-error");
		frm.txtFechaFiltrar.focus();
		error= "Formato incorrecto dd/mm/aaaa";
		falloValidacion(error, frm.txtFechaFiltrar);
		bValido= false;
	} else{
		frm.txtFechaFiltrar.parentNode.classList.remove("has-error");
		falloValidacion("", frm.txtFechaFiltrar);
    }

    return bValido;
}