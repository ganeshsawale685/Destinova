import User from "../model/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()



export const signIn = async(request,response,next)=>{
    try{
        let {email,password} = request.body;
        let user = await  User.findOne({where:{email},raw:true })
        
         if(!user)
            return response.status(404).json({error:"User not found"});
         let hashPassword = user.password;
         let status = await bcrypt.compare(password,hashPassword)

         return status ? response.status(200).json({message:"Sign in success",token:getToken(user),user}): response.status(401).json({error:"Unauthorized User"})
    }
    catch(err){
            return response.status(500).json({error: "Internal Server Error"});
   }
}

const getToken =(user)=>{
   let payload = {userId:user.id,email:user.email}
   return jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"30m"})
}

export const signUp = async(request,response,next)=>{
   try{ 
    let {name,email,password,role} = request.body;
    let saltKey = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password,saltKey);
    let user = await User.create({name,email,password,role});
    return response.status(201).json({message: "User created..",user});
   }
   catch(err){
     return response.status(500).json({error: "Internal Server Error",err});
   }
}