function rellenarCamposEditarUsuario(){
    var txtNombreEditar= document.getElementById("txtNombreUsuario").value.trim();
    var txtApellidosEditar= document.getElementById("txtApellidosUsuario").value.trim();
    var txtEmailEditar= document.getElementById("txtEmailUsuario").value.trim();
    var txtPassEditar= document.getElementById("txtPasswordUsuario").value.trim();
    var txtTlfEditar= document.getElementById("txtTlfUsuario").value.trim();
    $("#txtNombreEditar").val(txtNombreEditar);
    $("#txtApellidosEditar").val(txtApellidosEditar);
    $("#txtEmailEditar").val(txtEmailEditar);
    $("#txtPassEditar").val(txtPassEditar);
    $("#txtPassConfirmarEditar").val(txtPassEditar);
    $("#txtTlfEditar").val(txtTlfEditar);
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
    }else {
        alert("Problemas al modificar usuario");
    }

}