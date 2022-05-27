DROP DATABASE IF EXISTS transport_enterprise;
CREATE DATABASE transport_enterprise;

USE transport_enterprise;

CREATE TABLE Garage_facility (
	id INT NOT NULL,
	location VARCHAR(100) NOT NULL,
	description VARCHAR(200),
	PRIMARY KEY (id)
);

CREATE TABLE Transport (
	id INT NOT NULL,
	garage_id INT,
	brand VARCHAR(30) NOT NULL,
	model VARCHAR(30) NOT NULL,
	color VARCHAR(20),
	`number` VARCHAR(6),
	receive_date DATE NOT NULL,
	decommissioning_date DATE,
	transport_type VARCHAR(30) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (garage_id) REFERENCES Garage_facility (id)
);

CREATE TABLE Passenger_transport (
	id INT NOT NULL,
	passenger_capacity INT,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Transport (id)
);

CREATE TABLE Freight_transport (
	id INT NOT NULL,
	load_capacity INT,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Transport (id)
);

CREATE TABLE Auxiliary_transport (
	id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Transport (id)
);

CREATE TABLE Taxi (
	id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Passenger_transport (id)
);

CREATE TABLE Car (
	id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Passenger_transport (id)
);

CREATE TABLE Route (
	id INT NOT NULL,
	`number` INT NOT NULL,
	start_point VARCHAR(50) NOT NULL,
	finish_point VARCHAR(50) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE Route_transport (
	id INT NOT NULL,
	route_id INT,
	fare INT,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Passenger_transport (id),
	FOREIGN KEY (route_id) REFERENCES Route (id)
);

CREATE TABLE Bus (
	id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Route_transport (id)
);

CREATE TABLE Minibus (
	id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Route_transport (id)
);

CREATE TABLE Transport_usage (
	id INT NOT NULL,
	transport_id INT NOT NULL,
	start_datetime DATETIME,
	end_datetime DATETIME,
	mileage DECIMAL(8, 2),
	PRIMARY KEY (id),
	FOREIGN KEY (transport_id) REFERENCES Transport (id)
);

CREATE TABLE Passenger_transport_usage (
	id INT NOT NULL,
	transport_id INT NOT NULL,
	passengers INT,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Transport_usage (id),
	FOREIGN KEY (transport_id) REFERENCES Passenger_transport (id),
	FOREIGN KEY (transport_id) REFERENCES Transport_usage (transport_id)
);

CREATE TABLE Freight_transport_usage (
	id INT NOT NULL,
	transport_id INT NOT NULL,
	freight_volume INT,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Transport_usage (id),
	FOREIGN KEY (transport_id) REFERENCES Freight_transport (id),
	FOREIGN KEY (transport_id) REFERENCES Transport_usage (transport_id)
);

CREATE TABLE Auxiliary_transport_usage (
	id INT NOT NULL,
	transport_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Transport_usage (id),
	FOREIGN KEY (transport_id) REFERENCES Auxiliary_transport (id),
	FOREIGN KEY (transport_id) REFERENCES Transport_usage (transport_id)
);

CREATE TABLE Repair (
	id INT NOT NULL,
  	transport_id INT NOT NULL,
	garage_id INT,
	assembly VARCHAR(50),
	cost DECIMAL(12, 2),
	start_datetime DATETIME,
	end_datetime DATETIME,
	description VARCHAR(200),
	PRIMARY KEY (id),
	FOREIGN KEY (transport_id) REFERENCES Transport (id),
	FOREIGN KEY (garage_id) REFERENCES Garage_facility (id)
);

CREATE TABLE Employee (
	id INT NOT NULL,
	name VARCHAR(50) NOT NULL,
	birth_date DATE NOT NULL,
	employee_position VARCHAR(30) NOT NULL,
	chief_id INT,
	employee_type VARCHAR(30),
	PRIMARY KEY (id),
	FOREIGN KEY (chief_id) REFERENCES Employee (id) ON DELETE SET NULL
);

CREATE TABLE Driver (
	id INT NOT NULL,
	transport_id INT,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Employee (id) ON DELETE CASCADE,
	FOREIGN KEY (transport_id) REFERENCES Transport (id)
);

CREATE TABLE Service_staff (
	id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Employee (id) ON DELETE CASCADE
);

CREATE TABLE Technician (
	id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Service_staff (id) ON DELETE CASCADE
);

CREATE TABLE Welder (
	id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Service_staff (id) ON DELETE CASCADE
);

CREATE TABLE Locksmith (
	id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Service_staff (id) ON DELETE CASCADE
);

CREATE TABLE Assembler (
	id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Service_staff (id) ON DELETE CASCADE
);

CREATE TABLE Repair_staff (
	repair_id INT NOT NULL,
	staff_id INT NOT NULL,
	PRIMARY KEY (repair_id, staff_id),
	FOREIGN KEY (repair_id) REFERENCES Repair (id),
	FOREIGN KEY	(staff_id) REFERENCES Service_staff (id) ON DELETE CASCADE
);
