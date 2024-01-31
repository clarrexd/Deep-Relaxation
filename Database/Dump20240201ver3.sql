CREATE DATABASE  IF NOT EXISTS `deep_relaxation` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `deep_relaxation`;
-- MySQL dump 10.13  Distrib 8.3.0, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: deep_relaxation
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `stock_balance` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (1,1,357),(2,2,1404);
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` varchar(255) DEFAULT NULL,
  `placed_by` int(11) NOT NULL,
  `total_sum` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `placed_by` (`placed_by`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`placed_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (6,'2024-01-31 21:43:51','SENT',39,18261),(7,'2024-01-30 07:04:51','IN PROCESS',39,1795),(8,'2024-01-30 05:59:08','IN PROCESS',39,3891),(9,'2024-01-30 06:07:11','SENT',39,4193),(10,'2024-01-30 13:36:53','Created',38,898),(11,'2024-01-30 14:32:08','Created',39,5990),(12,'2024-01-30 14:32:37','Created',39,1797),(13,'2024-01-30 14:32:53','Created',39,1196),(14,'2024-01-30 14:43:53','Created',39,1796),(15,'2024-01-31 08:40:33','Created',39,898),(16,'2024-01-31 08:41:00','Created',39,898),(17,'2024-01-31 08:41:50','Created',39,4193),(18,'2024-01-31 08:45:32','Created',39,299),(19,'2024-01-31 08:45:52','Created',39,299),(20,'2024-01-31 08:47:17','Created',39,299),(21,'2024-01-31 08:52:47','Created',39,599),(22,'2024-01-31 08:56:40','Created',39,599),(23,'2024-01-31 08:59:35','Created',39,299),(24,'2024-01-31 09:01:04','Created',39,299),(25,'2024-01-31 09:04:27','Created',39,599),(26,'2024-01-31 09:04:33','Created',39,599),(27,'2024-01-31 09:04:39','Created',39,599),(28,'2024-01-31 10:37:48','SENT',39,898),(29,'2024-01-31 09:11:19','Created',39,898),(30,'2024-01-31 10:45:18','Created',114,898),(31,'2024-01-31 10:45:30','Created',114,299),(32,'2024-01-31 10:45:50','Created',114,1795);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders_products`
--

DROP TABLE IF EXISTS `orders_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orders_id` int(11) NOT NULL,
  `products_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_id` (`orders_id`),
  KEY `products_id` (`products_id`),
  CONSTRAINT `orders_products_ibfk_1` FOREIGN KEY (`orders_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `orders_products_ibfk_2` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`),
  CONSTRAINT `orders_products_ibfk_3` FOREIGN KEY (`orders_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `orders_products_ibfk_4` FOREIGN KEY (`orders_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `orders_products_ibfk_5` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders_products`
--

LOCK TABLES `orders_products` WRITE;
/*!40000 ALTER TABLE `orders_products` DISABLE KEYS */;
INSERT INTO `orders_products` VALUES (1,6,2,17),(2,6,1,22),(3,7,2,4),(4,7,1,1),(5,8,1,4),(6,8,2,5),(7,9,1,7),(8,10,1,1),(9,10,2,1),(10,11,1,10),(11,12,1,3),(12,13,2,4),(13,14,1,2),(14,14,2,2),(15,15,1,1),(16,15,2,1),(17,16,1,1),(18,16,2,1),(19,17,1,7),(20,18,2,1),(21,19,2,1),(22,20,2,1),(23,21,1,1),(24,22,1,1),(25,23,2,1),(26,24,2,1),(27,25,1,1),(28,26,1,1),(29,27,1,1),(30,28,2,1),(31,28,1,1),(32,29,2,1),(33,29,1,1),(34,30,1,1),(35,30,2,1),(36,31,2,1),(37,32,1,1),(38,32,2,4);
/*!40000 ALTER TABLE `orders_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `imageURL` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Morning Robe Premium Deluxe','Very nice and comfortable morning robe','599','Melancholy Blue','M','/assets/blue-morning-robe-azure.jpg'),(2,'Soft loafers','The most comfortable loafers that will ever grace your feet','299','Spitting green','L',NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (9,'clarrexd','hahalolxD123','pungspark@plast.cn',NULL,'2024-01-21 18:33:11'),(19,'oscis','HAHAHAHAHAHAAH','aa@okej',NULL,'2024-01-21 19:18:02'),(26,'secondtest','secondtestpw','sdki@test.se',NULL,'2024-01-23 15:19:00'),(38,'hashtest1','$2b$12$cO.LpLrRd/3BZ2C0BmqDRu/PrIqO.KZP5/U4Dg/exYbCqanNHY6ni','test@test.se',NULL,'2024-01-23 20:53:35'),(39,NULL,NULL,'zilx.renstrom@gmail.com',NULL,'2024-01-24 22:41:02'),(109,'admin','$2b$12$v0t7yvDGF5VC0ebUovlxHOWsABUTHWTe.xp0ttFkSdbYxialjOfIq','admin@admin.com','admin','2024-01-31 09:28:59'),(114,'snabel','$2b$12$C8eTEWDcFtXRfV1gAR6hRuizMAI1kzoo62Cb9CR7u0OA2mkNj/X4C','snabel@snabel.se',NULL,'2024-01-31 10:44:51');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-01  0:48:04
