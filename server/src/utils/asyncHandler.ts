import {Response, Request, NextFunction } from "express"


const asyncHandler = (cb:Function) => async(req:Request, res:Response, next:NextFunction) =>{
    try {
        await cb(req, res, next)
    } catch (error:unknown) {
        const errMessage = error instanceof Error ? error.message : 'Something went wrong';

        res.status(500).json({
                        success: false,
                        message: errMessage
                    })     
    }
}

export {asyncHandler}