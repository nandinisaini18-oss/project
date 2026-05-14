import mongoose from "mongoose"
import { config } from "./config.js"

async function connectToDB(){
    try{
        await mongoose.connect(config.MONGO_URI)
        console.log("Connected to Database")
    }catch(err){
        console.log(err.message)
    }
}

export default connectToDB