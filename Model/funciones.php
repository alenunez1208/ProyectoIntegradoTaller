<?php
    require_once ("usuario.php");
    
    class miClase{
        function connectDB() {
            try {
                $opc=array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
                $dsn="mysql:host=localhost;dbname=carquinto";
                $usuario="root";
                $contrasena="";
                $base=new PDO($dsn,$usuario,$contrasena,$opc);
            } catch (PDOException $e) {
                die ("Error".$e->getMessage());
                $resultado=null;
            }
    
            return $base;
        }
    
        function ejecutaConsulta($sql){
            $miconexion= connectDB();
    
            return $miconexion->query($sql);
        }
    }    
?>