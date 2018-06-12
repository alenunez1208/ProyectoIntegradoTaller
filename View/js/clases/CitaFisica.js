class CitaFisica {
    constructor(sEmail,sAsunto,dFecha,sHora,sDescripcion){
        this.email= sEmail;
        this.asunto= sAsunto;
        this.fecha= new Date();
        this.fechaEsp= dFecha;
        this.hora= sHora;
        this.descripcion= sDescripcion;
        this.estado= "aceptada";
    }
}