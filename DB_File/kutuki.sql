-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2021 at 07:18 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kutuki`
--

-- --------------------------------------------------------

--
-- Table structure for table `houses`
--

CREATE TABLE `houses` (
  `id` int(11) NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `owner_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `houses`
--

INSERT INTO `houses` (`id`, `title`, `description`, `address`, `owner_id`) VALUES
(1, 'Jeanine Forsyth', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien ', '3715 Westridge Circle', 1),
(2, 'Fae Divine', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridicul', '37 Dwight Alley', 2),
(3, 'Brandy Thirwell', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', '16 Shoshone Lane', 3),
(4, 'Shelli Brogini', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.', '344 Hermina Alley', 4),
(6, 'Stephanie Elderidge', 'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', '20 Nelson Crossing', 1),
(7, 'Joya McIlmorow', 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', '51 New Castle Crossing', 1),
(8, 'Brooke Dyson', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridicul', '726 Bluestem Point', 2),
(9, 'Morgen Watmough', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viv', '95 Kings Avenue', 4),
(10, 'Miner Cohrs', 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', '224 Derek Hill', 3);

-- --------------------------------------------------------

--
-- Table structure for table `owners`
--

CREATE TABLE `owners` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `owners`
--

INSERT INTO `owners` (`id`, `name`, `email`, `phone`) VALUES
(1, 'Michelle Gonzalvo', 'mgonzalvo0@ucoz.com', '573-586-1117'),
(2, 'Ira Shotbolt', 'ishotbolt1@hud.gov', '512-305-2108'),
(3, 'Carlie Caffery', 'ccaffery2@vk.com', '388-428-4690'),
(4, 'Helaine Sandford', 'hsandford3@google.co.uk', '383-379-3005');

-- --------------------------------------------------------

--
-- Table structure for table `realtor`
--

CREATE TABLE `realtor` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `realtor`
--

INSERT INTO `realtor` (`id`, `name`, `email`, `phone`) VALUES
(1, 'pavan', 'lsharp0@spotify.com', '1234567890'),
(2, 'naveen g', 'egayter1@engadget.com', '1234567890');

-- --------------------------------------------------------

--
-- Table structure for table `tenent`
--

CREATE TABLE `tenent` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `visit_id` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tenent`
--

INSERT INTO `tenent` (`id`, `name`, `email`, `phone`, `visit_id`) VALUES
(1, 'naveen g', 'naveen@gmail.com', '1234567890', 0),
(4, 'Helaine Sandford', 'hsandford3@google.co.uk', '383-379-3005', 0),
(7, 'NAveen G', 'naveen@gmail.com', '1234567890', 2);

-- --------------------------------------------------------

--
-- Table structure for table `visit_availability`
--

CREATE TABLE `visit_availability` (
  `id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `realtor_id` int(11) NOT NULL DEFAULT 0,
  `start_time` varchar(10) DEFAULT NULL,
  `date` date DEFAULT current_timestamp(),
  `duration` int(11) DEFAULT 30,
  `Available_status` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `visit_availability`
--

INSERT INTO `visit_availability` (`id`, `property_id`, `realtor_id`, `start_time`, `date`, `duration`, `Available_status`) VALUES
(2, 8, 1, '14:00', '2021-04-29', 60, 0),
(3, 7, 0, '14:00', '2021-04-28', 45, 1),
(4, 9, 0, '16:00', '2021-04-29', 60, 1),
(5, 4, 0, '14:00', '2021-04-28', 45, 1),
(7, 3, 0, '12:00', '2021-04-30', 45, 1),
(8, 2, 0, '18:00', '0000-00-00', 60, 1),
(9, 1, 0, '14:00', '0000-00-00', 45, 1),
(10, 1, 0, '16:00', '0000-00-00', 60, 1),
(11, 10, 0, '15:00', '0000-00-00', 45, 1),
(12, 4, 0, '20:00', '0000-00-00', 60, 1),
(13, 2, 0, '17:00', '0000-00-00', 45, 1),
(14, 9, 0, '12:00', '0000-00-00', 60, 1),
(15, 10, 0, '19:00', '0000-00-00', 45, 1),
(16, 6, 0, '20:00', '0000-00-00', 60, 1),
(17, 10, 0, '20:00', '0000-00-00', 45, 1),
(18, 2, 0, '20:00', '0000-00-00', 60, 1),
(20, 7, 0, '15:00', '0000-00-00', 60, 1),
(22, 10, 0, '15:00', '0000-00-00', 60, 1),
(23, 6, 0, '15:00', '0000-00-00', 45, 1),
(24, 3, 0, '16:00', '0000-00-00', 60, 1),
(25, 2, 0, '20:00', '0000-00-00', 45, 1),
(26, 9, 0, '11:00', '0000-00-00', 60, 1),
(27, 4, 0, '11:00', '0000-00-00', 45, 1),
(28, 3, 0, '15:00', '0000-00-00', 60, 1),
(29, 1, 0, '10:00', '0000-00-00', 45, 1),
(30, 1, 0, '12:00', '0000-00-00', 60, 1),
(31, 1, 0, '19:00', '0000-00-00', 45, 1),
(32, 2, 0, '13:00', '0000-00-00', 60, 1),
(33, 3, 0, '10:00', '0000-00-00', 45, 1),
(34, 8, 0, '18:00', '0000-00-00', 60, 1),
(35, 4, 0, '12:00', '0000-00-00', 45, 1),
(36, 4, 0, '20:00', '0000-00-00', 60, 1),
(37, 8, 0, '13:00', '0000-00-00', 45, 1),
(38, 6, 0, '11:00', '0000-00-00', 60, 1),
(39, 10, 0, '20:00', '0000-00-00', 45, 1),
(40, 1, 0, '12:00', '0000-00-00', 60, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `houses`
--
ALTER TABLE `houses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Indexes for table `owners`
--
ALTER TABLE `owners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `realtor`
--
ALTER TABLE `realtor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tenent`
--
ALTER TABLE `tenent`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `visit_availability`
--
ALTER TABLE `visit_availability`
  ADD PRIMARY KEY (`id`),
  ADD KEY `property_id` (`property_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `houses`
--
ALTER TABLE `houses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `owners`
--
ALTER TABLE `owners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `realtor`
--
ALTER TABLE `realtor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tenent`
--
ALTER TABLE `tenent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `visit_availability`
--
ALTER TABLE `visit_availability`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `houses`
--
ALTER TABLE `houses`
  ADD CONSTRAINT `houses_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `owners` (`id`);

--
-- Constraints for table `visit_availability`
--
ALTER TABLE `visit_availability`
  ADD CONSTRAINT `visit_availability_ibfk_3` FOREIGN KEY (`property_id`) REFERENCES `houses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
