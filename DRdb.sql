#CREATE DATABASE Deep_Relaxation;
USE Deep_Relaxation;



CREATE TABLE IF NOT EXISTS`products` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  `description` varchar(255),
  `price` varchar(255),
  `color` varchar(255),
  `size` varchar(255),
  `stock` int,
  `imageURL` varchar(255)
);

CREATE TABLE IF NOT EXISTS `users` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `username` varchar(255),
  `password` varchar(255),
  `email` varchar(255),
  `role` varchar(255),
  `created_at` timestamp
);

CREATE TABLE IF NOT EXISTS `orders` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `created_at` timestamp,
  `status` varchar(255),
  `placed_by` varchar(255)
);

ALTER TABLE `orders` ADD FOREIGN KEY (`id`) REFERENCES `users` (`id`);



CREATE TABLE IF NOT EXISTS `orders_products` (
  `orders_id` integer AUTO_INCREMENT NOT NULL,
  `products_id` integer,
  PRIMARY KEY (`orders_id`, `products_id`)
);

ALTER TABLE `orders_products` ADD FOREIGN KEY (`orders_id`) REFERENCES `orders` (`id`);

ALTER TABLE `orders_products` ADD FOREIGN KEY (`products_id`) REFERENCES `products` (`id`);

#INSERT INTO products (name,description,price,color, size, stock)
#VALUES ('Morning robe Premium Deluxe', 'Very nice and comfortable morning robe', '$599', 'Melancholy Blue', 'M', 4);


