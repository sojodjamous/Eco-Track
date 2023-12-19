-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 16, 2023 at 07:31 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecotrack`
--

-- --------------------------------------------------------

--
-- Table structure for table `alerts`
--

CREATE TABLE `alerts` (
  `AlertID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `seen_alert` tinyint(1) NOT NULL DEFAULT 0,
  `post_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `alerts`
--

INSERT INTO `alerts` (`AlertID`, `UserID`, `seen_alert`, `post_id`) VALUES
(1, 7, 0, 1),
(2, 8, 1, 2),
(3, 9, 0, 3);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `CommentID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL,
  `CommentText` text DEFAULT NULL,
  `CommentDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`CommentID`, `UserID`, `post_id`, `CommentText`, `CommentDate`) VALUES
(1, 7, 1, 'Great post!', '2023-12-16 00:00:00'),
(2, 8, 2, 'Nice picture!', '2023-12-16 00:00:00'),
(3, 9, 3, 'Lovely weather!', '2023-12-16 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `communityreports`
--

CREATE TABLE `communityreports` (
  `ReportID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `ReportType` varchar(255) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `Timestamp` datetime DEFAULT NULL,
  `LocationID` int(11) DEFAULT NULL,
  `photo` text NOT NULL,
  `reference` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `communityreports`
--

INSERT INTO `communityreports` (`ReportID`, `UserID`, `ReportType`, `Description`, `Timestamp`, `LocationID`, `photo`, `reference`) VALUES
(1, 7, 'Weather', 'Report of heavy rainfall causing flooding in the area.', '2023-12-16 10:00:00', 1, 'HeavyRainfall.png', 'https://example.com/report1'),
(2, 8, 'Weather', 'Report of strong winds causing damage to trees and property.', '2023-12-16 11:30:00', 2, 'StrongWindsDamage.png', 'https://example.com/report2'),
(3, 9, 'Weather', 'Report of hailstorm affecting the crops.', '2023-12-16 12:45:00', 3, 'HailstormCrops.png', 'https://example.com/report3');

-- --------------------------------------------------------

--
-- Table structure for table `educationalresources`
--

CREATE TABLE `educationalresources` (
  `ResourceID` int(11) NOT NULL,
  `Title` varchar(255) DEFAULT NULL,
  `Content` text DEFAULT NULL,
  `ResourceType` varchar(255) DEFAULT NULL,
  `PublicationDate` datetime DEFAULT NULL,
  `photo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `educationalresources`
--

INSERT INTO `educationalresources` (`ResourceID`, `Title`, `Content`, `ResourceType`, `PublicationDate`, `photo`) VALUES
(4, 'Understanding Weather Patterns', 'Explore the fundamentals of weather phenomena and forecasting.', 'Meteorology', '2023-12-16 00:00:00', 'WeatherPatterns.png'),
(5, 'Climate Change: Impact and Mitigation', 'Learn about climate change effects and strategies for mitigation.', 'Environmental Science', '2023-12-16 00:00:00', 'ClimateChangeImpact.png'),
(6, 'Weather Forecasting Techniques', 'Explore various methods used in predicting weather patterns.', 'Meteorology', '2023-12-16 00:00:00', 'WeatherForecastTechniques.png');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `like_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`like_id`, `post_id`, `user_id`) VALUES
(1, 1, 7),
(2, 2, 8),
(3, 3, 9);

-- --------------------------------------------------------

--
-- Table structure for table `opendataaccess`
--

