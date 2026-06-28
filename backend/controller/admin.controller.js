
import Booking from "../model/booking.model.js"
import Destination from "../model/destination.model.js"
import Packages from "../model/packages.model.js"
import User from "../model/user.model.js"

export const allBookings = async(request,response,next)=>{
   try {      
      let bookings = await Booking.findAll({raw:true});
      response.status(200).json({message:"All Bookings",bookings})
   } catch (error) {
      response.status("500").json({message:"Internal Server Error"})
   }
}

export const allUsers =async (request,response,next)=>{
   try {
    let users = await User.findAll()
    if(!users){
        response.status("404").json({message:"Not Found"})
    }
    response.status(200).json({message:"All user ",users})
   } catch (error) {
    response.status("500").json({message:"Internal Server Error"})
   }
}


export const allDestination =async(request,response,next)=>{
   try {
      let destinations = await Destination.findAll({raw:true});
      response.status(200).json({message:"All Destinations",destinations})
   } catch (error) {
      response.status("500").json({message:"Internal Server Error"})
   }
}

export const addDestintion =async(request,response,next)=>{
   try {
     let{place,description,imageURL} = request.body;
    let destination = await Destination.create({place,description,imageURL})
    response.status(200).json({message:"Destination is created",destination})
   } catch (error) {
      response.status(500).json({message:"Internal Server Error"})
   }

}

export const addPackages =async(request,response,next)=>{
  try {
    let {title,destinationId,days_night,base_price,transport_cost,hotel_price,description}=request.body;
   await Packages.create({title,destinationId,days_night,base_price,transport_cost,hotel_price,description});
   response.status(200).json({message:"Package is created"})

  } catch (error) {
   response.status(500).json({message:"Internal Server Error",error})
  }
}

export const fetchAll = async (request,response,next)=>{
    try {
    let packages = await Packages.findAll({include:{
      model:Destination
    }})
    return response.status(200).json(packages)
        
    } catch (error) {
         return response.status("500").json({message:"Internal Server Error"})
    }
}

export const updatePackages = async(request,response,next)=>{
   try {
      let {id} = request.params;
      let {title,days_night,base_price,transport_cost,hotel_price,description}=request.body;;
      let updatePackage = await Packages.update({title,days_night,base_price,transport_cost,hotel_price,description},{where:{id}});
      response.status(200).json({message:"Package is successful update"});

      
   } catch (error) {
      response.status(500).json({message:"Internal Server Error",error})
   }
}

export const deletePackages = async(request,response,next)=>{
   try {
      let{id} = request.params;
      let pkg = await Packages.destroy({where:{id}});
      response.status(200).json({messgae:"Package is deleted"})
   } catch (error) {
      response.status(500).json({message:"Internal Server Error",error})
   }
}