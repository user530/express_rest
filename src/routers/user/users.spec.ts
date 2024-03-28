import request from 'supertest';
import app from '../../app/app';

describe('User router', () => {
    it('Should have a get route', async () => {
        const res = await request(app).get('/api/v1/users');

        expect(res.statusCode).toBe(200);
    })
})