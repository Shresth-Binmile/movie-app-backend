import { StatusCodes } from "http-status-codes"
import { Request, Response } from "express"
import messages from "../utils/messages"
import jwt, {JwtPayload} from 'jsonwebtoken'
import { ENV } from "../configs/server-config"
import comRats from "../models/commentRatingModel"
import { where } from "sequelize"

export const getCommentsAndRatings = async(req: Request, res: Response) => {
    try {
        const {imdbID} = req.query
        const token = req.headers.token?.toString()

        if(!token){
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: messages.TOKEN_EXPIRED,
                error: messages.TOKEN_EXPIRED,
                data: {}
            })
        }

        const decodedToken = JSON.parse(JSON.stringify(jwt.verify(token, ENV.JWT_SECRET_KEY)))
        const userID = decodedToken.id

        const comsRatsData = await comRats.findAll({where: {imdbID}})

        return res.status(StatusCodes.OK).json({
            success: true,
            message: messages.FETCH_SUCCESS,
            error: {},
            data: comsRatsData
        })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: messages.PROBLEM_IN_FETCH,
            error: error,
            data: {}
        })
    }
}

export const addCommentsAndRatings = async(req: Request, res: Response) => {
    try {
        const {imdbID} = req.query
        const {comments, ratings} = req.body
        const token = req.headers.token?.toString()

        if(!token){
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: messages.TOKEN_EXPIRED,
                error: messages.TOKEN_EXPIRED,
                data: {}
            })
        }

        const decodedToken = JSON.parse(JSON.stringify(jwt.verify(token, ENV.JWT_SECRET_KEY)))
        const userID = decodedToken.id
        // console.log({
        //     userID,
        //     imdbID,
        //     comments,
        //     ratings
        // })
        const newComment = await comRats.create({
            imdbID,
            userID,
            comments,
            ratings
        })

        await comRats.update({ratings: ratings}, {where: {userID}})

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: messages.COMMENTS_ADDED,
            error: {},
            data: {}
        })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: messages.ADD_COMMENTS_ERR,
            error: error,
            data: {}
        })
    }
}