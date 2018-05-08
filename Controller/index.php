<?php    
    require_once("../Model/funciones.php");
    
    $_SESSION['cerrarSesion'] = false;
   
    if (isset($_POST['cerrarSesion'])) {
        session_destroy();
        $_SESSION['cerrarSesion'] = true;
    }
        if (isset($_POST['username']) && isset($_POST['password'])) {
            $_SESSION['username']= $_POST['username'];
            $_SESSION['password']= $_POST['password'];
        }

        if (isset($_SESSION['username']) && isset($_SESSION['password']) && $_SESSION['cerrarSesion'] == false) {
            $usuario = miClase::obtieneUsuario($_SESSION['username']);
            
            if ($usuario->getTipo()=="usuario") {
                require_once "../Controller/panelUsuario.php";
            } else{
                if ($usuario->getTipo()=="admin")
                  require_once "../Controller/panelAdmin.php";	
            else
                require_once "error";	
            }
        } else{
            require_once("../View/index.html");	
        }
?>