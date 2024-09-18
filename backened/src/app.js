/* eslint-disable import/first */
import express from "express"
import cors from "cors"
import { asyncHandler } from "./utils/asyncHandler.js"
import cookieParser from "cookie-parser"
const app = express()
                  
app.use(cors({
    origin : process.env.CORS
}))
app.use(express.json({limit : "20kb"}))
app.use(express.urlencoded({extended : true}))
app.use(express.static("public"))
app.use(cookieParser())

// routes
 import router from "./routes/user.router.js"

// routes controller 
 app.use("/users" , asyncHandler(router))
export default app