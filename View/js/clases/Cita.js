class Cita {
    constructor(sIdUsuario,sAsunto,dFecha,sHora,sDescripcion){
        this.idUsuario= sIdUsuario;
        this.asunto= sAsunto;
        this.fecha= new Date();
        this.fechaEsp= dFecha;
        this.hora= sHora;
        this.descripcion= sDescripcion;
        this.estado= "pendiente";
    }
}