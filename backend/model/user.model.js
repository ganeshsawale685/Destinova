import { DataTypes } from "sequelize";
import sequelize from "../dbconfig/dbConfig.js";


const User = sequelize.define("Users",{
    id :{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name :{
        type:DataTypes.STRING,
        allowNull:false
    },
    email :{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
    },
    password :{
        type:DataTypes.STRING,
        allowNull:false
    },
    role :{
        type:DataTypes.ENUM("user","admin"), defaultValue:"user" ,
        
    }
})

sequelize.sync()
.then((res)=>{
    console.log("User table is created")
})
.catch((err)=>{
    console.log("User table not created")
})


export default User;