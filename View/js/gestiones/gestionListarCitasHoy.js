var oCapaList = document.getElementById("listadoCitasHoy");
var dateobj = new Date();
function pad(n) {return n < 10 ? "0"+n : n;}

function listadoDeCitasDeHoy() {
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