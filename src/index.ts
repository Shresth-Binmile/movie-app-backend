import express from 'express'
import cookieParser from 'cookie-parser'
import router from './routes/v1/route'
import { ENV } from './configs/server-config'
import {StatusCodes} from 'http-status-codes'
import { sequelize } from './utils/connectDB'
import messages from './utils/messages'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use('/api/v1', router)

app.get('/', (_req, res)=>{
    try {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: true,
            message: messages.WELCOME,
            error: {},
            data: {}
        })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: messages.PROBLEM_IN_FETCH,
            error: error,
            data: {}
        })
    }
})

app.listen(ENV.PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log(`Server is listening on port no: ${ENV.PORT}. Connection has been established successfully.`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})