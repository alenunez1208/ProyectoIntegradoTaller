<?php
    class Usuario{
        protected $id;
        protected $nombre;
        protected $apellidos;
        protected $email;
        protected $password;
        protected $telefono;
        protected $tipo;

        public function __construct($row){
            $this->id= $row["id"];
            $this->nombre= $row["nombre"];
            $this->apellidos= $row["apellidos"];
            $this->email= $row["email"];
            $this->password= $row["password"];
            $this->telefono= $row["telefono"];
            $this->tipo= $row["tipo"];
        }

        public function getId(){
            return $this->id;
        }

        public function getNombre(){
            return $this->nombre;
        }

        public function getApellidos(){
            return $this->apellidos;
        }

        public function getEmail(){
            return $this->email;
        }

        public function getPassword(){
            return $this->password;
        }

        public function getTelefono(){
            return $this->telefono;
        }

        public function getTipo(){
            return $this->tipo;
        }
    }
?>