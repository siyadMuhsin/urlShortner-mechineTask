import express ,{Request,Response}from 'express';
import dotenv from 'dotenv'
import authRouter from './routes/auth.routes'
dotenv.config()
import cors from 'cors'
import connectDB from './config/db';
import limiter from './utils/retelimiting';
import urlRoute from './routes/url.routes';
import cookieParser from 'cookie-parser';
const app=express()
const clientApli=process.env.CLIENT_URL 
const corsOptions:cors.CorsOptions ={
    origin:clientApli,
    methods:['GET','POST','PUT','DELETE'],
    credentials:true,
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
connectDB()
app.use(limiter)
app.use('/auth',authRouter)
app.use('/url',urlRoute)
app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})