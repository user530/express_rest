import { connectDb } from './database/connection';
import mongoose from 'mongoose';

describe('Server module', () => {
    it('Port env variable is defined', () => {
        expect(process.env.PORT).toBeDefined()
    });

    it('DB URI env should be defined', () => {
        expect(process.env.MONGO_URI).toBeDefined();
    })

    it('Port has a correct value', () => {
        const port = Number(process.env.PORT);
        expect(!isNaN(port) && port > 1024 && port < 65535).toBe(true);
    })

    it('Throws an error on DB connection if provided with incorrect URI', async () => {
        expect(connectDb('123')).rejects.toThrow();
    })

    it('Connects if presented with correct DB URI', async () => {
        const uri = process.env.MONGO_URI as string;
        await connectDb(uri);

        expect(mongoose.connection.readyState).toBe(1);
    })

    afterAll(() => {
        mongoose.disconnect();
    })
})