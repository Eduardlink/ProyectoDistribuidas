import { config as dotenv } from 'dotenv';
dotenv();


export const config = {
    host: process.env.hostDB,
    user: process.env.userDB,
    password: process.env.passwordDB,
    database: process.env.databaseDB
}