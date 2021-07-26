-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 26, 2021 at 02:52 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tickflick`
--

-- --------------------------------------------------------

--
-- Table structure for table `commments`
--

CREATE TABLE `commments` (
  `id` int(10) NOT NULL,
  `content` text NOT NULL,
  `postId` int(10) NOT NULL,
  `hasReply` tinyint(1) NOT NULL,
  `replyId` int(10) NOT NULL,
  `userId` int(10) NOT NULL,
  `likes` int(10) NOT NULL,
  `dislikes` int(10) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `commments`
--

INSERT INTO `commments` (`id`, `content`, `postId`, `hasReply`, `replyId`, `userId`, `likes`, `dislikes`, `status`, `createdOn`, `updatedOn`) VALUES
(2, 'hello', 2, 0, 0, 50, 3, 0, 0, '2021-07-24 17:55:27', '2021-07-24 18:04:40'),
(3, 'hello', 4, 0, 0, 49, 0, 0, 0, '2021-07-24 18:01:14', '2021-07-24 18:01:14');

-- --------------------------------------------------------

--
-- Table structure for table `favsong`
--

CREATE TABLE `favsong` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `songId` int(11) NOT NULL,
  `cretaedOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `favsong`
--

INSERT INTO `favsong` (`id`, `userId`, `songId`, `cretaedOn`, `updatedOn`) VALUES
(1, 2, 2, '2021-07-26 11:38:48', '2021-07-26 11:46:14'),
(2, 50, 2, '2021-07-26 11:38:55', '2021-07-26 11:38:55');

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `contentType` int(1) NOT NULL,
  `textContent` text NOT NULL,
  `imageUrl` varchar(200) NOT NULL,
  `toUserId` int(11) NOT NULL,
  `fromUserId` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `contentType`, `textContent`, `imageUrl`, `toUserId`, `fromUserId`, `createdOn`, `updatedOn`) VALUES
(1, 1, '', '', 0, 0, '2021-07-26 12:32:59', '2021-07-26 12:48:34'),
(2, 0, 'hello', 'no image', 50, 47, '2021-07-26 12:37:14', '2021-07-26 12:37:14'),
(3, 0, 'hello', 'no image', 50, 47, '2021-07-26 12:37:19', '2021-07-26 12:37:19'),
(4, 0, 'hello', 'no image', 50, 47, '2021-07-26 12:37:23', '2021-07-26 12:37:23'),
(5, 0, 'hello', 'upload\\message\\imageUrl1627303066764adharback.png', 50, 47, '2021-07-26 12:37:46', '2021-07-26 12:37:46');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `content` varchar(500) NOT NULL,
  `isRead` tinyint(1) NOT NULL,
  `notifactionType` int(1) NOT NULL,
  `ifFollow` int(11) NOT NULL,
  `ifLikeOrComment` int(11) NOT NULL,
  `ifMessage` int(11) NOT NULL,
  `ifSystemNotify` varchar(300) NOT NULL,
  `status` int(1) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(10) NOT NULL,
  `userId` int(10) NOT NULL,
  `noOfLikes` int(10) NOT NULL,
  `noOfDislikes` int(10) NOT NULL,
  `postContent` text NOT NULL,
  `postImage` varchar(100) NOT NULL,
  `hasImage` tinyint(1) NOT NULL,
  `noOfComment` int(10) NOT NULL,
  `noOfFlicks` int(10) NOT NULL,
  `categoryType` varchar(50) NOT NULL,
  `location` varchar(50) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedON` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `song`
--

CREATE TABLE `song` (
  `id` int(11) NOT NULL,
  `createdBy` varchar(20) NOT NULL,
  `name` varchar(30) NOT NULL,
  `audioLength` varchar(10) NOT NULL,
  `audioFileUrl` varchar(200) NOT NULL,
  `thumbnailUrl` varchar(200) NOT NULL,
  `status` int(1) NOT NULL,
  `isFeatured` tinyint(1) NOT NULL,
  `category` varchar(20) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedOn` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `song`
--

