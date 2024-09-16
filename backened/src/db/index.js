import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
import express from "express"

const app = express()

const connnectDB = async()=>{
    try {
       const mongoDbInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
       console.log(`mongodb connected !! ${mongoDbInstance.connection.host}`)
       app.on("ERROR" , (error)=>{
        console.log(error);
        throw error
       })

    } catch (error) {
       console.error('ERROR' , error) 
    }
}

export default connnectDB;