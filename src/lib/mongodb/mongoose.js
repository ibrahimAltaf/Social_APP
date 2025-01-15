import mongoose from "mongoose";
let initialized = false;

export const connect = async()=>{
    mongoose.set("strictQuery",false)
    if(initialized){
       console.log("Already connected to MongoDB")
    }
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            dbName:"UPSKILL SOCIAL APP",
            useNewUrlParser:true,
            useUnifiedTopology:true,
      
        })
        console.log("Connected to MongoDB")
        initialized = true}catch(err){
        console.log("Database Connecting Error",err)    
        }
}