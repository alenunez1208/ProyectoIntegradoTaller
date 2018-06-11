function rellenarCamposEditarUsuario(){
    var idUsuarioEditar= document.getElementById("txtIdUsuario").value.trim();
    var oUsuario= buscarUsuario(idUsuarioEditar);

    $("#txtNombreEditar").val(oUsuario.nombreUsuario);
    $("#txtApellidosEditar").val(oUsuario.apellidosUsuario);
    $("#txtEmailEditar").val(oUsuario.emailUsuario);
    $("#txtPassEditar").val(oUsuario.passwordUsuario);
    $("#txtPassConfirmarEditar").val(oUsuario.passwordUsuario);
    $("#txtTlfEditar").val(oUsuario.tlfUsuario);
}

function modificarDatosPersonales(oEvento){
    var oE= oEvento || windows.event;
    var oForm= document.getElementById("frmEditarUsuario");

    var iId= document.getElementById("txtIdUsuario").value.trim();
    var sNombre= oForm.txtNombreEditar.value.trim();
    var sApellidos= oForm.txtApellidosEditar.value.trim();
    var sEmail= oForm.txtEmailEditar.value.trim();
    var iTlt= oForm.txtTlfEditar.value.trim();
    var sPass= oForm.txtPassEditar.value.trim();

    var oUsuario= new Usuario(sNombre,sApellidos,sEmail,iTlt,sPass);
    var datos = "id="+iId+"&datos=" + JSON.stringify(oUsuario);

    $.post("../Model/editarUsuario.php", datos, respuestaPregunta, "json");
}

function respuestaPregunta(oDatosDevuelto, sStatus, oAjax) {
    if (oDatosDevuelto == true) {
        alert("Usuario modificado correctamente");
        document.frmEditarUsuario.reset();
        rellenarCamposEditarUsuario();
    }else {
        alert("Problemas al modificar usuario");
        rellenarCamposEditarUsuario();
    }

}

function buscarUsuario(idUsuario){
    var oUsuario= null;
    var sDatos= "id="+idUsuario;
    
    $.ajax({
        url :"../Model/buscarUsuario.php",
        async : false,
        cache : false, 
        method : "GET", 
        dataType : "json",
        data : sDatos,
        complete : function(oDatosDevuelto, sStatus){
            if(sStatus=="success" && oDatosDevuelto.responseJSON.id!=null){
                oUsuario=new Usuario(oDatosDevuelto.responseJSON.nombre, oDatosDevuelto.responseJSON.apellidos, 
                oDatosDevuelto.responseJSON.email, oDatosDevuelto.responseJSON.password, oDatosDevuelto.responseJSON.telefono);
            }
        }
    });

    return oUsuario;
}