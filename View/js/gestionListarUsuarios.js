var oCapaListado= document.getElementById("listadoUsuario");

function listadoUsuarios()
{
	 // Instanciar objeto Ajax
	 var oAjax = instanciarXHR();

	 //1. Preparar parametros
	 //var sDatosEnvio;

	 //2. Configurar la llamada --> Asincrono por defecto
	 oAjax.open("GET", "../Model/listarUsuarios.php");

	 //3. Asociar manejador de evento de la respuesta
	 oAjax.addEventListener("readystatechange", respuestaListadoUsuarios, false);

	 //4. Hacer la llamada
	 oAjax.send();
	
}

function respuestaListadoUsuarios()
{
	var oAjax = this;
	
	// 5. Proceso la respuesta cuando llega
	if (oAjax.readyState == 4 && oAjax.status == 200) {

		var sDatos=oAjax.responseText;
		
		var oFilas=JSON.parse(sDatos);
		
		var tablaEliminar=document.querySelector("#listadoUsuario>TABLE");
		if(tablaEliminar!=null) //si hay una tabla en el div de listados la quita para reemplazarla
			tablaEliminar.remove();

		var cabeceras=[];
		cabeceras[0]="ID";
		cabeceras[1]="NOMBRE";
		cabeceras[2]="APELLIDOS";
		cabeceras[3]="EMAIL";
		cabeceras[4]="TELEFONO";
		cabeceras[5]="BAJA/ALTA";
		var oCelda;
		var oTexto;

		var oTabla=document.createElement("TABLE");
		var oFila=oTabla.insertRow();
		oFila.classList.add("thead-dark");
		for ( var i=0;i<6;i++){// crea la cabecera la tabla
			oCelda=document.createElement("TD");
			oTexto=document.createTextNode(cabeceras[i]);
			oCelda.appendChild(oTexto);
			oCelda.classList.add("lead");
			oFila.appendChild(oCelda);
		}

		for ( var i=0;i<oFilas.length;i++){
			
			oFila=oTabla.insertRow(1);
			oCelda=oFila.insertCell();
			oTexto=document.createTextNode(oFilas[i].id);
			oCelda.appendChild(oTexto);
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
            
            if(oFilas[i].activo == true){
                oCelda.appendChild(oTexto);
                oFila.innerHTML+="<td><input type='submit' class='btn btn-danger' name='btnRechazarCita' id='btnRechazarCita' value='☓'></td>";
            } else{
                oCelda.appendChild(oTexto);
			    oFila.innerHTML+="<td><input type='submit' class='btn btn-success' name='btnAceptarCita' id='btnAceptarCita' value='✓'></td>";
            }
			
		}

		oTabla.classList.add("table");
		oTabla.classList.add("table-striped");
		oTabla.classList.add("text-center");
		oCapaListado.appendChild(oTabla);
	}	
}