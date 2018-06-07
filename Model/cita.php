<?php
    class Cita{
        protected $id;

        public function __construct($row){
            $this->id= $row["id"];
        }

        public function getId(){
            return $this->id;
        }
    }
?>