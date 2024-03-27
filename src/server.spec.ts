import request from 'supertest';
import app from './app/app';

describe('Server module', () => {
    it('Port env variable is defined', () => {
        expect(process.env.PORT).toBeDefined()
    });

    it('Port has a correct value', () => {
        const port = Number(process.env.PORT);
        expect(!isNaN(port) && port > 1024 && port < 65535).toBe(true);
    })
})