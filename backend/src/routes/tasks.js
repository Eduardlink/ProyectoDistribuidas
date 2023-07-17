import { Router }  from 'express';
import { activateCustodia, activateDevoluciones, activateEquipo, activatePersona, activateSolicitudes, createEquipo, createPersona, createSolicitudes, deleteCustodia, deleteDevoluciones, deleteEquipo, deletePersona, deleteSolicitudes, getCustodia, getCustodiaId, getCustodiaSi, getCustodiasCount, getDevoluciones, getDevolucionesCount, getDevolucionesId, getDevolucionesSi, getEquipos, getEquiposCount, getEquiposId, getEquiposSi, getPersonas, getPersonasCedula, getPersonasCount, getPersonasSi, getSolicitudes, getSolicitudesCount, getSolicitudesId, getSolicitudesSi, updateDevoluciones, updateEquipo, updatePersona, updateSolicitudes, login, getSolicitudesByCedula, getCustodiaByCedula, getDevolucionesByCedula } from '../controllers/tasks';

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Persona
 *  description: Todo el CRUD de persona
 */

/**
 * @swagger
 * tags:
 *  name: Equipos
 *  description: Todo el CRUD de equipos
 */

/**
 * @swagger
 * tags:
 *  name: Solicitudes
 *  description: Todo servicio de solicitudes
 */

/**
 * @swagger
 * tags:
 *  name: Custodia
 *  description: Todo servicio de custodia
 */

/**
 * @swagger
 * tags:
 *  name: Devoluciones
 *  description: Todo servicio de devoluciones
 */




/**
 * @swagger
 * /persona:
 *  get:
 *      summary: Obtiene todas las personas
 *      tags: [Persona]
 */
router.get('/persona', getPersonas)

/** 
 * @swagger
 * /equipos:
 *  get:
 *      summary: Obtiene todos los equipos
 *      tags: [Equipos]
*/
router.get('/equipos', getEquipos)

/** 
 * @swagger
 * /solicitudes:
 *  get:
 *      summary: Obtiene todas las solicitudes
 *      tags: [Solicitudes]
*/
router.get('/solicitudes', getSolicitudes)

/** 
 * @swagger
 * /custodia:
 *  get:
 *      summary: Obtiene todas las custodias
 *      tags: [Custodia]
*/
router.get('/custodia', getCustodia)

/** 
 * @swagger
 * /devoluciones:
 *  get:
 *      summary: Obtiene todas las devoluciones
 *      tags: [Devoluciones]
*/
router.get('/devoluciones', getDevoluciones)

/** 
 * @swagger
 * /persona/si:
 *  get:
 *      summary: Obtiene todas las personas si
 *      tags: [Persona]
*/
router.get('/persona/si', getPersonasSi)

/** 
 * @swagger
 * /equipos/si:
 *  get:
 *      summary: Obtiene todos los equipos si
 *      tags: [Equipos]
*/
router.get('/equipos/si', getEquiposSi)

/** 
 * @swagger
 * /solicitudes/si:
 *  get:
 *      summary: Obtiene todas las solicitudes si
 *      tags: [Solicitudes]
*/
router.get('/solicitudes/si', getSolicitudesSi)

/** 
 * @swagger
 * /custodia/si:
 *  get:
 *      summary: Obtiene todas las custodias si
 *      tags: [Custodia]
*/
router.get('/custodia/si', getCustodiaSi)

/** 
 * @swagger
 * /devoluciones/si:
 *  get:
 *      summary: Obtiene todas las devoluciones si
 *      tags: [Devoluciones]
*/
router.get('/devoluciones/si', getDevolucionesSi)

/** 
 * @swagger
 * /persona/count:
 *  get:
 *      summary: Obtiene total de las personas
 *      tags: [Persona]
*/
router.get('/persona/count', getPersonasCount)

/** 
 * @swagger
 * /equipos/count:
 *  get:
 *      summary: Obtiene total del equipos
 *      tags: [Equipos]
*/
router.get('/equipos/count', getEquiposCount)

/** 
 * @swagger
 * /solicitudes/count:
 *  get:
 *      summary: Obtiene total de las solicitudes
 *      tags: [Solicitudes]
*/
router.get('/solicitudes/count', getSolicitudesCount)

/** 
 * @swagger
 * /custodia/count:
 *  get:
 *      summary: Obtiene total de las custodias
 *      tags: [Custodia]
*/
router.get('/custodia/count', getCustodiasCount)

/** 
 * @swagger
 * /devoluciones/count:
 *  get:
 *      summary: Obtiene total de las devoluciones
 *      tags: [Devoluciones]
*/
router.get('/devoluciones/count', getDevolucionesCount)

/** 
 * @swagger
 * /persona:
 *  get:
 *      summary: Obtiene persona por cedula
 *      tags: [Persona]
*/
router.get('/persona/:cedula_per', getPersonasCedula)

/** 
 * @swagger
 * /equipos:
 *  get:
 *      summary: Obtiene equipos por id
 *      tags: [Equipos]
*/
router.get('/equipos/:id_equ', getEquiposId)

/** 
 * @swagger
 * /solicitudes:
 *  get:
 *      summary: Obtiene solicitudes por id
 *      tags: [Solicitudes]
*/
router.get('/solicitudes/:id_sol', getSolicitudesId)

