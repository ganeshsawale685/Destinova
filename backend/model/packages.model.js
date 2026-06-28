import { DataTypes } from "sequelize";
import sequelize from "../dbconfig/dbConfig.js";

const Packages =sequelize.define("packages",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    destinationId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    days_night:{
        type:DataTypes.STRING,
        allowNull:false
    },
    base_price:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    transport_cost:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    hotel_price:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING(500),
        allowNull:false
    }

})

sequelize.sync()
.then((res)=>{
    console.log("Package table is created")
})
.catch((err)=>{
    console.log("Package table not created")
})


export default Packages;