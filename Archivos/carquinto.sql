-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-05-2018 a las 23:34:50
-- Versión del servidor: 10.1.28-MariaDB
-- Versión de PHP: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `carquinto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `id` int(3) NOT NULL,
  `asunto` varchar(50) NOT NULL,
  `fecha` date NOT NULL,
  `fecha_esp` varchar(10) NOT NULL,
  `hora` varchar(5) NOT NULL,
  `motivo` varchar(500) NOT NULL,
  `estado` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `citas`
--

INSERT INTO `citas` (`id`, `asunto`, `fecha`, `fecha_esp`, `hora`, `motivo`, `estado`) VALUES
(1, 'Cambio de aceite', '2018-05-14', '2018-05-', '12:00', 'ssssssssss', 'pendiente'),
(2, 'Ruedas', '2018-05-08', '12/08/2018', '12:00', 'cambio de ruedas', 'pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horas`
--

CREATE TABLE `horas` (
  `hora` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `horas`
--

INSERT INTO `horas` (`hora`) VALUES
('07:00'),
('08:00'),
('09:00'),
('10:00'),
('11:00'),
('12:00'),
('13:00'),
('14:00'),
('15:00'),
('16:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(10) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(15) NOT NULL,
  `telefono` int(9) NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellidos`, `email`, `password`, `telefono`, `tipo`, `activo`) VALUES
(1, 'admin', 'admin', 'admin', 'admin', 666666666, 'admin', 1),
(2, 'Alejandro', 'Nunez', 'ale@gmail.com', 'root', 655388778, 'usuario', 1),
(3, 'Aitor', 'Menta', 'aitor@gmail.com', 'root', 655898989, 'usuario', 1),
(4, 'Pedro', 'Gominola', 'pedro@gmail.com', 'root', 655877712, 'usuario', 1),
(5, 'Angy', 'Fernandez', 'angy@gmail.com', 'root', 655898987, 'usuario', 1),
(6, 'Antonio', 'Banderas', 'antonio@gmail.com', 'root', 655897841, 'usuario', 1),
(7, 'Dolores', 'De Barriga', 'dolores@gmail.com', 'root', 65842336, 'usuario', 1),
(8, 'Aaron', 'Delgado Vazquez', 'aaron.delgado.vazquez@gmail.com', 'root', 555443333, 'usuario', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_citas`
--

CREATE TABLE `usuarios_citas` (
  `id_usuario` int(3) NOT NULL,
  `id_cita` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios_citas`
--

INSERT INTO `usuarios_citas` (`id_usuario`, `id_cita`) VALUES
(2, 1),
(5, 1);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_usuario_citas`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_usuario_citas` (
`apellidos` varchar(50)
,`nombre` varchar(50)
,`email` varchar(50)
,`telefono` int(9)
,`asunto` varchar(50)
,`fecha` varchar(10)
,`hora` varchar(5)
,`motivo` varchar(500)
,`estado` varchar(15)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_usuario_citas`
--
DROP TABLE IF EXISTS `vista_usuario_citas`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_usuario_citas`  AS  select `u`.`apellidos` AS `apellidos`,`u`.`nombre` AS `nombre`,`u`.`email` AS `email`,`u`.`telefono` AS `telefono`,`c`.`asunto` AS `asunto`,`c`.`fecha_esp` AS `fecha`,`c`.`hora` AS `hora`,`c`.`motivo` AS `motivo`,`c`.`estado` AS `estado` from ((`usuarios` `u` join `usuarios_citas` `uc`) join `citas` `c`) where ((`u`.`id` = `uc`.`id_usuario`) and (`c`.`id` = `uc`.`id_cita`) and (`c`.`estado` = 'pendiente')) ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios_citas`
--
ALTER TABLE `usuarios_citas`
  ADD KEY `FK_UsuarioId` (`id_usuario`),
  ADD KEY `FK_CitaId` (`id_cita`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `usuarios_citas`
--
ALTER TABLE `usuarios_citas`
  ADD CONSTRAINT `FK_CitaId` FOREIGN KEY (`id_cita`) REFERENCES `citas` (`id`),
  ADD CONSTRAINT `FK_UsuarioId` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
