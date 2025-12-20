import db from '../models/index.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try{
        await db.users.register(req.body)
        res.json({success : true, message : "Registration Successfull!"})
    }
    catch(error)
    {
        res.json({success : false, message : error.message})
    }
}

export const login = async (req, res) => {
    try{
        await db.users.login(req.body)
        const accesstoken = jwt.sign({email : req.body.email}, process.env.JWT_ACCESSTOKEN_SECRETKEY, {expiresIn: '15m'})
        const refreshtoken = jwt.sign({email : req.body.email}, process.env.JWT_REFRESHTOKEN_SECRETKEY, {expiresIn: '7d'})
        res.json({ success : true, message : "Login Successfull!", accesstoken: accesstoken, refreshtoken: refreshtoken })
    }
    catch(error)
    {
        res.json({success : false, message : error.message})
    }
}

export const update = async (req, res) => {
    try{
        await db.users.updateUser(req.body, req.user.email)
        res.json({success: true, message: "Updation Successfull!"})
    }
    catch(error)
    {
        res.json({success: false, message: error.message})
    }
}