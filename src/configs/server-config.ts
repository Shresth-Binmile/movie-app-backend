import dotenv from 'dotenv'
import { env } from '../interfaces/configInterface'

dotenv.config()

export const ENV:env = {
    PORT: process.env.PORT!,
    DB_USER: process.env.DB_USER!,
    DB_PASS: process.env.DB_PASS!,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY!
}