INSERT INTO `song` (`id`, `createdBy`, `name`, `audioLength`, `audioFileUrl`, `thumbnailUrl`, `status`, `isFeatured`, `category`, `createdOn`, `updatedOn`) VALUES
(1, 'ajksj', 'amaan', '10', 'upload\\music\\audioFileUrl1627281640223getLinkImg.png', 'upload\\music\\thumbnailUrl1627281640346getLinkImg.png', 0, 0, 'bsbsb', '2021-07-26 06:49:04', '2021-07-26 06:49:04'),
(3, 'ajksj', 'hshsh', '10', 'upload\\music\\audioFileUrl1627282023287getLinkImg.png', 'upload\\music\\thumbnailUrl1627282023309getLinkImg.png', 0, 0, 'bsbsb', '2021-07-26 06:47:03', '2021-07-26 06:47:03');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullName` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `otpVerified` tinyint(1) NOT NULL,
  `fbId` varchar(200) NOT NULL,
  `fbLogin` tinyint(1) NOT NULL,
  `phoneNo` varchar(12) DEFAULT NULL,
  `phoneAuth` tinyint(1) NOT NULL,
  `deviceIdAndriod` varchar(200) NOT NULL,
  `deviceIdIos` varchar(100) NOT NULL,
  `token` varchar(500) NOT NULL,
  `totalLikes` int(10) NOT NULL,
  `totalFollowers` int(10) NOT NULL,
  `noOfLongVideo` int(10) NOT NULL,
  `noOfLongShort` int(10) NOT NULL,
  `noOfPost` int(10) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullName`, `username`, `otpVerified`, `fbId`, `fbLogin`, `phoneNo`, `phoneAuth`, `deviceIdAndriod`, `deviceIdIos`, `token`, `totalLikes`, `totalFollowers`, `noOfLongVideo`, `noOfLongShort`, `noOfPost`, `createdOn`, `updatedOn`, `status`) VALUES
(43, '', '', 1, '', 0, '7004937515', 0, '', '', '', 0, 0, 0, 0, 0, '2021-07-24 12:03:45', '2021-07-24 12:03:45', 0),
(44, '', '', 1, '', 0, '7004937514', 0, '', '', '', 0, 0, 0, 0, 0, '2021-07-24 12:04:49', '2021-07-24 12:04:49', 0),
(45, '', '', 1, '', 0, '7004937512\n', 0, '', '', '', 0, 0, 0, 0, 0, '2021-07-24 12:05:12', '2021-07-24 12:05:12', 0),
(46, '', '', 1, '', 0, '7004937513\n', 0, '', '', '', 0, 0, 0, 0, 0, '2021-07-24 12:10:45', '2021-07-24 12:10:45', 0),
(48, '', '', 0, '', 0, '7004937511', 0, '', '', '', 0, 0, 0, 0, 0, '2021-07-24 12:17:17', '2021-07-24 12:17:17', 0),
(49, '', '', 1, '', 0, '7004937518', 0, '', '', '', 0, 0, 0, 0, 0, '2021-07-24 12:21:35', '2021-07-24 12:21:35', 0),
(50, 'Md Amaan', 'mdamaan853', 1, '', 0, '7004937521', 0, '', '', '', 0, 0, 0, 0, 0, '2021-07-24 12:22:19', '2021-07-24 12:47:27', 0);

-- --------------------------------------------------------

--
-- Table structure for table `video`
--

CREATE TABLE `video` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `noOfComment` int(11) NOT NULL,
  `canCommnet` tinyint(1) NOT NULL,
  `noOfLikes` int(11) NOT NULL,
  `noOfDislikes` int(11) NOT NULL,
  `videoUrl` varchar(200) NOT NULL,
  `thumbnailUrl` varchar(200) NOT NULL,
  `noOfFlick` int(11) NOT NULL,
  `status` int(1) NOT NULL,
  `musicId` int(11) NOT NULL,
  `musicThumbNailUrl` varchar(200) NOT NULL,
  `hasTags` varchar(300) NOT NULL,
  `descrition` varchar(400) NOT NULL,
  `category` varchar(50) NOT NULL,
  `location` varchar(50) NOT NULL,
  `isLong` tinyint(1) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `video`
--

INSERT INTO `video` (`id`, `userId`, `noOfComment`, `canCommnet`, `noOfLikes`, `noOfDislikes`, `videoUrl`, `thumbnailUrl`, `noOfFlick`, `status`, `musicId`, `musicThumbNailUrl`, `hasTags`, `descrition`, `category`, `location`, `isLong`, `createdOn`, `updatedOn`) VALUES
(1, 50, 0, 1, 0, 0, 'upload\\video\\videoUrl1627239726579Screenshot_1.png', 'upload\\video\\thumbnailUrl1627239726588Screenshot_2.png', 0, 0, 1, 'upload\\video\\musicThumbNailUrl1627239726595Screenshot_2.png', 'amaan', 'new', 'hhah', 'hshss', 0, '2021-07-25 19:02:06', '2021-07-25 19:02:06'),
(2, 50, 0, 1, 4, 0, 'upload\\video\\videoUrl1627240011055Screenshot_2.png', 'upload\\video\\thumbnailUrl1627240011061getLinkImg.png', 0, 0, 1, 'upload\\video\\musicThumbNailUrl1627240011047getLinkImg.png', 'amaan', 'new', 'hhah', 'hshss', 0, '2021-07-25 19:06:51', '2021-07-25 19:22:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `commments`
--
ALTER TABLE `commments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `favsong`
--
ALTER TABLE `favsong`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `song`
--
ALTER TABLE `song`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `video`
--
ALTER TABLE `video`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `commments`
--
ALTER TABLE `commments`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `favsong`
--
ALTER TABLE `favsong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `song`
--
ALTER TABLE `song`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `video`
--
ALTER TABLE `video`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
