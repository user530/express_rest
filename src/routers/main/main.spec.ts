import request from 'supertest';
import app from '../../app/app';
import { GeneralResponse } from '../../common/types';

describe('Main router', () => {
    it('Should respond with json', async () => {
        const res = await request(app).get('/api/v1');

        expect(res.statusCode).toBe(200);
        expect(res.type).toBe('application/json');
    })

    it('Should respond with correct json object', async () => {
        const res = await request(app).get('/api/v1');
        const placeholder: GeneralResponse = {
            meta: {
                apiVersion: '1.0',
                documentation: 'http://mydomain.com/api/documentation',
            },
            _links: {
                self: {
                    href: 'http://mydomain.com/api/v1',
                    method: 'GET',
                }
            }
        }
        expect(res.body).toMatchObject<GeneralResponse>(placeholder)
    })
})