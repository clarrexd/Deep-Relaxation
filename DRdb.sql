#CREATE DATABASE Deep_Relaxation;
USE Deep_Relaxation;



CREATE TABLE IF NOT EXISTS`products` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  `description` varchar(255),
  `price` varchar(255),
  `color` varchar(255),
  `size` varchar(255),
  `imageURL` varchar(255)
 
);

CREATE TABLE IF NOT EXISTS `inventory`(
`id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
`product_id`integer NOT NULL,
`stock_balance` integer
);

CREATE TABLE IF NOT EXISTS `users` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `username` varchar(255) unique,
  `password` varchar(255),
  `email` varchar(255),
  `role` varchar(255),
  `created_at` timestamp,
  UNIQUE (username, email)
);

CREATE TABLE IF NOT EXISTS `orders` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `created_at` timestamp,
  `status` varchar(255),
  `placed_by` integer NOT NULL,
  `total_sum` integer
);

#ALTER TABLE `orders` ADD FOREIGN KEY (`id`) REFERENCES `users` (`id`);

#ALTER TABLE products_stock RENAME TO inventory;
#ALTER TABLE `orders` DROP FOREIGN KEY `orders_ibfk_1`;
#ALTER TABLE orders ADD COLUMN total_sum integer;

#ALTER TABLE users MODIFY email;
#ALTER TABLE users ADD CONSTRAINT UNIQUE(email);

CREATE TABLE IF NOT EXISTS `orders_products` (
   `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT ,
  `orders_id` integer NOT NULL,
  `products_id` integer,
  `quantity` integer
);

ALTER TABLE `orders_products` ADD FOREIGN KEY (`orders_id`) REFERENCES `orders` (`id`);

ALTER TABLE `orders_products` ADD FOREIGN KEY (`products_id`) REFERENCES `products` (`id`);

ALTER TABLE `inventory` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

#Note: id in inventory must correspond to product_id
#ALTER TABLE `users` ADD UNIQUE (username);
#DROP TABLE orders_products;
#UPDATE products SET price = 299 WHERE id=2;
#ALTER TABLE products DROP COLUMN stock;
#UPDATE products SET imageURL = "/assets/blue-morning-robe-azure.jpg" WHERE id=1;
#INSERT INTO products (name,description,price,color, size, stock) VALUES ('Soft loafers', 'The most comfortable loafers that will ever grace your feet', '$299', 'Spitting green', 'L', 2);
#INSERT INTO users (username, password, email) VALUES ("clarrexd", "hahalolxD123", "pungspark@plast.cn");

#DELETE FROM orders WHERE id=5;
