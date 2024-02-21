import express, { application } from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/User.js'
import  jwt  from 'jsonwebtoken'
import nodemailer from 'nodemailer'
dotenv.config()
import dotenv from 'dotenv'

const router = express.Router()

router.post('/signup', async (req, res) => {
    const {username, email, password} = req.body;
    const user = await User.findOne({email})
    if(user) {
        return res.json({message: 'user aready exist'})
    }
    const hashpassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        username,
        email, 
        password: hashpassword,
    })
    await newUser.save()
    return res.json({status: true , message: "record register"})
})


router.post('/login', async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user) {
        return res.json({message: 'user is not registered'})
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword){
        return res.json({message: 'password is incorrect'})
    }

    const token = jwt.sign({username: user.username}, process.env.KEY, {expiresIn: '1h'})
    res.cookie('token', token, {httpOnly: true, maxAge: 360000})
    return res.json({status: true , message: "login successfully"})
})


router.post('/forgot-password', async (req , res) => {
    const {email} = req.body
    try{
        const user = await User.findOne({email})
        if(!user) {
            return res.json({message: 'user not register'})
        }

        const token = jwt.sign({id: user._id}, process.env.KEY, {expiresIn: '5m'})

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.USER1,
              pass: process.env.PASS,
            }
          });
          
          var mailOptions = {
            from: process.env.USER1,
            to: email,
            subject: 'reset password',
            text: `http://localhost:5173/resetPassword/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
             return res.json({ message: "error sending email"})
            } else {
              return res.json({status: true, message: "email sent"})
            }
          });


    } catch(error) {
            console.log(error);
        }
} )



router.post('/reset-password/:token', async (req, res) => {
    const {token} = req.params
    const {password} = req.body

    try{
    const decoded = await jwt.verify(token, process.env.KEY)
    const id = decoded.id
    const hashPassword = await bcrypt.hash(password, 10)
    await User.findByIdAndUpdate({_id: id}, {password: hashPassword})
    return res.json({status: true, message: "updated password"})
    } catch(error)  {
        return res.json("invalid token")
    }
})



// protected routes


const verifyUser = async (req, res, next) => {
    const token = req.cookies.token
    try{
        if(!token) {
            return res.json({status: false, message: 'no token'})
        }

        const decoded = await jwt.verify(token, process.env.KEY)
        // next is used to back to this route
        next()
    } catch {
        return res.json(err)
    }   
}


router.get('/verify', verifyUser, (req, res) => {
    return res.json({status: true, message: 'authorized'})
})



// route for logout
router.get("/logout", (req, res) => {
    res.clearCookie('token')
    return res.json({status: true, message: 'logout successfully'})
})





export { router as UserRouter }