CREATE TABLE `opendataaccess` (
  `AccessID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `APIKey` varchar(255) DEFAULT NULL,
  `AccessDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `opendataaccess`
--

INSERT INTO `opendataaccess` (`AccessID`, `UserID`, `APIKey`, `AccessDate`) VALUES
(1, 7, 'abc123def456', '2023-12-16 08:00:00'),
(2, 8, 'ghi789jkl012', '2023-12-16 09:30:00'),
(3, 9, 'mno345pqr678', '2023-12-16 11:15:00');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `photo` text NOT NULL,
  `time` date NOT NULL,
  `location` text NOT NULL,
  `sources` text NOT NULL,
  `environmental_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`post_id`, `user_id`, `content`, `photo`, `time`, `location`, `sources`, `environmental_data`) VALUES
(1, 7, 'The Weather today looks sunny and the sky is clear sky\r\n', 'AdnanPostPhoto.png', '2023-12-16', 'Nablus', 'Weather Book', '{\"temperature\": 25, \"weather\": \"Sunny\"}'),
(2, 8, 'The Weather today seems cloudy with a chance of rain...', 'CloudyPostPhoto.png', '2023-12-16', 'AnotherLocation', 'Cloudy Source', '{\"temperature\": 22, \"weather\": \"Cloudy\"}'),
(3, 9, 'Today is rainy with heavy showers...', 'RainyPostPhoto.png', '2023-12-16', 'RainyLocation', 'Rainy Source', '{\"temperature\": 20, \"weather\": \"Rainy\"}');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `UserID` int(11) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(3000) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `user_photo` text NOT NULL,
  `profile_photo` text NOT NULL,
  `score` int(11) NOT NULL,
  `location` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`UserID`, `Username`, `Password`, `Email`, `user_photo`, `profile_photo`, `score`, `location`) VALUES
(7, 'Adnan Ennab', '$2a$10$OsB981oWrdN6bQChiKacXeqiJCAlFI1sX8Ai40uUWWbMOod4A9Q0a', 'adnanennab24@gmail.com', 'Adnan.png', 'AdnanProfile.png', 100, 'Nablus'),
(8, 'Sojod Jamous', '$2a$10$.wDC.ccQ3lGY9pKECB9g4ONBps.QU7VNlQ7LSlzlqlKYP2FrNq7fO', 'sojodjamous@gmail.com', 'Sojod.png', 'SojodProfile.png', 80, 'Ramallah'),
(9, 'Mohammad Khamalan', '$2a$10$PPmojVu9oPhLZg1n2gkWV.IW9ZZ8GxvyAfS2BiZS9/xhmkCXmWHs6', 'mohammadkhamalan@gmail.com', 'Mohammad.png', 'MohammadProfile.png', 120, 'Tulkarm');

-- --------------------------------------------------------

--
-- Table structure for table `userconnection`
--

CREATE TABLE `userconnection` (
  `ConnectionID` int(11) NOT NULL,
  `UserID1` int(11) DEFAULT NULL,
  `UserID2` int(11) DEFAULT NULL,
  `ConnectionDate` datetime DEFAULT NULL,
  `from_flag` tinyint(1) NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userconnection`
--

INSERT INTO `userconnection` (`ConnectionID`, `UserID1`, `UserID2`, `ConnectionDate`, `from_flag`, `message`) VALUES
(1, 7, 8, '2023-11-18 08:00:00', 1, 'Hello, friend!'),
(2, 7, 9, '2023-11-19 09:00:00', 1, 'Nice meeting you!'),
(3, 8, 7, '2023-12-11 20:40:43', 1, 'Hello! Let\'s connect. here is the updated message'),
(4, 8, 9, '2023-11-21 11:00:00', 1, 'Shared some interests'),
(7, 9, 7, '2023-12-11 20:32:07', 1, 'Hello! Let\'s connect.'),
(8, 9, 8, '2023-12-11 20:37:01', 1, 'Hello! Let\'s connect. iam USER9\r\n');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alerts`
--
ALTER TABLE `alerts`
  ADD PRIMARY KEY (`AlertID`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`CommentID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `DataID` (`post_id`);

--
-- Indexes for table `communityreports`
--
ALTER TABLE `communityreports`
  ADD PRIMARY KEY (`ReportID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `LocationID` (`LocationID`);

--
-- Indexes for table `educationalresources`
--
ALTER TABLE `educationalresources`
  ADD PRIMARY KEY (`ResourceID`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`like_id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `opendataaccess`
--
ALTER TABLE `opendataaccess`
  ADD PRIMARY KEY (`AccessID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `Username` (`Username`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `userconnection`
--
ALTER TABLE `userconnection`
  ADD PRIMARY KEY (`ConnectionID`),
  ADD KEY `UserID1` (`UserID1`),
  ADD KEY `UserID2` (`UserID2`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alerts`
--
ALTER TABLE `alerts`
  MODIFY `AlertID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `CommentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `communityreports`
--
ALTER TABLE `communityreports`
  MODIFY `ReportID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `educationalresources`
--
ALTER TABLE `educationalresources`
  MODIFY `ResourceID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `opendataaccess`
--
ALTER TABLE `opendataaccess`
  MODIFY `AccessID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `userconnection`
--
ALTER TABLE `userconnection`
  MODIFY `ConnectionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `alerts`
--
ALTER TABLE `alerts`
  ADD CONSTRAINT `UserID` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`),
  ADD CONSTRAINT `post_id` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`);

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`);

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`),
  ADD CONSTRAINT `likes_ibfk_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`UserID`);

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`UserID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
