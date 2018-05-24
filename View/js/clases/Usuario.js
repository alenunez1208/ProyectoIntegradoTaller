class Usuario {
    constructor(sNombre,sApellidos,sEmail,sPassword,iTlf){
        this.nombreUsuario= sNombre;
        this.apellidosUsuario= sApellidos;
        this.emailUsuario= sEmail;
        this.passwordUsuario= sPassword;
        this.tlfUsuario= iTlf;
        this.tipo= "usuario";
        this.activo= true;
    }
}