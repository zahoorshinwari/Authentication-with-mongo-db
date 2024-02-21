import  express  from "express";
import dotenv from 'dotenv'
dotenv.config()
import { UserRouter } from "./routes/user.js";
import mongoose from "mongoose";
import cors from 'cors'
import cookieParser from "cookie-parser";


const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))
app.use(cookieParser())
app.use('/auth', UserRouter)


mongoose.connect('mongodb://localhost:27017/authentication')


app.listen(process.env.PORT, () => {
    console.log("server is running");
})