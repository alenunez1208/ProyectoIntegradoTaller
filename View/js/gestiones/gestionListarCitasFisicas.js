var oCapaListado= document.getElementById("TodosLosListados");

function listadoCitasFisicas()
{
	 // Instanciar objeto Ajax
	 var oAjax = instanciarXHR();

	 //1. Preparar parametros
	 //var sDatosEnvio;

	 //2. Configurar la llamada --> Asincrono por defecto
	 oAjax.open("GET", "../Model/listarCitasFisicas.php");

	 //3. Asociar manejador de evento de la respuesta
	 oAjax.addEventListener("readystatechange", respuestaListadoCitasFisicas, false);

	 //4. Hacer la llamada
	 oAjax.send();
	
}

function filtroEmailNoUser(oEvento){
	var oE = oEvento || windows.event;

	var param1= document.getElementById("txtEmailFiltrarNoUser").value.trim();
	var param2= "";

    // Instanciar objeto Ajax
    var oAjax = instanciarXHR();

	//1. Preparar parametros
    var datos= "emailFiltroUsuario="+param1+"&radioEstado="+param2;
    //2. Configurar la llamada --> Asincrono por defecto
    oAjax.open("POST","../Model/filtroCitas.php");

    //3. Asociar manejador de evento de la respuesta
    oAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    oAjax.addEventListener("readystatechange", respuestaListadoCitasFisicas, false);

    //4. Hacer la llamada
    oAjax.send(datos);
}

function respuestaListadoCitasFisicas()
{
	var oAjax = this;
	
	// 5. Proceso la respuesta cuando llega
	if (oAjax.readyState == 4 && oAjax.status == 200) {

		var sDatos=oAjax.responseText;
		
		var oFilas=JSON.parse(sDatos);
		
		var tablaEliminar=document.querySelector("TABLE");
		if(tablaEliminar!=null) //si hay una tabla en el div de listados la quita para reemplazarla
			tablaEliminar.remove();

		var cabeceras=[];
		cabeceras[0]="EMAIL";
		cabeceras[1]="ASUNTO";
		cabeceras[2]="FECHA";
		cabeceras[3]="HORA";
		cabeceras[4]="MOTIVO";
		var oCelda;
		var oTexto;

		var oTabla=document.createElement("TABLE");
		var oFila=oTabla.insertRow();
		oFila.classList.add("thead-dark");
		for ( var i=0;i<5;i++){// crea la cabecera la tabla
			oCelda=document.createElement("TD");
			oTexto=document.createTextNode(cabeceras[i]);
			oCelda.appendChild(oTexto);
			oCelda.classList.add("lead");
			oFila.appendChild(oCelda);
		}

		for ( var i=0;i<oFilas.length;i++){
			
            oFila=oTabla.insertRow(1);
			oCelda=oFila.insertCell();
			oTexto=document.createTextNode(oFilas[i].email);
			oCelda.appendChild(oTexto);
			oCelda=oFila.insertCell();
			oTexto=document.createTextNode(oFilas[i].asunto);
			oCelda.appendChild(oTexto);
			oCelda=oFila.insertCell();
			oTexto=document.createTextNode(oFilas[i].fecha_esp);
			oCelda.appendChild(oTexto);
			oCelda=oFila.insertCell();
			oTexto=document.createTextNode(oFilas[i].hora);
			oCelda.appendChild(oTexto);
			oCelda=oFila.insertCell();
			oTexto=document.createTextNode(oFilas[i].motivo);
			oCelda.appendChild(oTexto);
		}

		oTabla.classList.add("table");
		oTabla.classList.add("table-striped");
		oTabla.classList.add("text-center");
		oCapaListado.appendChild(oTabla);
	}	
}