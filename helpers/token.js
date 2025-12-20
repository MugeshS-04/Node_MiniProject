import jwt from 'jsonwebtoken'

export const access_verify = (req, res, next) => {

    try{
        const header = req.headers["authorization"]

        const accesstoken = header.split(" ")[1]

        const key = jwt.verify(accesstoken, process.env.JWT_ACCESSTOKEN_SECRETKEY)

        req.user = key

        return next()
    }
    catch(error)
    {
        return res.json({success : false, message : error.message})
    }
}

export const refresh_verify = (req, res, next) => {

    try{
        const header = req.headers["authorization"]

        const refreshtoken = header.split(" ")[1]

        const key = jwt.verify(refreshtoken, process.env.JWT_REFRESHTOKEN_SECRETKEY)

        req.user = key

        return next()
    }
    catch(error)
    {
        return res.json({success : false, message : error.message})
    }
    
}