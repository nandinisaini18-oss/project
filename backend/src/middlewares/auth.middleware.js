import jwt from "jsonwebtoken"
import { config } from "../config/config.js"

async function authenticateUser(req , res , next){
    const token = req.cookies.token

    if(!token){
            return res.status(401).json({
                message : "Token not found , unauthorised access",
                success : false
            })
    }
    try{
        const decoded = jwt.verify(token , config.JWT_SECRET)

        req.user = decoded

        next()

    }catch(err){
        return res.status(403).json({
            message : "forbidden content",
            success : false
        })
    }
}

export default authenticateUser