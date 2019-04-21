/**
Khởi tạo csdl cho ứng dụng Node ToDo
Sử dụng: XAMPP for Windows + MySQL Workbench Community 6.3
 */

CREATE USER 'nodemy'@'localhost' IDENTIFIED BY 'pleasefixme';
CREATE DATABASE app_todos;

GRANT ALL PRIVILEGES ON app_todos.* TO 'nodemy'@'localhost';

USE app_todos;

CREATE TABLE app_todos.users (
  id int(11) NOT NULL AUTO_INCREMENT,
  username nvarchar(35),
  password nvarchar(256),
  active bit,
  PRIMARY KEY (id),
  UNIQUE (username)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

INSERT INTO users (id, username, password, active) VALUES
(1, 'vunb', 'vunb', true),
(2, 'test', 'test', true),
(3, 'vunb2', '$2a$10$oeUxgCxb9pptbSbkGas6G.5cdO/NSJHqDLv7aMTZINiph0kjhqgs6', true);

CREATE TABLE app_todos.todos (
  id int(11) NOT NULL AUTO_INCREMENT,
  text nvarchar(1024),
  isDone bit,
  createdAt DATETIME,
  userId int(11) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES users(id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

INSERT INTO todos (id, text, isDone, createdAt, userId) VALUES
(1, 'Kết nối db mongodb', true, NOW(), 1),
(2, 'Kết nối db mysql', false, NOW(), 1),
(3, 'Viết ứng dụng node ToDo', false, NOW(), 3),
(4, 'Tích hợp font-end', false, NOW(), 2);

SELECT * FROM app_todos.users;
SELECT * FROM app_todos.todos;

