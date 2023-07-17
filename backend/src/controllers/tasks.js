import { conn, connect } from "../database";

/* GETALL */

export const getPersonas = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM persona');
    connection.end();
    res.json(rows);
}

export const getEquipos = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM equipos');
    connection.end();
    res.json(rows);
}

export const getSolicitudes = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM solicitudes');
    connection.end();
    res.json(rows);
}

export const getCustodia = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM custodia');
    connection.end();
    res.json(rows);
}

export const getDevoluciones = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM devoluciones');
    connection.end();
    res.json(rows);
}

/* GETSOME */

export const getPersonasSi = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM persona WHERE estado = 1');
    connection.end();
    res.json(rows);
}

export const getEquiposSi = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM equipos WHERE estado = 1 AND estado_equ = "Funcional" AND disponibilidad_equ = "Si"');
    connection.end();
    res.json(rows);
}

export const getSolicitudesSi = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM solicitudes WHERE estado = 1');
    connection.end();
    res.json(rows);
}

export const getCustodiaSi = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM custodia WHERE estado = 1');
    connection.end();
    res.json(rows);
}

export const getDevolucionesSi = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM devoluciones WHERE estado = 1');
    connection.end();
    res.json(rows);
}

/* GETID */

export const getPersonasCedula = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM persona WHERE cedula_per = ?', [req.params.cedula_per]);
    connection.end();
    res.json(rows[0]);
}

export const getEquiposId = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM equipos WHERE id_equ = ?', [req.params.id_equ]);
    connection.end();
    res.json(rows[0]);
}

export const getSolicitudesId = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM solicitudes WHERE id_sol = ?', [req.params.id_sol]);
    connection.end();
    res.json(rows[0]);
}

export const getCustodiaId = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM custodia WHERE id_cus=?', [req.params.id_cus]);
    connection.end();
    res.json(rows[0]);
}

export const getDevolucionesId = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM devoluciones WHERE id_dev=?', [req.params.id_dev]);
    connection.end();
    res.json(rows[0]);
}

/* COUNTS */

export const getPersonasCount = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT COUNT(*) FROM persona');
    connection.end();
    res.json(rows[0]["COUNT(*)"]);
}

export const getEquiposCount = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT COUNT(*) FROM equipos');
    connection.end();
    res.json(rows[0]["COUNT(*)"]);
}

export const getSolicitudesCount = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT COUNT(*) FROM solicitudes');
    connection.end();
    res.json(rows[0]["COUNT(*)"]);
}

export const getCustodiasCount = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT COUNT(*) FROM custodia');
    connection.end();
    res.json(rows[0]["COUNT(*)"]);
}

export const getDevolucionesCount = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT COUNT(*) FROM devoluciones');
    connection.end();
    res.json(rows[0]["COUNT(*)"]);
}

/* CREATES */

export const createPersona = async (req, res) => {
    const connection = await connect();
    const [result] = await connection.query("INSERT INTO persona(cedula_per, contrasenia_per, conf_contrasenia,nombre_per, apellido_per, telefono_per, correo_per, direccion_per, rol_per) VALUES (?,?,?,?,?,?,?,?,?)", [
        req.body.cedula_per,
        req.body.contrasenia_per,
        req.body.conf_contrasenia,
        req.body.nombre_per,
        req.body.apellido_per,
        req.body.telefono_per,
        req.body.correo_per,
        req.body.direccion_per,
        req.body.rol_per
    ]);
    connection.end();
    res.json({
        rows: result.affectedRows,
        ...req.body
    });
};

export const createEquipo = async (req, res) => {
    const connection = await connect();
    const [result] = await connection.query("INSERT INTO equipos(nombre_equ, descripcion_equ, estado_equ, disponibilidad_equ) VALUES (?,?,?,?)",
        [
            req.body.nombre_equ,
            req.body.descripcion_equ,
            req.body.estado_equ,
            req.body.disponibilidad_equ
        ]);
    connection.end();
    res.json({
        id: result.insertId,
        ...req.body
    });
};

export const createSolicitudes = async (req, res) => {
    const connection = await connect();
    const [result] = await connection.query("INSERT INTO solicitudes(cedula_per, id_equ) VALUES(?,?)", [
        req.body.cedula_per,
        req.body.id_equ
    ]);
    connection.end();
    res.json({
        id: result.insertId,
        ...req.body
    });
}

/* UPDATES */

export const updatePersona = async (req, res) => {
    const connection = await connect();
    const result = await connection.query("UPDATE persona SET ? WHERE cedula_per = ?", [
        req.body,
        req.params.cedula_per
    ]);
    connection.end();
    res.json({
        id: result.affectedRows,
        ...req.body
    });
}

export const updateEquipo = async (req, res) => {
    const connection = await connect();
    const result = await connection.query("UPDATE equipos SET ? WHERE id_equ = ?", [
        req.body,
        req.params.id_equ
    ]);
    connection.end();
    res.json({
        id: result.affectedRows,
        ...req.body
    });
}

export const updateSolicitudes = async (req, res) => {
    const connection = await connect();
    const result = await connection.query("UPDATE solicitudes SET estado_sol = ?, observaciones_sol = ? WHERE id_sol = ?", [
        req.body.estado_sol,
        req.body.observaciones_sol,
        req.params.id_sol
    ]);
    connection.end();
    res.json({
        id: result.affectedRows,
        ...req.body
    });
}

export const updateDevoluciones = async (req, res) => {
    const connection = await connect();
    const result = await connection.query("UPDATE devoluciones SET estado_dev = ? WHERE id_dev = ?", [
        req.body.estado_dev,
        req.params.id_dev
    ]);
    connection.end();
    res.json({
        id: result.affectedRows,
        ...req.body
    });
}

