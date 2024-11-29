import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { uploadOnCloudinary } from '../utils/cloudinaryUpload';
import { asyncHandler } from '../utils/asyncHandler';

import { ApiError } from '../utils/errorHandler';
import { ApiResponse } from '../utils/apiResponse';



const prisma = new PrismaClient()


interface AuthenticatedRequest extends Request {
    authorization?: string;
}


export const signUp = asyncHandler( async(req:Request, res:Response) =>{

     try {
           const {username, email, password, firstName, lastName, dateofBirth} = req.body.formValue
           const saltRounds = 10;
           const salt = bcrypt.genSaltSync(saltRounds);
           const hashepassword = bcrypt.hashSync(password, salt);
   
           const user = await prisma.user.create({
               data:{
                   email: email,
                   password: hashepassword,
                   username:username,
                   firstName:firstName,
                   lastName:lastName,
                   image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
                   dateofBirth:dateofBirth
               }
           })
           if(!user.id){
               throw new ApiError(402, 'failed to create account', false)
           }
   
           return res.status(200).json(
               new ApiResponse(true, "Account created Successfully",{})
           )
     } catch (error) {
            throw new ApiError(500, 'Something went terribly wrong', false)
     }
        
    }
)


export const signIn = async(req:Request, res:Response) =>{
    try {
        const {username, password, email} = req.body


        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: username },
                    { email: email },
                    ],  
                 },
                })
       if(user === null) throw new ApiError(402, "User isn't valid", false)
       

       const validPasswrd = await bcrypt.compare(password, user.password)

       if(!validPasswrd) throw new ApiError(401, "Username or password isn't valid", false)

       const refreshToken = jwt.sign({id: user.id}, process.env.REFRESH_TOKEN_SECRET as string,{
        expiresIn:"10d"
         })
         

        const updateUser = await prisma.user.update({
            where:{
                id:user.id
            }, 
            data:{
                refreshToken:`bearer ${refreshToken}`
            },
            select:{
                id:true,
                password:false,
                email:true,
                firstName:true,
                lastName:true,
                image:true,
            }
        })

        if(!updateUser.id) throw new ApiError(402, "Loggin Failed,Please try again", false)


        const accessToken = jwt.sign({id: updateUser.id}, process.env.ACCESS_TOKEN_SECRET as string,{
            expiresIn:'5h'
        })

        const refreshTokenFinal = `Bearer ${refreshToken}`
        const accessTokenFinal = `Bearer ${accessToken}`

      res.status(200).cookie('refreshToken', refreshTokenFinal, { httpOnly: true, secure: true }).cookie('token', accessTokenFinal, { httpOnly: true, secure: true }).json(new ApiResponse(true, 'signIn successfully', updateUser))
        return ;
    } catch (error:any) {
        throw new ApiError(500, error.message, false)
    }
}

// export const updateAvatar = async(req:Request, res:Response) =>{
//     const user = req?.userId
// }

export const updateUserAvatar = async(req:Request, res:Response) =>{
    const authorizationToken = (req as AuthenticatedRequest).authorization;
   try {

     if (!authorizationToken) {
         res.status(403).json({ success: false, message: 'Forbidden' });
         return 
    }

    res.status(200).json(new ApiResponse(true, "Sent token ", authorizationToken))
     return;
 
   } catch (error) {
         new ApiError(500, 'Something went wrong', false)
   }}