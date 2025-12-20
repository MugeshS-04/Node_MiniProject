import db from '../models/index.js'

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

export const login = (req, res) => {

}

export const update = (req, res) => {
    
}