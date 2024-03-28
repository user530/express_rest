import request from 'supertest';
import app from '../../app/app';
import { UserData } from '../../common/types';

describe('User router', () => {
    it('Should have a get all users route', async () => {
        const res = await request(app).get('/api/v1/users');

        expect(res.statusCode).toBe(200);
    })

    it('Should have a get singular user route', async () => {
        const res = await request(app).get('/api/v1/users/1');

        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject({ id: '1' })
    })

    it('Should have an add user route', async () => {
        const res = await request(app).post('/api/v1/users');

        expect(res.statusCode).not.toBe(404);
    })

    it('AddUser route should respond with error to empty on incorrect response', async () => {
        const emptyBody = {};
        const incorrectBody = { foo: 'bar' };

        const res1 = await request(app).post('/api/v1/users').send(emptyBody);
        const res2 = await request(app).post('/api/v1/users').send(incorrectBody);

        expect(res1.statusCode).toBe(400);
        expect(res2.statusCode).toBe(400);
    })

    it('AddUser route should respond with created object on correct response', async () => {
        const correctBody: UserData = { field1: 'some value', field2: 1 };
        const res = await request(app).post('/api/v1/users').send(correctBody);

        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(correctBody);
    })

    it('Should have an update user route', async () => {
        const res = await request(app).patch('/api/v1/users/2');

        expect(res.statusCode).not.toBe(404)
    })

    it('Update route should respond with error to request with unexistent user id', async () => {
        const res = await request(app).patch('/api/v1/users/-1').send({});

        expect(res.statusCode).toBe(404)
    })

    it('Update route should respond with updated object to correct request', async () => {
        const newData1: Partial<UserData> = { field1: 'some new value' };
        const newData2: Partial<UserData> = { field1: 'another new value', field2: 5 };

        const res1 = await request(app).patch('/api/v1/users/2').send(newData1);
        const res2 = await request(app).patch('/api/v1/users/2').send(newData2);

        expect(res1.body).toBeDefined();
        expect(res1.body.field1).toBe(newData1.field1);
        expect(res1.body.field2).toBe(42); // Default value that should stay the same

        expect(res2.body).toBeDefined();
        expect(res2.body.field1).toBe(newData2.field1);
        expect(res2.body.field2).toBe(newData2.field2);
    })

    it('Should have a delete user route', async () => {
        const res = await request(app).delete('/api/v1/users/2');

        expect(res.statusCode).not.toBe(404)
    })

    it('Delete route should respond with error to request with unexistent user id', async () => {
        const res = await request(app).delete('/api/v1/users/-1');

        expect(res.statusCode).toBe(404)
    })

    it('Delete route should correctly respond to correct request', async () => {
        const res = await request(app).delete('/api/v1/users/2');

        expect(res.statusCode).toBe(204);
    })
})