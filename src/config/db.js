import mongoose from "mongoose";


const config = {
    isConnected:0
}

export async function dbConnect(){
    if(config.isConnected){
        return;
    }

    try {
        const {connection} = await mongoose.connect(process.env.MONGO_URL,{dbName:"chemasia"})
        console.log("DB connected Successfully");
        config.isConnected = connection.readyState;
    } catch (error) {
        console.log("Error in DB connection");
        console.log(error);
        
    }
}