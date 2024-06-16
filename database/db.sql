-- creando base de datos
CREATE DATABASE pruebaBackend;

-- usando la base de datos
USE pruebaBackend;

-- creando tablas
CREATE TABLE users (
    typeDocument ENUM('C.C', 'PS') NOT NULL,
    document INT(11) UNSIGNED PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    middleName VARCHAR(50) NOT NULL,
    firstSurname VARCHAR(50) NOT NULL,
    secondSurname VARCHAR(50) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    address VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL
);
-- agregar una columna nueva a la tabla
ALTER TABLE users ADD COLUMN typeDocument ENUM('C.C', 'PS') NOT NULL;

-- agregar registros a la tabla
INSERT INTO `pruebabackend`.`users` (`document`, `firstName`, `middleName`, `firstSurname`, `secondSurname`, `phone`, `address`, `city`, `typeDocument`) VALUES ('1001917553', 'Juan', 'Camilo', 'Perez', 'Alvarez', '3153004589', 'Calle 55 # 38b', 'Barranquilla', 'PS');

-- mostrar tablas
SHOW TABLES;

-- describir tablas
DESCRIBE users;
