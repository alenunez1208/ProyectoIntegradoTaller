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
    $("#txtTlfEditar").val(txtTlfEditar);
}