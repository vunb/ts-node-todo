/**
Khởi tạo csdl cho ứng dụng Node ToDo
Sử dụng: XAMPP for Windows + MySQL Workbench Community 6.3
 */

CREATE USER 'nodemy'@'localhost' IDENTIFIED BY 'pleasefixme';
CREATE DATABASE app_todos;

GRANT ALL PRIVILEGES ON app_todos.* TO 'nodemy'@'localhost';

USE app_todos;

CREATE TABLE app_todos.todos (
  id int(11) NOT NULL AUTO_INCREMENT,
  text nvarchar(1024),
  isDone bit,
  PRIMARY KEY (id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

INSERT INTO todos (id, text, isDone) VALUES
(1, 'Kết nối db mongodb', true),
(2, 'Kết nối db mysql', false),
(3, 'Viết ứng dụng node ToDo', false),
(4, 'Tích hợp font-end', false);

SELECT * FROM app_todos.todos;

CREATE TABLE app_todos.users (
  id int(11) NOT NULL AUTO_INCREMENT,
  username nvarchar(35),
  password nvarchar(256),
  active bit,
  PRIMARY KEY (id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

INSERT INTO users (id, username, password, active) VALUES
(1, 'vunb', 'vunb', true),
(2, 'test', 'test', true);
