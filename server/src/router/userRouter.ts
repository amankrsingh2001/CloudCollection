import express from 'express'
import { signIn, signUp, updateUserAvatar } from '../controller/userController'
import { upload } from '../middlewares/multerMiddleware'
import { auth } from '../middlewares/auth'


const userRouter = express.Router()



userRouter.post('/signup', signUp)
userRouter.post('/signin', signIn)
userRouter.post('/userRouter', auth, upload.single('avatar'), updateUserAvatar)



export default userRouter