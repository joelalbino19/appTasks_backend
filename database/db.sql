-- creando base de datos
CREATE DATABASE appTacks;

-- usando la base de datos
USE appTacks;

-- creando tablas
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    gender VARCHAR(50) NOT NULL
);
-- agregar una columna nueva a la tabla
ALTER TABLE users ADD COLUMN typeDocument ENUM('C.C', 'PS') NOT NULL;

-- agregar registros a la tabla
INSERT INTO `appTacks`.`users` (`document`, `firstName`, `middleName`, `firstSurname`, `secondSurname`, `phone`, `address`, `city`, `typeDocument`) VALUES ('1001917553', 'Juan', 'Camilo', 'Perez', 'Alvarez', '3153004589', 'Calle 55 # 38b', 'Barranquilla', 'PS');

-- mostrar tablas
SHOW TABLES;

-- describir tablas
DESCRIBE users;

----------------------------------

CREATE DATABASE auth_db;
USE auth_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
INSERT INTO `auth_db`.`users` (`username`, `password`) VALUES ('joel', '12345');
