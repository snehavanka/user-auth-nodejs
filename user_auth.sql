CREATE DATABASE user_auth;

USE user_auth;





CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  reset_token VARCHAR(255),
  reset_token_expiry DATETIME
);
select*from users;