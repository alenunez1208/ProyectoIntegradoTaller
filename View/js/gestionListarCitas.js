var oCapaListado= document.getElementById("TodosLosListados");

function listadoCitasTotales()
{
	 // Instanciar objeto Ajax
	 var oAjax = instanciarXHR();

	 //1. Preparar parametros
	 //var sDatosEnvio;

	 //2. Configurar la llamada --> Asincrono por defecto
	 oAjax.open("GET", "../Model/listarCitasTotales.php");

	 //3. Asociar manejador de evento de la respuesta
	 oAjax.addEventListener("readystatechange", respuestaListadoCitasTotales, false);

	 //4. Hacer la llamada
	 oAjax.send();
	
}

function respuestaListadoCitasTotales()
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
		cabeceras[0]="APELLIDOS";
		cabeceras[1]="NOMBRE";
		cabeceras[2]="EMAIL";
		cabeceras[3]="TELEFONO";
		cabeceras[4]="ASUNTO";
		cabeceras[5]="FECHA";
		cabeceras[6]="HORA";
		cabeceras[7]="MOTIVO";
		cabeceras[8]="ESTADO";
		var oCelda;
		var oTexto;

		var oTabla=document.createElement("TABLE");
		var oFila=oTabla.insertRow();
		oFila.classList.add("thead-dark");
		for ( var i=0;i<9;i++){// crea la cabecera la tabla
			oCelda=document.createElement("TD");
			oTexto=document.createTextNode(cabeceras[i]);
			oCelda.appendChild(oTexto);
			oCelda.classList.add("lead");
			oFila.appendChild(oCelda);
		}

		for ( var i=0;i<oFilas.length;i++){
			
			oFila=oTabla.insertRow(1);
			oCelda=oFila.insertCell();
			oTexto=document.createTextNode(oFilas[i].nombre);
			oCelda.appendChild(oTexto);
			oCelda=oFila.insertCell();
			oTexto=document.createTextNode(oFilas[i].apellidos);
			oCelda.appendChild(oTexto);
			oCelda=oFila.insertCell();
			oTexto=document.createTextNode(oFilas[i].email);
			oCelda.appendChild(oTexto);
			oCelda=oFila.insertCell();
			oTexto=document.createTextNode(oFilas[i].telefono);
			oCelda.appendChild(oTexto);
			oCelda=oFila.insertCell();
			oTexto=document.createTextNode(oFilas[i].asunto);
			oCelda.appendChild(oTexto);
			oCelda=oFila.insertCell();
			oTexto=document.createTextNode(oFilas[i].fecha);
			oCelda.appendChild(oTexto);
			oCelda=oFila.insertCell();
			oTexto=document.createTextNode(oFilas[i].hora);
			oCelda.appendChild(oTexto);
			oCelda=oFila.insertCell();
			oTexto=document.createTextNode(oFilas[i].motivo);
			oCelda.appendChild(oTexto);
			oCelda=oFila.insertCell();
			oTexto=document.createTextNode(oFilas[i].estado);
            oCelda.appendChild(oTexto);
		}

		oTabla.classList.add("table");
		oTabla.classList.add("table-striped");
		oTabla.classList.add("text-center");
		oCapaListado.appendChild(oTabla);
	}	
}