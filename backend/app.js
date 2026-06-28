import express from 'express'
import bodyParser from 'body-parser';
import UserRouter from './route/user.route.js'
import AdminRouter from './route/admin.route.js'
import RootRoute from './route/root.route.js'
import dotenv from 'dotenv/config'
import "./model/association.js"
import BookingRouter from './route/booking.route.js';
import PackageRouter from './route/packages.route.js'
import AiRouter from './route/ai.route.js'
import PayementRouter from "./route/payment.route.js"
import cors from 'cors'
import { auth } from './middleware/auth.js';
const app = express();



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());

app.use("/",RootRoute)
app.use("/users",UserRouter)
app.use("/admin",AdminRouter)
app.use("/booking",BookingRouter)
app.use("/packages",PackageRouter)
app.use("/chat",AiRouter)
app.use("/payment",PayementRouter)


app.listen(process.env.PORT,()=>{
    console.log("Server is Running....")
})

