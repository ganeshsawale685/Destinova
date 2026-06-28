import { Sequelize } from "sequelize";
import dotenv from 'dotenv/config'

let sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USERNAME,process.env.DB_PASSWORD,{
    host:process.env.DB_HOST,
    dialect:"mysql"
})

sequelize.sync()
.then((res)=>{
    console.log("Database is Connected")
})
.catch((err)=>{
    console.log("Connection is failed")
})

export default sequelize;