/* DELETES */

export const deletePersona = async (req, res) => {
    const connection = await connect();
    const result = await connection.query("UPDATE persona SET estado = '0' WHERE cedula_per = ?", [
        req.params.cedula_per
    ]);
    connection.end();
    res.json({
        id: result.affectedRows,
        ...req.body
    });
}

export const deleteEquipo = async (req, res) => {
    const connection = await connect();
    const result = await connection.query("UPDATE equipos SET estado = '0' WHERE id_equ = ?", [
        req.params.id_equ
    ]);
    connection.end();
    res.json({
        id: result.affectedRows,
        ...req.body
    });
}

export const deleteSolicitudes = async (req, res) => {
    const connection = await connect();
    const result = await connection.query("UPDATE solicitudes SET estado = '0' WHERE id_sol = ?", [
        req.params.id_sol
    ]);
    connection.end();
    res.json({
        id: result.affectedRows,
        ...req.body
    });
}

export const deleteCustodia = async (req, res) => {
    const connection = await connect();
    const result = await connection.query("UPDATE custodia SET estado = '0' WHERE id_cus = ?", [
        req.params.id_cus
    ]);
    connection.end();
    res.json({
        id: result.affectedRows,
        ...req.body
    });
}

export const deleteDevoluciones = async (req, res) => {
    const connection = await connect();
    const result = await connection.query("UPDATE devoluciones SET estado = '0' WHERE id_dev = ?", [
        req.params.id_dev
    ]);
    connection.end();
    res.json({
        id: result.affectedRows,
        ...req.body
    });
}

/* ACTIVATES */

export const activatePersona = async (req, res) => {
    const connection = await connect();
    const result = await connection.query("UPDATE persona SET estado = '1' WHERE cedula_per = ?", [
        req.params.cedula_per
    ]);
    connection.end();
    res.json({
        id: result.affectedRows,
        ...req.body
    });
}

export const activateEquipo = async (req, res) => {
    const connection = await connect();
    const result = await connection.query("UPDATE equipos SET estado = '1' WHERE id_equ = ?", [
        req.params.id_equ
    ]);
    connection.end();
    res.json({
        id: result.affectedRows,
        ...req.body
    });
}

export const activateSolicitudes = async (req, res) => {
    const connection = await connect();
    const result = await connection.query("UPDATE solicitudes SET estado = '1' WHERE id_sol = ?", [
        req.params.id_sol
    ]);
    connection.end();
    res.json({
        id: result.affectedRows,
        ...req.body
    });
}

export const activateCustodia = async (req, res) => {
    const connection = await connect();
    const result = await connection.query("UPDATE custodia SET estado = '1' WHERE id_cus = ?", [
        req.params.id_cus
    ]);
    connection.end();
    res.json({
        id: result.affectedRows,
        ...req.body
    });
}

export const activateDevoluciones = async (req, res) => {
    const connection = await connect();
    const result = await connection.query("UPDATE devoluciones SET estado = '1' WHERE id_dev = ?", [
        req.params.id_dev
    ]);
    connection.end();
    res.json({
        id: result.affectedRows,
        ...req.body
    });
}



/* LOGIN */

export const login = async (req, res) => {
    const { cedula, contrasenia } = req.body;
    const connection = await connect();

    try {

        // Verificar si la persona es un técnico
        const [personaRows] = await connection.query(
            'SELECT * FROM persona WHERE cedula_per = ? AND contrasenia_per = ? AND rol_per = "Tecnico"',
            [cedula, contrasenia]
        );


        if (personaRows.length > 0) {
            // El usuario es un técnico
            res.json({ message: 'Inicio de sesión exitoso como técnico', rol: 'Tecnico', ced: cedula });
            return;
        }

        // Verificar si la persona es un estudiante o docente
        const [personaEstudianteRows] = await connection.query(
            'SELECT * FROM persona WHERE cedula_per = ? AND contrasenia_per = ? AND rol_per = "estudiante"',
            [cedula, contrasenia]
        );

        if (personaEstudianteRows.length > 0) {
            // El usuario es un estudiante
            res.json({ message: 'Inicio de sesión exitoso como estudiante', rol: 'Estudiante', ced: cedula });
            return;
        }

        const [personaDocenteRows] = await connection.query(
            'SELECT * FROM persona WHERE cedula_per = ? AND contrasenia_per = ? AND rol_per = "docente"',
            [cedula, contrasenia]
        );

        if (personaDocenteRows.length > 0) {
            // El usuario es un docente
            res.json({ message: 'Inicio de sesión exitoso como docente', rol: 'Docente', ced: cedula });
            return;
        }

        // Las credenciales no coinciden con ningún usuario
        res.status(401).json({ error: 'Credenciales inválidas' });

    } catch (error) {
        console.error('Error en la función login:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    } finally {
        connection.end(); // Cerrar la conexión en caso de error también
    }
};



/* BUSCAR */

export const getSolicitudesByCedula = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM solicitudes WHERE cedula_per = ? AND estado = 1', [req.params.cedula_per]);
    connection.end();
    res.json(rows);
};

export const getCustodiaByCedula = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM custodia WHERE cedula_per = ? AND estado = 1', [req.params.cedula_per]);
    connection.end();
    res.json(rows);
};


export const getDevolucionesByCedula = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM devoluciones INNER JOIN custodia ON devoluciones.id_cus = custodia.id_cus WHERE custodia.cedula_per = ? AND devoluciones.estado = 1', [req.params.cedula_per]);
    connection.end();
    res.json(rows);
};

