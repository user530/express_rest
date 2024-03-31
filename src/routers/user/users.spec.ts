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
        const correctBody: UserData = {
            firstName: 'John',
            lastName: 'Doe',
            age: 39,
            position: 'Owner',
            email: 'john123@mail.com',
            phone: '0-123-456-7890',
            bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices in lorem vitae gravida. Nunc urna lacus, dapibus in lorem ut, efficitur accumsan massa. Aenean vulputate tortor a pharetra dignissim. Donec non aliquam ex. Praesent hendrerit, nisi et vestibulum consequat, justo nibh molestie lacus, quis porttitor neque erat quis lorem. Aenean sed arcu mollis, ultrices nulla sagittis, congue lorem. Sed at feugiat massa, vel luctus orci. Nunc vitae varius orci, quis bibendum tortor.`,
            photoUrl: 'https://production-tcf.imgix.net/app/uploads/2016/02/01215033/20130114-jeffrey-g.-madrick-2.jpg',
        };
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
        const newData1: Partial<UserData> = { position: 'CEO' };
        const newData2: Partial<UserData> = { position: 'another new value', age: 40 };

        const res1 = await request(app).patch('/api/v1/users/2').send(newData1);
        const res2 = await request(app).patch('/api/v1/users/2').send(newData2);

        expect(res1.body).toBeDefined();
        expect(res1.body.position).toBe(newData1.position);
        expect(res1.body.firstName).toBe('John'); // Default value that should stay the same

        expect(res2.body).toBeDefined();
        expect(res2.body.position).toBe(newData2.position);
        expect(res2.body.age).toBe(newData2.age);
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