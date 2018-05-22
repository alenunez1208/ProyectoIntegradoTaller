<?php
    require_once ("usuario.php");
    
    class miClase{
        public static function connectDB() {
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
    
        public static function ejecutaConsulta($sql){
            $miconexion= self::connectDB();
    
            return $miconexion->query($sql);
        }

        public static function obtieneUsuario($usuario,$password){
            $sql= "SELECT nombre,apellidos,email,password,telefono,tipo FROM usuarios WHERE email='".$usuario."' AND password='".$password."' AND activo=true";
            $resultset= self::ejecutaConsulta($sql);
            $row= $resultset->fetch(PDO::FETCH_ASSOC);
            $usuario= new Usuario($row);

            return $usuario;
        }
    }    
?>