import mysql from "mysql2/promise";
import { config } from "./config";

/* const pool = mysql.createPool(config)

export const connect = async () => {
    return await pool.getConnection();
};  */

export const connect = async()=>{
    const connection =  await mysql.createConnection(config);
    return connection;
}
