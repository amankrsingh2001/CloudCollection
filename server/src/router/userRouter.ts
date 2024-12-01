import express from 'express'
import {  signIn, signUp, updateUserAvatar } from '../controller/userController'
import { upload } from '../middlewares/multerMiddleware'
import { auth } from '../middlewares/auth'
import { otp } from '../controller/otpController'



const userRouter = express.Router()



userRouter.post('/signup', signUp)
userRouter.post('/signin', signIn)
userRouter.post('/otp', otp)


userRouter.put('/updateAvatar', auth, upload.single('avatar'), updateUserAvatar)
// userRouter.put('updateUser)
// userRouter.post('changePassword')
// userRouter.delete('deleteUser')
// userRouter.post('forgotpassword)
// userRouter.post('otp')
//userRouter.post('refreshAuth')


export default userRouter