/** 
 * @swagger
 * /custodia:
 *  get:
 *      summary: Obtiene custodia por id
 *      tags: [Custodia]
*/
router.get('/custodia/:id_cus', getCustodiaId)

/** 
 * @swagger
 * /devoluciones:
 *  get:
 *      summary: Obtiene devoluciones por id
 *      tags: [Devoluciones]
*/
router.get('/devoluciones/:id_dev', getDevolucionesId)

/** 
 * @swagger
 * /persona:
 *  post:
 *      summary: Crea persona
 *      tags: [Persona]
*/
router.post('/persona', createPersona)

/** 
 * @swagger
 * /equipos:
 *  post:
 *      summary: Crea equipos
 *      tags: [Equipos]
*/
router.post('/equipos', createEquipo)

/** 
 * @swagger
 * /solicitudes:
 *  post:
 *      summary: Crea solicitudes
 *      tags: [Solicitudes]
*/
router.post('/solicitudes', createSolicitudes)

/** 
 * @swagger
 * /persona:
 *  put:
 *      summary: Editar persona
 *      tags: [Persona]
*/
router.put('/persona/:cedula_per', updatePersona)

/** 
 * @swagger
 * /equipos:
 *  put:
 *      summary: Editar equipos
 *      tags: [Equipos]
*/
router.put('/equipos/:id_equ', updateEquipo)

/** 
 * @swagger
 * /solicitudes:
 *  put:
 *      summary: Editar solicitudes
 *      tags: [Solicitudes]
*/
router.put('/solicitudes/:id_sol', updateSolicitudes)

/** 
 * @swagger
 * /devoluciones:
 *  put:
 *      summary: Editar devoluciones
 *      tags: [Devoluciones]
*/
router.put('/devoluciones/:id_dev', updateDevoluciones)

/** 
 * @swagger
 * /persona/delete:
 *  put:
 *      summary: Eliminar persona
 *      tags: [Persona]
*/
router.put('/persona/delete/:cedula_per', deletePersona)

/** 
 * @swagger
 * /equipos/delete:
 *  put:
 *      summary: Eliminar equipos
 *      tags: [Equipos]
*/
router.put('/equipos/delete/:id_equ', deleteEquipo)

/** 
 * @swagger
 * /solicitudes/delete:
 *  put:
 *      summary: Eliminar solicitudes
 *      tags: [Solicitudes]
*/
router.put('/solicitudes/delete/:id_sol', deleteSolicitudes)

/** 
 * @swagger
 * /custodia/delete:
 *  put:
 *      summary: Eliminar custodia
 *      tags: [Custodia]
*/
router.put('/custodia/delete/:id_cus', deleteCustodia)

/** 
 * @swagger
 * /devoluciones/delete:
 *  put:
 *      summary: Eliminar devoluciones
 *      tags: [Devoluciones]
*/
router.put('/devoluciones/delete/:id_dev', deleteDevoluciones)

/** 
 * @swagger
 * /persona/activate:
 *  put:
 *      summary: Activar persona
 *      tags: [Persona]
*/
router.put('/persona/activate/:cedula_per', activatePersona)

/** 
 * @swagger
 * /equipos/activate:
 *  put:
 *      summary: Activar equipos
 *      tags: [Equipos]
*/
router.put('/equipos/activate/:id_equ', activateEquipo)

/** 
 * @swagger
 * /solicitudes/activate:
 *  put:
 *      summary: Activar solicitudes
 *      tags: [Solicitudes]
*/
router.put('/solicitudes/activate/:id_sol', activateSolicitudes)

/** 
 * @swagger
 * /custodia/activate:
 *  put:
 *      summary: Activar custodia
 *      tags: [Custodia]
*/
router.put('/custodia/activate/:id_cus', activateCustodia)

/** 
 * @swagger
 * /devoluciones/activate:
 *  put:
 *      summary: Activar devoluciones
 *      tags: [Devoluciones]
*/
router.put('/devoluciones/activate/:id_dev', activateDevoluciones)

/**
 * @swagger
 * /login:
 *  post:
 *      summary: Inicio de sesión
 *      tags: [Autenticación]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                cedula:
 *                  type: string
 *                contrasenia:
 *                  type: string
 *              required:
 *                - cedula
 *                - contrasenia
 *      responses:
 *        200:
 *          description: Inicio de sesión exitoso
 *        401:
 *          description: Credenciales inválidas
 */
router.post('/login', login);

/**
 * @swagger
 * /persona:
 *  get:
 *      summary: Obtiene solicitudes x cedula
 *      tags: [Solicitudes]
 */
router.get('/solicitudes/buscar/:cedula_per', getSolicitudesByCedula)

/**
 * @swagger
 * /persona:
 *  get:
 *      summary: Obtiene custodia x cedula
 *      tags: [Custodia]
 */
router.get('/custodia/buscar/:cedula_per', getCustodiaByCedula)

/**
 * @swagger
 * /persona:
 *  get:
 *      summary: Obtiene devoluciones x cedula
 *      tags: [Devoluciones]
 */
router.get('/devoluciones/buscar/:cedula_per', getDevolucionesByCedula)

export default router