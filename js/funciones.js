function login(oEvento){
    var oE= oEvento || windows.event;
    var oForm= document.getElementById("formularioLogin");

    var email= oForm.username.value.trim();
    var password= oForm.password.value.trim();

    oGestion.loguearse(email,password);
}