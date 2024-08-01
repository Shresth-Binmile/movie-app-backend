import { Sequelize } from "sequelize";
import { ENV } from "../configs/server-config";

export const sequelize = new Sequelize('Movie_Backend', ENV.DB_USER, ENV.DB_PASS, {
    host: 'localhost',
    dialect: 'mysql'
});