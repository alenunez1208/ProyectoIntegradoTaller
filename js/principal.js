$("#btnLogin").click(mostrarLogin);

function mostrarFormularios(sForm){
    $("#formLogin form:not('#"+sForm+"')").hide("normal");
    $("#formLogin").show("normal");
}

function mostrarLogin(){
    mostrarFormularios("frmLogin");

    if ($('#frmLogin').length == 0) {
        $("<div>").appendTo('#formLogin').load("paginas/login.html", function(){
            alert("HOLA");
        });
    } else{
        $('#frmLogin').show("normal");
    }
}