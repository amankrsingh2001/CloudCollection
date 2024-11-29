import { config } from 'dotenv';
import {Request,Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { ApiError } from '../utils/errorHandler';
require('dotenv').config()


interface AuthenticatedRequest extends Request {
    authorization?: string | JwtPayload 
}

const auth = async(req:Request, res:Response, next:NextFunction) =>{
    try {
        const authToken = req.cookies.token;
        const token = authToken.split(' ')[1]

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);

         if (typeof decodedToken === 'string') {
            throw new ApiError(401, "Invalid token format", false);        }

        if(!decodedToken) {
            throw new ApiError(401, "Unatuhorized", false)
        }
        (req as AuthenticatedRequest).authorization = decodedToken?.id; //type assertion 
        next()
    } catch (error) {
        throw new ApiError(500, "Something went wrong", false)
    }
}

export {auth}