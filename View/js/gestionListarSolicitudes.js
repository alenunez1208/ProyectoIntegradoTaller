var oCapaListado = document.getElementById("TodosLosListados");

function listadoSolicituesPendientes() {
	// Instanciar objeto Ajax
	var oAjax = instanciarXHR();

	//1. Preparar parametros
	//var sDatosEnvio;

	//2. Configurar la llamada --> Asincrono por defecto
	oAjax.open("GET", "../Model/listarSolicitudes.php");

	//3. Asociar manejador de evento de la respuesta
	oAjax.addEventListener("readystatechange", respuestaListadoSolicitudesPendientes, false);

	//4. Hacer la llamada
	oAjax.send();

}

function respuestaListadoSolicitudesPendientes() {
	var oAjax = this;

	// 5. Proceso la respuesta cuando llega
	if (oAjax.readyState == 4 && oAjax.status == 200) {

		var sDatos = oAjax.responseText;

		var oFilas = JSON.parse(sDatos);

		var tablaEliminar = document.querySelector("TABLE");
		if (tablaEliminar != null) //si hay una tabla en el div de listados la quita para reemplazarla
			tablaEliminar.remove();

		var cabeceras = [];
		cabeceras[0] = "APELLIDOS";
		cabeceras[1] = "NOMBRE";
		cabeceras[2] = "EMAIL";
		cabeceras[3] = "TELEFONO";
		cabeceras[4] = "ASUNTO";
		cabeceras[5] = "FECHA";
		cabeceras[6] = "HORA";
		cabeceras[7] = "MOTIVO";
		cabeceras[8] = "ACEPT/RECH";
		var oCelda;
		var oTexto;

		var oTabla = document.createElement("TABLE");
		var oFila = oTabla.insertRow();
		oFila.classList.add("thead-dark");
		for (var i = 0; i < 9; i++) {// crea la cabecera la tabla
			oCelda = document.createElement("TD");
			oTexto = document.createTextNode(cabeceras[i]);
			oCelda.appendChild(oTexto);
			oCelda.classList.add("lead");
			oFila.appendChild(oCelda);
		}

		for (var i = 0; i < oFilas.length; i++) {

			oFila = oTabla.insertRow(1);
			oCelda = oFila.insertCell();
			oTexto = document.createTextNode(oFilas[i].apellidos);
			oCelda.appendChild(oTexto);
			oCelda = oFila.insertCell();
			oTexto = document.createTextNode(oFilas[i].nombre);
			oCelda.appendChild(oTexto);
			oCelda = oFila.insertCell();
			oTexto = document.createTextNode(oFilas[i].email);
			oCelda.appendChild(oTexto);
			oCelda = oFila.insertCell();
			oTexto = document.createTextNode(oFilas[i].telefono);
			oCelda.appendChild(oTexto);
			oCelda = oFila.insertCell();
			oTexto = document.createTextNode(oFilas[i].asunto);
			oCelda.appendChild(oTexto);
			oCelda = oFila.insertCell();
			oTexto = document.createTextNode(oFilas[i].fecha);
			oCelda.appendChild(oTexto);
			oCelda = oFila.insertCell();
			oTexto = document.createTextNode(oFilas[i].hora);
			oCelda.appendChild(oTexto);
			oCelda = oFila.insertCell();
			oTexto = document.createTextNode(oFilas[i].motivo);
			oCelda.appendChild(oTexto);
			oFila.innerHTML += "<td><button type='button' class='btn btn-success' name='btnAceptarCita' id='btnAceptarCita' onclick='aceptarCita(" + oFilas[i].id_cita + ",true)'><span class='glyphicon glyphicon-ok'></span></button> &nbsp <button type='button' class='btn btn-danger' name='btnRechazarCita' id='btnRechazarCita' onclick='aceptarCita(" + oFilas[i].id_cita + ",false)'><span class='glyphicon glyphicon-remove'></span></button></td>";
		}

		oTabla.classList.add("table");
		oTabla.classList.add("table-striped");
		oTabla.classList.add("text-center");
		oCapaListado.appendChild(oTabla);
	}
}

function aceptarCita(idCita, bEstado) {
		$.post("../Model/cambiarEstadoCita.php","iIdCita="+idCita+"&estado="+bEstado, function (sDatosDevuelto, sStatus, oAjax) {
			if (sStatus == "success" && sDatosDevuelto == "Exito") {
				listadoSolicituesPendientes();
			}
		}, "text");
}