const app = require('../app');
const request = require('supertest');
const { waitForDB, seedDB, disconnectFromDB } = require('./testUtils/helpers');
const Contact = require('../models/Contact');

describe('Get single, list contacts', () => {

    let contact = null;

    beforeAll(async () => {
        await waitForDB();
        await seedDB();

        let data = {
            "name": "getSingle",
            "phoneNumbers": {
                "home": "01100894094"
            },
            "email": "abdoolly@gmail.com",
            "mailingAddress": "This is my mailingAddress"
        };
        contact = await Contact.create(data);
    });

    afterAll(async () => {
        await disconnectFromDB();
    });

    it('should delete contact successfully', async () => {
        const getSingleSpy = jest.spyOn(Contact, 'deleteOne');
        await request(app)
            .delete(`/contact/${contact._id}`)
            .set('api_token', 'test_token')
            .expect(200, {
                message: 'deleted successfully'
            });
        expect(getSingleSpy).toBeCalledTimes(1);
        expect(getSingleSpy).toBeCalledWith({ _id: `${contact._id}` });
    });
});