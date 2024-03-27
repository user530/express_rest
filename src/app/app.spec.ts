import request from 'supertest';
import app from './app';

describe('App module', () => {
    it('App responds with welcoming message', async () => {
        const response = await request(app).get('/');

        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Welcome to the Express API!');
    })
})