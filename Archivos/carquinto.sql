-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-06-2018 a las 19:04:59
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
CREATE DATABASE IF NOT EXISTS `carquinto` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `carquinto`;

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
  `estado` varchar(15) NOT NULL,
  `email` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuentas`
--

CREATE TABLE `cuentas` (
  `twitter` varchar(400) NOT NULL,
  `calendar` varchar(800) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cuentas`
--

INSERT INTO `cuentas` (`twitter`, `calendar`) VALUES
('', '<iframe src=\"https://calendar.google.com/calendar/b/2/embed?showTitle=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=WEEK&amp;height=600&amp;wkst=2&amp;hl=es&amp;bgcolor=%23FFFFFF&amp;src=carquintotaller%40gmail.com&amp;color=%231B887A&amp;ctz=Europe%2FMadrid\" style=\"border-width:0\" width=\"800\" height=\"600\" frameborder=\"0\" scrolling=\"no\"></iframe>');

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
(1, 'admin', 'admin', 'admin@gmail.com', 'admin', 655898989, 'admin', 1),
(2, 'Alejandro', 'Nuñez', 'alenunezcdm@gmail.com', 'root', 655386780, 'usuario', 1),
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
(3, 2),
(2, 2),
(2, 2),
(2, 19),
(2, 20),
(2, 21),
(2, 22),
(2, 23),
(2, 24),
(2, 25),
(2, 26),
(2, 27),
(2, 28),
(2, 29),
(2, 2),
(2, 31),
(2, 33),
(2, 34),
(2, 35),
(2, 36),
(2, 37),
(2, 38),
(2, 34),
(2, 35),
(2, 36),
(2, 37),
(2, 38),
(2, 39),
(5, 47),
(2, 49),
(5, 50),
(2, 52),
(2, 54);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_usuario_citas`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_usuario_citas` (
`id_usuario` int(10)
,`nombre` varchar(50)
,`apellidos` varchar(50)
,`email` varchar(50)
,`telefono` int(9)
,`id_cita` int(3)
,`asunto` varchar(50)
,`fecha_ori` date
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

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_usuario_citas`  AS  select `u`.`id` AS `id_usuario`,`u`.`apellidos` AS `nombre`,`u`.`nombre` AS `apellidos`,`u`.`email` AS `email`,`u`.`telefono` AS `telefono`,`c`.`id` AS `id_cita`,`c`.`asunto` AS `asunto`,`c`.`fecha` AS `fecha_ori`,`c`.`fecha_esp` AS `fecha`,`c`.`hora` AS `hora`,`c`.`motivo` AS `motivo`,`c`.`estado` AS `estado` from ((`usuarios` `u` join `citas` `c`) join `usuarios_citas` `us`) where ((`us`.`id_usuario` = `u`.`id`) and (`us`.`id_cita` = `c`.`id`)) ;

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
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
