const app = require('../app');
const request = require('supertest');
const { waitForDB, seedDB, disconnectFromDB } = require('./testUtils/helpers');
const Contact = require('../models/Contact');

describe('create contact', () => {

    beforeAll(async () => {
        await waitForDB();
        await seedDB();
    });

    afterAll(async () => {
        await disconnectFromDB();
    })

    it('should create contact successfully', async () => {
        const data = {
            "name": "testname",
            "phoneNumbers": {
                "home": "01100894094"
            },
            "email": "abdoolly@gmail.com",
            "mailingAddress": "This is my mailingAddress"
        }
        const createSpy = jest.spyOn(Contact, 'create').mockResolvedValue({
            _id: '600428531039e0b2ff3c70b5',
            name: 'testname',
            phoneNumbers: { home: '01100894094' },
            email: 'abdoolly@gmail.com',
            mailingAddress: 'This is my mailingAddress',
            __v: 0
        });

        await request(app)
            .post('/contact')
            .set('api_token', 'test_token')
            .send(data)
            .expect(201, {
                _id: '600428531039e0b2ff3c70b5',
                name: 'testname',
                phoneNumbers: { home: '01100894094' },
                email: 'abdoolly@gmail.com',
                mailingAddress: 'This is my mailingAddress',
                __v: 0
            });

        expect(createSpy).toBeCalledTimes(1);
        expect(createSpy).toBeCalledWith(data);
    });
});