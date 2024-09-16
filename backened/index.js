import app from "./src/app.js";
import connnectDB from "./src/db/index.js"
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const connection = async ()=>{
    await connnectDB()
}
connection()
.then(()=>{
    app.listen(process.env.PORT || 3000 , ()=>{
        console.log("Port is listning on given port")
    })
})
.catch((error)=>{
    console.log("error server not ersponding", error)
})

















// ;(async()=>{
//     try {
//        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//        app.on("error" , (error)=>{
//            console.log("ERROR" , error);
//            throw error
//        })

//        app.listen(process.env.PORT , ()=>{
//         console.log(`APP is listning on port ${process.env.PORT}`)
//        })
//     } catch (error) {
//         console.error("ERROR" , error)
//     }
// })()