-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Počítač: localhost:3306
-- Vytvořeno: Pát 04. lis 2022, 22:57
-- Verze serveru: 5.7.40-0ubuntu0.18.04.1
-- Verze PHP: 7.2.24-0ubuntu0.18.04.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `user_team03`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `area`
--

CREATE TABLE `area` (
                      `areaId` int(11) NOT NULL,
                      `name` varchar(50) NOT NULL,
                      `tournamentId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Vypisuji data pro tabulku `area`
--

INSERT INTO `area` (`areaId`, `name`, `tournamentId`) VALUES
                                                        (1, 'Velká hala', 1),
                                                        (2, 'Malá hala', 1);

-- --------------------------------------------------------

--
-- Struktura tabulky `block`
--

CREATE TABLE `block` (
                       `blockId` int(11) NOT NULL,
                       `startTime` int(11) DEFAULT NULL,
                       `persons` int(11) NOT NULL,
                       `style` varchar(50) NOT NULL,
                       `category` varchar(50) NOT NULL,
                       `sex` varchar(1) DEFAULT NULL,
                       `tournamentId` int(11) NOT NULL,
                       `dayId` int(11) DEFAULT NULL,
                       `areaId` int(11) DEFAULT NULL,
                       `sportId` int(11) NOT NULL,
                       `age` varchar(50) NOT NULL,
                       `customParameter` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Vypisuji data pro tabulku `block`
--

INSERT INTO `block` (`blockId`, `startTime`, `persons`, `style`, `category`, `sex`, `tournamentId`, `dayId`, `areaId`, `sportId`, `age`, `customParameter`) VALUES
                                                                                                                                                              (23, NULL, 3, 'TEST', 'Novorozenci Znojmo', 'M', 1, NULL, NULL, 1, 'Mladší junioři', '20 kg'),
                                                                                                                                                              (24, 120, 5, 'TEST', 'Tuřňáci Litvínov', 'M', 1, 1, 1, 1, 'Mladší junioři', '100 kg'),
                                                                                                                                                              (25, 300, 2, 'TEST', 'Bloncky Cheb', 'F', 1, 1, 1, 1, 'Starší junioři', '60 kg'),
                                                                                                                                                              (26, 360, 4, 'TEST', 'Vraci Aš', 'M', 1, 1, 1, 2, 'Starší junioři', '40 kg'),
                                                                                                                                                              (27, 200, 3, 'TEST', 'Chomutov SUV', 'M', 1, 1, 1, 1, 'Dospělí', '90 kg'),
                                                                                                                                                              (28, 100, 2, 'TEST', 'Holoubátka Praha', 'F', 1, 1, 2, 2, 'Mladší junioři', '50 kg'),
                                                                                                                                                              (29, 180, 8, 'TEST', 'Ospalci Brno', NULL, 1, 1, 2, 2, 'Starší junioři', '70 kg'),
                                                                                                                                                              (30, 240, 4, 'TEST', 'ROG Liberec', 'M', 1, 1, 2, 1, 'Starší junioři', NULL),
                                                                                                                                                              (31, 300, 3, 'TEST', 'Lvice Praha', 'F', 1, 2, 2, 1, 'Dospělí', '70 kg');

-- --------------------------------------------------------

--
-- Struktura tabulky `day`
--

CREATE TABLE `day` (
                     `dayId` int(11) NOT NULL,
                     `date` date NOT NULL,
                     `description` varchar(50) NOT NULL,
                     `startTime` int(11) NOT NULL,
                     `endTime` int(11) NOT NULL,
                     `tournamentId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Vypisuji data pro tabulku `day`
--

INSERT INTO `day` (`dayId`, `date`, `description`, `startTime`, `endTime`, `tournamentId`) VALUES
                                                                                             (1, '2022-01-01', 'Rozřazovací kolo', 100, 400, 1),
                                                                                             (2, '2022-01-02', 'Dolní část tabulky', 100, 400, 1);

-- --------------------------------------------------------

--
-- Struktura tabulky `sport`
--

CREATE TABLE `sport` (
                       `sportId` int(11) NOT NULL,
                       `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Vypisuji data pro tabulku `sport`
--

INSERT INTO `sport` (`sportId`, `name`) VALUES
                                          (1, 'Skok do dálky'),
                                          (2, 'Běh na 100m');

-- --------------------------------------------------------

--
-- Struktura tabulky `tournament`
--

CREATE TABLE `tournament` (
                            `tournamentId` int(11) NOT NULL,
                            `name` varchar(50) NOT NULL,
                            `location` varchar(50) NOT NULL,
                            `startDate` date NOT NULL,
                            `endDate` date NOT NULL,
                            `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Vypisuji data pro tabulku `tournament`
--

INSERT INTO `tournament` (`tournamentId`, `name`, `location`, `startDate`, `endDate`, `userId`) VALUES
                                                                                                  (1, 'Mistrovství ČR', 'Praha', '2022-01-01', '2022-01-02', 1),
                                                                                                  (2, 'Test Tournament', 'Praha', '2022-01-01', '2022-01-02', 1);

-- --------------------------------------------------------

--
-- Struktura tabulky `tournament_sport`
--

CREATE TABLE `tournament_sport` (
                                  `tournamentId` int(11) NOT NULL,
                                  `sportId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Vypisuji data pro tabulku `tournament_sport`
--

INSERT INTO `tournament_sport` (`tournamentId`, `sportId`) VALUES
                                                             (1, 1),
                                                             (1, 2);

-- --------------------------------------------------------

--
-- Struktura tabulky `user`
--

CREATE TABLE `user` (
                      `userId` int(11) NOT NULL,
                      `email` varchar(100) NOT NULL,
                      `username` varchar(16) NOT NULL,
                      `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Vypisuji data pro tabulku `user`
--

INSERT INTO `user` (`userId`, `email`, `username`, `password`) VALUES
                                                                 (1, 'test@test.cz', 'test', '$argon2id$v=19$m=4096,t=3,p=1$LpBqDjR3VsYcvI+yybrtqw$+tnAUbAlf3LCbTxhcMN1SGHc3ClP8M4Th/4jJP4pikE'),
                                                                 (6, 'test2@test.cz', 'test2', '$argon2id$v=19$m=4096,t=3,p=1$7OpxgcZ+qquKC3YeFPTE5Q$Ql54luLNB+tLSrltWLjxu2/OKWDyb0eM3flu6IxGsWI'),
                                                                 (7, 'labik@cngroup.dk', 'labik', '$argon2id$v=19$m=4096,t=3,p=1$AeWv6VTFDFxkCczT3Sx8rA$OhzpizEO66P0vBbBDnGMPA4sEQHdcB0ZmAsowR8OALw'),
                                                                 (8, 'test3@test.cz', 'test3', '$argon2id$v=19$m=4096,t=3,p=1$ZLZVRIqxODESefgk83y4HA$AbOCeGgI/AfO+DyS9UYwWTakojow87sfqHhedf7WGxk'),
                                                                 (9, 'vnum00@vse.cz', 'matyas', '$argon2id$v=19$m=4096,t=3,p=1$ZWMZ3TiCxzKznMGASiD7Sg$lNhOzZc+Ljn1tadoYVZ1QABGJTAH8uklOhoYV+IWVOw');

--
-- Klíče pro exportované tabulky
--

--
-- Klíče pro tabulku `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`areaId`),
  ADD KEY `area_tournament_fk` (`tournamentId`);

--
-- Klíče pro tabulku `block`
--
ALTER TABLE `block`
  ADD PRIMARY KEY (`blockId`),
  ADD KEY `block_tournament_fk` (`tournamentId`),
  ADD KEY `block_day_fk` (`dayId`),
  ADD KEY `block_area_fk` (`areaId`),
  ADD KEY `block_sport_fk` (`sportId`);

--
-- Klíče pro tabulku `day`
--
ALTER TABLE `day`
  ADD PRIMARY KEY (`dayId`),
  ADD KEY `day_tournament_fk` (`tournamentId`);

--
-- Klíče pro tabulku `sport`
--
ALTER TABLE `sport`
  ADD PRIMARY KEY (`sportId`);

--
-- Klíče pro tabulku `tournament`
--
ALTER TABLE `tournament`
  ADD PRIMARY KEY (`tournamentId`),
  ADD KEY `tournament_user_fk` (`userId`);

--
-- Klíče pro tabulku `tournament_sport`
--
ALTER TABLE `tournament_sport`
  ADD PRIMARY KEY (`tournamentId`,`sportId`),
  ADD KEY `sport_fk` (`sportId`);

--
-- Klíče pro tabulku `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `area`
--
ALTER TABLE `area`
  MODIFY `areaId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pro tabulku `block`
--
ALTER TABLE `block`
  MODIFY `blockId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
--
-- AUTO_INCREMENT pro tabulku `day`
--
ALTER TABLE `day`
  MODIFY `dayId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pro tabulku `sport`
--
ALTER TABLE `sport`
  MODIFY `sportId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pro tabulku `tournament`
--
ALTER TABLE `tournament`
  MODIFY `tournamentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pro tabulku `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- Omezení pro exportované tabulky
--

--
-- Omezení pro tabulku `area`
--
ALTER TABLE `area`
  ADD CONSTRAINT `area_tournament_fk` FOREIGN KEY (`tournamentId`) REFERENCES `tournament` (`tournamentId`);

--
-- Omezení pro tabulku `block`
--
ALTER TABLE `block`
  ADD CONSTRAINT `block_area_fk` FOREIGN KEY (`areaId`) REFERENCES `area` (`areaId`),
  ADD CONSTRAINT `block_day_fk` FOREIGN KEY (`dayId`) REFERENCES `day` (`dayId`),
  ADD CONSTRAINT `block_sport_fk` FOREIGN KEY (`sportId`) REFERENCES `sport` (`sportId`),
  ADD CONSTRAINT `block_tournament_fk` FOREIGN KEY (`tournamentId`) REFERENCES `tournament` (`tournamentId`);

--
-- Omezení pro tabulku `day`
--
ALTER TABLE `day`
  ADD CONSTRAINT `day_tournament_fk` FOREIGN KEY (`tournamentId`) REFERENCES `tournament` (`tournamentId`);

--
-- Omezení pro tabulku `tournament`
--
ALTER TABLE `tournament`
  ADD CONSTRAINT `tournament_user_fk` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`);

--
-- Omezení pro tabulku `tournament_sport`
--
ALTER TABLE `tournament_sport`
  ADD CONSTRAINT `sport_fk` FOREIGN KEY (`sportId`) REFERENCES `sport` (`sportId`),
  ADD CONSTRAINT `tournament_fk` FOREIGN KEY (`tournamentId`) REFERENCES `tournament` (`tournamentId`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
