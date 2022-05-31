DROP DATABASE IF EXISTS transport_enterprise;
CREATE DATABASE transport_enterprise;

USE transport_enterprise;

CREATE TABLE Garage_facility (
	id INT NOT NULL AUTO_INCREMENT,
	location VARCHAR(100) NOT NULL,
	description VARCHAR(200),
	PRIMARY KEY (id)
);

CREATE TABLE Transport (
	id INT NOT NULL AUTO_INCREMENT,
	garage_id INT,
	brand VARCHAR(30) NOT NULL,
	model VARCHAR(30) NOT NULL,
	color VARCHAR(20),
	`number` VARCHAR(6),
	receive_date DATE NOT NULL,
	decommissioning_date DATE,
	type ENUM('Вспомогательный', 'Грузовой', 'Пассажирский', 'Легковой', 'Такси', 'Маршрутный', 'Автобус', 'Маршрутное такси') NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (garage_id) REFERENCES Garage_facility (id) ON DELETE SET NULL
);

CREATE TABLE Passenger_transport (
	id INT NOT NULL AUTO_INCREMENT,
	passenger_capacity INT,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Transport (id) ON DELETE CASCADE
);

CREATE TABLE Freight_transport (
	id INT NOT NULL AUTO_INCREMENT,
	load_capacity INT, 
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Transport (id) ON DELETE CASCADE
);

CREATE TABLE Auxiliary_transport (
	id INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Transport (id) ON DELETE CASCADE
);

CREATE TABLE Taxi (
	id INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Passenger_transport (id) ON DELETE CASCADE
);

CREATE TABLE Car (
	id INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Passenger_transport (id) ON DELETE CASCADE
);

CREATE TABLE Route (
	id INT NOT NULL AUTO_INCREMENT,
	`number` INT NOT NULL,
	start_point VARCHAR(50) NOT NULL,
	finish_point VARCHAR(50) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE Route_transport (
	id INT NOT NULL AUTO_INCREMENT,
	route_id INT,
	fare INT,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Passenger_transport (id) ON DELETE CASCADE,
	FOREIGN KEY (route_id) REFERENCES Route (id) ON DELETE SET NULL
);

CREATE TABLE Bus (
	id INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Route_transport (id) ON DELETE CASCADE
);

CREATE TABLE Minibus (
	id INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Route_transport (id) ON DELETE CASCADE
);

CREATE TABLE Transport_usage (
	id INT NOT NULL AUTO_INCREMENT,
	start_datetime DATETIME,
	end_datetime DATETIME,
	mileage DECIMAL(8, 2),
	PRIMARY KEY (id)
);

CREATE TABLE Passenger_transport_usage (
	id INT NOT NULL AUTO_INCREMENT,
	transport_id INT NOT NULL,
	passengers INT,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Transport_usage (id) ON DELETE CASCADE,
	FOREIGN KEY (transport_id) REFERENCES Passenger_transport (id) ON DELETE CASCADE
);

CREATE TABLE Freight_transport_usage (
	id INT NOT NULL AUTO_INCREMENT,
	transport_id INT NOT NULL,
	freight_volume INT,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Transport_usage (id) ON DELETE CASCADE,
	FOREIGN KEY (transport_id) REFERENCES Freight_transport (id) ON DELETE CASCADE
);

CREATE TABLE Auxiliary_transport_usage (
	id INT NOT NULL AUTO_INCREMENT,
	transport_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Transport_usage (id) ON DELETE CASCADE,
	FOREIGN KEY (transport_id) REFERENCES Auxiliary_transport (id) ON DELETE CASCADE
);

CREATE TABLE Repair (
	id INT NOT NULL AUTO_INCREMENT,
  	transport_id INT NOT NULL,
	garage_id INT,
	assembly VARCHAR(50) NOT NULL,
	cost DECIMAL(12, 2),
	start_datetime DATETIME,
	end_datetime DATETIME,
	description VARCHAR(200),
	PRIMARY KEY (id),
	FOREIGN KEY (transport_id) REFERENCES Transport (id) ON DELETE CASCADE,
	FOREIGN KEY (garage_id) REFERENCES Garage_facility (id) ON DELETE SET NULL
);

CREATE TABLE Employee (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL,
	birth_date DATE NOT NULL,
	position ENUM('Рабочий', 'Бригадир', 'Мастер', 'Начальник участка', 'Начальник цеха') NOT NULL,
	chief_id INT,
	type ENUM('Водитель', 'Обслуживающий персонал', 'Сборщик', 'Слесарь', 'Сварщик', 'Техник'),
	PRIMARY KEY (id),
	FOREIGN KEY (chief_id) REFERENCES Employee (id) ON DELETE RESTRICT
);

CREATE TABLE Driver (
	id INT NOT NULL AUTO_INCREMENT,
	transport_id INT,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Employee (id) ON DELETE CASCADE,
	FOREIGN KEY (transport_id) REFERENCES Transport (id) ON DELETE SET NULL
);

CREATE TABLE Service_staff (
	id INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Employee (id) ON DELETE CASCADE
);

CREATE TABLE Technician (
	id INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Service_staff (id) ON DELETE CASCADE
);

CREATE TABLE Welder (
	id INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Service_staff (id) ON DELETE CASCADE
);

CREATE TABLE Locksmith (
	id INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Service_staff (id) ON DELETE CASCADE
);

CREATE TABLE Assembler (
	id INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Service_staff (id) ON DELETE CASCADE
);

CREATE TABLE Repair_staff (
	repair_id INT NOT NULL,
	staff_id INT NOT NULL,
	PRIMARY KEY (repair_id, staff_id),
	FOREIGN KEY (repair_id) REFERENCES Repair (id) ON DELETE CASCADE,
	FOREIGN KEY	(staff_id) REFERENCES Service_staff (id) ON DELETE CASCADE
);
