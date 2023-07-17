CREATE DATABASE IF NOT EXISTS FISEIdb;

USE FISEIdb;

/* ESTUDIANTES */
CREATE TABLE IF NOT EXISTS persona(
    cedula_per VARCHAR(25) NOT NULL UNIQUE,
    contrasenia_per VARCHAR(25) NOT NULL,
    conf_contrasenia VARCHAR(25) NOT NULL,
    nombre_per VARCHAR(25) NOT NULL,
    apellido_per VARCHAR(25) NOT NULL,
    telefono_per VARCHAR(25) NOT NULL,
    correo_per VARCHAR(35) NOT NULL,
    direccion_per VARCHAR(50) NOT NULL,
    rol_per VARCHAR(25) NOT NULL CHECK (UPPER(rol_per) IN('estudiante','docente','tecnico')),
    estado INT NOT NULL,
    PRIMARY KEY(cedula_per)
);

DELIMITER //

CREATE TRIGGER asignar_estado_persona
BEFORE INSERT ON persona
FOR EACH ROW
BEGIN
    SET NEW.estado = 1;
END //

DELIMITER ;

/* EQUIPOS */
CREATE TABLE IF NOT EXISTS equipos(
    id_equ INT NOT NULL AUTO_INCREMENT,
    nombre_equ VARCHAR(25) NOT NULL,
    descripcion_equ VARCHAR(25) NOT NULL,
    estado_equ VARCHAR(25) NOT NULL CHECK (UPPER(estado_equ) IN('mantenimiento','dañado','funcional','bloqueado')),
    disponibilidad_equ VARCHAR(35) NOT NULL CHECK (UPPER(disponibilidad_equ) IN('Si','No')),
    estado INT NOT NULL,
    PRIMARY KEY(id_equ)
);

DELIMITER //

CREATE TRIGGER asignar_estado_equipo
BEFORE INSERT ON equipos
FOR EACH ROW
BEGIN
    SET NEW.estado = 1;
END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER actualizar_disponibilidad_equipo
BEFORE UPDATE ON equipos
FOR EACH ROW
BEGIN
    IF NEW.estado_equ IN ('Dañado', 'Bloqueado', 'Mantenimiento') THEN
        SET NEW.disponibilidad_equ = 'No';
    END IF;
END //

DELIMITER ;

/* SOLICITUDES */
CREATE TABLE IF NOT EXISTS solicitudes(
    id_sol INT NOT NULL AUTO_INCREMENT,
    cedula_per VARCHAR(25) NOT NULL,
    id_equ INT NOT NULL,
    fecha_sol DATETIME NOT NULL,
    estado_sol VARCHAR(25) NOT NULL CHECK (UPPER(estado_sol) IN('Aprobado','Rechazado','Pendiente')),
    observaciones_sol VARCHAR(25) NOT NULL,
    estado INT NOT NULL,
    FOREIGN KEY (cedula_per) REFERENCES persona(cedula_per),
    FOREIGN KEY (id_equ) REFERENCES equipos(id_equ),  
    PRIMARY KEY(id_sol)
);

DELIMITER //

CREATE TRIGGER asignar_estado_solicitud
BEFORE INSERT ON solicitudes
FOR EACH ROW
BEGIN
    SET NEW.fecha_sol = NOW();
    SET NEW.estado_sol = "pendiente";
    SET NEW.observaciones_sol = "ninguna";
    SET NEW.estado = 1;
END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER evitar_insercion_solicitudes
BEFORE INSERT ON solicitudes
FOR EACH ROW
BEGIN
    DECLARE disponibilidad VARCHAR(35);
    SELECT disponibilidad_equ INTO disponibilidad FROM equipos WHERE id_equ = NEW.id_equ;
    IF disponibilidad = 'No' THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'No se puede insertar una solicitud para un equipo no disponible.';
    END IF;
END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER evitar_insercion_solicitudes_update
BEFORE UPDATE ON solicitudes
FOR EACH ROW
BEGIN
    DECLARE disponibilidad VARCHAR(35);
    SELECT disponibilidad_equ INTO disponibilidad FROM equipos WHERE id_equ = NEW.id_equ;
    IF disponibilidad = 'No' THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'No se puede insertar una solicitud para un equipo no disponible.';
    END IF;
END //

DELIMITER ;


/* CUSTODIA */
CREATE TABLE IF NOT EXISTS custodia(
    id_cus INT NOT NULL AUTO_INCREMENT,
    cedula_per VARCHAR(25) NOT NULL,
    id_equ INT NOT NULL,
    id_sol INT NOT NULL,
    fecha_cus DATETIME NOT NULL,
    estado INT NOT NULL,
    FOREIGN KEY (cedula_per) REFERENCES persona(cedula_per),
    FOREIGN KEY (id_equ) REFERENCES equipos(id_equ),
    FOREIGN KEY (id_sol) REFERENCES solicitudes(id_sol),
    PRIMARY KEY(id_cus)
);

DELIMITER //

CREATE TRIGGER asignar_estado_custodia
BEFORE INSERT ON custodia
FOR EACH ROW
BEGIN
    SET NEW.fecha_cus = NOW();
    SET NEW.estado = 1;
END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER crear_custodia
AFTER UPDATE ON solicitudes
FOR EACH ROW
BEGIN
	IF NEW.estado_sol = 'Aprobado' THEN
    	INSERT INTO custodia(cedula_per, id_equ, id_sol)
    	VALUES(OLD.cedula_per, OLD.id_equ, OLD.id_sol);
	END IF;
END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER actualizar_disponibilidad_equipo_custodia
BEFORE UPDATE ON solicitudes
FOR EACH ROW
BEGIN
    IF NEW.estado_sol = 'Aprobado' THEN
        UPDATE equipos
        SET disponibilidad_equ = 'No'
        WHERE id_equ = OLD.id_equ;
    END IF;
END //

DELIMITER ;

DELIMITER //


/* DEVOLUCIONES */
CREATE TABLE IF NOT EXISTS devoluciones(
    id_dev INT NOT NULL AUTO_INCREMENT,
    id_cus INT NOT NULL,
    estado_dev VARCHAR(25) NOT NULL,
    fecha_dev DATETIME NOT NULL,
    estado INT NOT NULL,
    FOREIGN KEY (id_cus) REFERENCES custodia(id_cus),
    PRIMARY KEY(id_dev)
);

DELIMITER //

CREATE TRIGGER asignar_estado_devolucion
BEFORE INSERT ON devoluciones
FOR EACH ROW
BEGIN
    SET NEW.fecha_dev = NOW();
    SET NEW.estado = 1;
END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER crear_devolucion
BEFORE UPDATE ON custodia
FOR EACH ROW
BEGIN
	IF NEW.estado = 0 THEN
    	INSERT INTO devoluciones(id_cus)
    	VALUES(OLD.id_cus);
	END IF;
END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER actualizar_estado_equipo_devolucion
AFTER UPDATE ON devoluciones
FOR EACH ROW
BEGIN
    UPDATE equipos
    SET estado_equ = NEW.estado_dev
    WHERE id_equ = (SELECT id_equ FROM custodia WHERE id_cus = NEW.id_cus);
END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER actualizar_disponibilidad_equipo_devolucion
AFTER INSERT ON devoluciones
FOR EACH ROW
BEGIN
    UPDATE equipos
    SET disponibilidad_equ = 'Si'
    WHERE id_equ = (SELECT id_equ FROM custodia WHERE id_cus = NEW.id_cus);
END //

DELIMITER ;
