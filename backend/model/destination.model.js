import { DataTypes } from "sequelize";
import sequelize from "../dbconfig/dbConfig.js";

const Destination = sequelize.define("destinations",{
    id :{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    place :{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    description:{
        type:DataTypes.STRING(500),
        allowNull:false
    },
    imageURL: {
      type: DataTypes.STRING, 
    },

})

sequelize.sync()
.then((res)=>{
    console.log("Destination table is created")
})
.catch((err)=>{
    console.log("Destination table not created")
})


export default Destination;