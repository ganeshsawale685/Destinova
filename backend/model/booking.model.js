import { DataTypes, ENUM } from "sequelize";
import sequelize from "../dbconfig/dbConfig.js";

const Booking = sequelize.define("bookings",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    packageId :{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    duration:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    persons:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    totalAmount:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    travelDate:{
        type:DataTypes.DATEONLY,
        allowNull:true
    },
    status :{
        type:ENUM('pending','confirmed','cancelled')
    }
    
})

sequelize.sync()
.then((res)=>{
    console.log("Booking table is created")
})
.catch((err)=>{
    console.log("Booking table not created")
})


export default Booking;