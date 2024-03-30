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
            contacts: {
                email: 'john123@mail.com',
                phone: '0-123-456-7890',
            },
            bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices in lorem vitae gravida. Nunc urna lacus, dapibus in lorem ut, efficitur accumsan massa. Aenean vulputate tortor a pharetra dignissim. Donec non aliquam ex. Praesent hendrerit, nisi et vestibulum consequat, justo nibh molestie lacus, quis porttitor neque erat quis lorem. Aenean sed arcu mollis, ultrices nulla sagittis, congue lorem. Sed at feugiat massa, vel luctus orci. Nunc vitae varius orci, quis bibendum tortor.

            Sed aliquam metus sed leo rutrum ullamcorper. Maecenas aliquet venenatis tellus quis dictum. Aliquam id ex sollicitudin, viverra nibh nec, semper neque. Pellentesque tempus purus arcu, a venenatis sem faucibus sed. Nulla accumsan tortor at dui sagittis pulvinar. Vivamus aliquam pellentesque urna. Morbi molestie erat finibus eros interdum interdum. Aenean tempor purus urna, quis placerat mi pharetra a. Suspendisse potenti. Nam et rutrum magna. Vestibulum imperdiet blandit pharetra. Aenean pharetra mauris in magna dapibus sollicitudin tincidunt eget purus. Curabitur dignissim in orci a convallis. Nulla rutrum neque sed risus pretium fringilla. Pellentesque ac urna consequat, tincidunt lectus et, aliquet leo.

            Praesent et felis volutpat, gravida dolor id, eleifend ante. Donec molestie massa ac mi tempus tempus in tristique dolor. Mauris auctor velit dolor, at pharetra ex rutrum et. Nunc sollicitudin urna urna, eget suscipit leo viverra sit amet. Proin porttitor augue nisl, a pulvinar purus placerat vitae. Proin ut faucibus lacus. Praesent pharetra pellentesque ipsum ut mollis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc ultricies ullamcorper pulvinar. Sed et accumsan massa, id vehicula sapien. Pellentesque lacinia purus sit amet velit ultricies lacinia. Proin hendrerit dignissim est, sit amet tristique velit scelerisque rutrum. Phasellus elementum tincidunt diam eget iaculis.

            In eget neque quis risus pulvinar varius. Sed suscipit placerat metus nec facilisis. Vivamus vel nunc aliquam, lacinia purus sit amet, eleifend turpis. Pellentesque tempus elementum turpis sit amet feugiat. Morbi vulputate vitae ante vel facilisis. Aliquam et interdum dolor. Vivamus laoreet dolor tortor, ut eleifend massa accumsan at.

            Pellentesque at justo sit amet eros mattis consequat eget pellentesque magna. Cras semper nunc vitae faucibus placerat. Aliquam dignissim scelerisque facilisis. Donec suscipit commodo arcu vel convallis. Nulla vel rutrum nunc, eget tristique diam. Nulla eget elit vitae erat tincidunt imperdiet. Ut pretium consectetur erat, tempus vestibulum neque bibendum vitae. Suspendisse cursus eros vel dapibus fermentum. Phasellus eget purus ante. In imperdiet justo vel ligula tempus eleifend. Aenean non magna porta, pretium libero vel, viverra sapien. Nullam fermentum finibus rutrum.`,
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