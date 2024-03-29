import mongoose from 'mongoose';
import { mongoOptions } from '../configs/mongo.option';

export const connectDb = async (dbUri: string) => {
    try {
        // Strict query mode activated
        mongoose.set('strictQuery', true);
        // Connect
        await mongoose.connect(dbUri, mongoOptions);
    } catch (error) {
        await mongoose.disconnect();
        throw error;
    }
}