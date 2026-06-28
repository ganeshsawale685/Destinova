import Destination from "../model/destination.model.js"
import Packages from "../model/packages.model.js"

export const onePackage = async(request,response,next)=>{
    try {
        let {did,pid}= request.params;
        let destination = await Destination.findByPk(did);
        if(!destination){
           return response.status(404).json("Destination Not Found ")
        }
        let packages = await Packages.findByPk(pid)
         return response.status(200).json({message:"Your Destination Package",packages})
    } catch (error) {
        return response.status("500").json({message:"Internal Server Error"})
    }
}


export const allDestinations = async(request,response,next)=>{
    try {
        let destinations = await Destination.findAll({raw:true})
        return response.status(200).json({message:"All Destinations",destinations})
    } catch (error) {
       return response.status("500").json({message:"Internal Server Error"})
    }
}

export const oneDestination =async(request,response,next)=>{
    try {
        let {id} = request.params;
        let destination = await Destination.findOne({where:{id},include:Packages})
            return response.status(200).json({message:"Your Destinations",destination:destination})
    } catch (error) {
        return response.status("500").json({message:"Internal Server Error"})
    }
}

