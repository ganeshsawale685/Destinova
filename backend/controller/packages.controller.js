import Packages from "../model/packages.model.js"

export const fetchAll = async (request,response,next)=>{
    try {
    let packages = await Packages.findAll({raw:true})
    return response.status(200).json(packages)
        
    } catch (error) {
         return response.status("500").json({message:"Internal Server Error"})
    }
}