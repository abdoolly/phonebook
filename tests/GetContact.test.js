const app = require('../app');
const request = require('supertest');
const { waitForDB, seedDB, disconnectFromDB } = require('./testUtils/helpers');
const Contact = require('../models/Contact');

describe('Get single, list contacts', () => {

    beforeAll(async () => {
        await waitForDB();
        await seedDB();
    });

    afterAll(async () => {
        await disconnectFromDB();
    });

    it('should get single contact successfully', async () => {
        let data = {
            "name": "getSingle",
            "phoneNumbers": {
                "home": "01100894094"
            },
            "email": "abdoolly@gmail.com",
            "mailingAddress": "This is my mailingAddress"
        };
        const contact = await Contact.create(data);
        const getSingleSpy = jest.spyOn(Contact, 'findById');
        await request(app)
            .get(`/contact/${contact._id}`)
            .set('api_token', 'test_token')
            .expect(200, {
                ...contact.toJSON(),
                _id: `${contact._id}`,
            });
        expect(getSingleSpy).toBeCalledTimes(1);
        expect(getSingleSpy).toBeCalledWith(`${contact._id}`);
    });

});