import express from 'express'
import cookieParser from 'cookie-parser'
import mainRouter from './router/mainRouter'
import 'dotenv/config'
import cors from 'cors'
import multer from 'multer'

require('dotenv').config()





const app = express()
app.use(cors({
    origin:'*'
}))




app.use(express.json())
app.use(cookieParser())


app.use('/api/v1',mainRouter)



app.listen(3000, ()=>{
    console.log('server is on')
})