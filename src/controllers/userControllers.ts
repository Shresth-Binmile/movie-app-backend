import { StatusCodes } from "http-status-codes"
import { Request, Response } from "express"
import messages from "../utils/messages"
import Users from "../models/userModel"
import jwt from 'jsonwebtoken'
import bcryptjs, { genSalt } from 'bcryptjs'
import { ENV } from "../configs/server-config"
import { validationResult } from "express-validator"

export const registerHandler = async(req:Request, res:Response) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.CONFLICT).json({
                success: false,
                messages: messages.INVALID_CREDENTIALS,
                errors: errors,
                data: {}
            })
        }
        
        const {name, password, phoneNo} = req.body

        const user = await Users.findOne({where: {phoneNo}})   // SELECT * FROM Users WHERE phoneNo = phoneNo;

        if(user){
            return res.status(StatusCodes.FORBIDDEN).json({
                success: false,
                message: messages.USER_EXISTS,
                error: {},
                data: {}
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)

        const newUser = await Users.create({                   // INSERT INTO Users (name, password, phoneNo) VALUES (name, hashPassword, phoneNo);
            name,
            password: hashPassword,
            phoneNo
        })

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: messages.REGISTER_SUCCESS,
            error: {},
            data: {}
        })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: messages.REGISTER_FAILED,
            error: error,
            data: {}
        })
    }
}

export const loginHandler = async(req:Request, res:Response) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.CONFLICT).json({
                success: false,
                messages: messages.INVALID_CREDENTIALS,
                errors: errors,
                data: {}
            })
        }

        const {name, password} = req.body

        const user = await Users.findOne({where: {name}})    // SELECT * FROM Users WHERE name = name;
        
        if(!user){
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: messages.USER_NOT_EXISTS,
                error: messages.USER_NOT_EXISTS,
                data: {}                
            })
        }

        const isMatch = await bcryptjs.compare(password, user.dataValues.password)
        if(!isMatch){
            return res.status(StatusCodes.CONFLICT).json({
                success: false,
                message: messages.INVALID_CREDENTIALS,
                error: messages.INVALID_CREDENTIALS,
                data: {}
            })
        }

        const token = jwt.sign({id: user.dataValues.id}, ENV.JWT_SECRET_KEY, {
            expiresIn: '1h'
        })

        // res.cookie('token', token, {httpOnly: true})

        return res.cookie('token', token, {httpOnly: true}).status(StatusCodes.OK).json({
            success: true,
            message: messages.LOGIN_SUCCESS,
            error: {},
            data: req.body
        })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: messages.LOGIN_FAILED,
            error: error,
            data: {}
        })
    }
}