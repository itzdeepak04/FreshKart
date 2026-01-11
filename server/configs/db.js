import mongoose from "mongoose";
import { config } from "dotenv";

config();
const URL=process.env.MONGODB_URI;

export async function dbConnection()
{
    try {

        await mongoose.connect(`${URL}/freshkart`);
        console.log('Database connected');
        
    } catch (error) {
        console.log('Database not connected')
        
    }
}
