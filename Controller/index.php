<?php    
    require_once("../Model/funciones.php");
    
    session_name("carquinto");
    session_start();
    $_SESSION['cerrarSesion'] = false;
   
    if (isset($_POST['btnCerrarSesion'])) {
        session_destroy();
        $_SESSION['cerrarSesion'] = true;
    }
    
    if (isset($_POST['username']) && isset($_POST['password'])) {
        $_SESSION['username']= $_POST['username'];
        $_SESSION['password']= $_POST['password'];
    }

    if (isset($_SESSION['username']) && isset($_SESSION['password']) && $_SESSION['cerrarSesion'] == false) {
        $usuario = miClase::obtieneUsuario($_SESSION['username'],$_SESSION['password']);
        $nombreUser= $usuario->getNombre();            
    
        if ($usuario->getTipo()=="usuario") {
            require_once "../View/panelUsuario.html";
        } else if ($usuario->getTipo()=="admin"){
            require_once "../View/panelAdmin.html";	
        } else{
            require_once "../View/index.html";	
        }
    } else{
        require_once("../View/index.html");	
    }
?>