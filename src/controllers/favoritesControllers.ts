import { StatusCodes } from "http-status-codes"
import { Request, Response } from "express"
import messages from "../utils/messages"
import favs from "../models/favoritesModel"
import jwt, {JwtPayload} from 'jsonwebtoken'
import { ENV } from "../configs/server-config"

export const getFavorites = async(req: Request, res: Response) => {
    try {
        // const token = req.headers.token?.toString()
        const {token} = req.cookies

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
        const favorites = await favs.findAll({where: {userID}})     // SELECT * FROM favs WHERE userID = userID;

        return res.status(StatusCodes.OK).json({
            success: true,
            message: messages.FETCH_SUCCESS,
            error: {},
            data: favorites
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

export const addFavorites = async(req: Request, res: Response) => {
    try {
        const {imdbID} = req.query
        // const token = req.headers.token?.toString()
        const {token} = req.cookies

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
        const favMovie = await favs.findOne({where: {imdbID, userID}})     // SELECT * FROM favs WHERE userID = userID AND imdbID = imdbID;

        if(favMovie){
            return res.status(StatusCodes.FORBIDDEN).json({
                success: false,
                message: messages.EXIST_IN_FAVORITES,
                error: messages.EXIST_IN_FAVORITES,
                data: {}
            })
        }

        const newFavoriteMovie = await favs.create({                       // INSERT INTO favs (imdbID, userID) VALUES (imdbID, userID);
            imdbID,
            userID
        })

        return res.status(StatusCodes.OK).json({
            success: true,
            message: messages.FAVORITES_ADDED,
            error: {},
            data: {imdbID, userID}
        })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: messages.ADD_FAVORITES_ERR,
            error: error,
            data: {}
        })
    }
}

export const removeFavorites = async(req: Request, res: Response) => {
    try {
        const {imdbID} = req.query
        // const token = req.headers.token?.toString()
        const {token} = req.cookies

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
        const favMovie = await favs.findOne({where: {imdbID, userID}})         // SELECT * FROM favs WHERE imdbID = imdbID AND userID = userID;

        if(!favMovie){
            return res.status(StatusCodes.FORBIDDEN).json({
                success: false,
                message: messages.NOT_IN_FAVORITES,
                error: messages.NOT_IN_FAVORITES,
                data: {}
            })
        }

        const removedMovie = await favs.destroy({where: {imdbID, userID}})     // DELETE FROM favs WHERE userID = userID AND imdbID = imdbID;
        console.log(removedMovie)

        return res.status(StatusCodes.OK).json({
            success: true,
            message: messages.REMOVED,
            error: {},
            data: {}
        })
        
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: messages.REMOVE_FAVORITES_ERR,
            error: error,
            data: {}
        })
    }
}