import { DataTypes } from "sequelize";
import sequelize from "../dbconfig/dbConfig.js";

const Review = sequelize.define("reviews",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    packageId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    rating:{
        type:DataTypes.INTEGER,
        
    },
    comment:{
        type:DataTypes.STRING
    }
})
sequelize.sync()
.then((res)=>{
    console.log("Review table is created")
})
.catch((err)=>{
    console.log("Review table not created")
})

export default Review;