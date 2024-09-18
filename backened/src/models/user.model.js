import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const UserSchema = new mongoose.Schema({
    id : String,
    wantchHistory : [
        {
            type : Schema.Types.ObjectId,
            ref : "Video"
        }
    ],
    username : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        index : true
       
    },
    email : {
        type:String,
        required : true,
        unique : true,


    },
    fullname : {
        type : String,
        required : true,
        unique : true,
        index : true
    },
    avatar : {
        type : String,
        
        
    },
    converImage : {
        type : String,
        
    },
    password : {
        type : String,
        required : true,
        
    },
    refreshToken : {
        String
    },


},{timestamp : true})

   UserSchema.pre('save' , async function (next){
       if(!this.isModified) return next();
       this.password = await bcrypt.hash(this.password , 10)
       next()

   })   

   UserSchema.methods.isPasswordCorrect = async function (password){
     await  bcrypt.compare(password , this.password)
   }

   UserSchema.methods.generateAccessToken = function (){
    return jwt.sign({
         _id : this.id,
         email : this.email,
         username : this.username
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
)
   }

   UserSchema.methods.generateRefreshToken = function (){
    return jwt.sign({
        _id : this.id
    },
     process.env.REFRESH_TOKEN_SECRET,
     {
        expiresIn : process.env.REFRESH_TOKEN_Expiry
     }
)
   }

export const User = mongoose.model("User" , UserSchema)