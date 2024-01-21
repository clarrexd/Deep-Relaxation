#CREATE DATABASE Deep_Relaxation;
USE Deep_Relaxation;



CREATE TABLE IF NOT EXISTS`products` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  `description` varchar(255),
  `price` integer,
  `color` varchar(255),
  `size` varchar(255),
  `imageURL` varchar(255)
  
);

CREATE TABLE IF NOT EXISTS `products_stock`(
`product_id`integer PRIMARY KEY NOT NULL,
`stock_balance` integer
);

CREATE TABLE IF NOT EXISTS `users` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `username` varchar(255) unique,
  `password` varchar(255),
  `email` varchar(255),
  `role` varchar(255),
  `created_at` timestamp,
  UNIQUE (username)
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

#ALTER TABLE `users` ADD UNIQUE (username);

#UPDATE products SET price = 299 WHERE id=2;
#ALTER TABLE products DROP COLUMN stock;
#UPDATE products SET imageURL = "/assets/blue-morning-robe-azure.jpg" WHERE id=1;
#INSERT INTO products (name,description,price,color, size, stock) VALUES ('Soft loafers', 'The most comfortable loafers that will ever grace your feet', '$299', 'Spitting green', 'L', 2);
#INSERT INTO users (username, password, email) VALUES ("clarrexd", "hahalolxD123", "pungspark@plast.cn");
#test
#DELETE FROM users WHERE id=11;
