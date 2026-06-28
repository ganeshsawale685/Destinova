import { response } from "express";
import  jwt  from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

export const auth = async(request,response,next)=>{
    try {
        if(request.headers.authorization){
            
        let token = request.headers.authorization.split(" ")[1];
        let decoded = await jwt.verify(token,process.env.SECRET_KEY)
        request.user = decoded;
        next();
    }
    else 
        throw new Error()
    } catch (error) {
         return response.status(401).json({error: "Unauthorized Access"});
    }
}