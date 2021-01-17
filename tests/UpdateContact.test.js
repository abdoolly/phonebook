const app = require('../app');
const request = require('supertest');
const { waitForDB, seedDB, disconnectFromDB } = require('./testUtils/helpers');
const Contact = require('../models/Contact');

describe('update contact', () => {

    beforeAll(async () => {
        await waitForDB();
        await seedDB();
    });

    afterAll(async () => {
        await disconnectFromDB();
    });

    it('should update contact successfully', async () => {
        let data = {
            "name": "testnameForUpdate",
            "phoneNumbers": {
                "home": "01100894094"
            },
            "email": "abdoolly@gmail.com",
            "mailingAddress": "This is my mailingAddress"
        };
        const contact = await Contact.create(data);

        const updateSpy = jest.spyOn(Contact, 'findByIdAndUpdate');
        await request(app)
            .patch(`/contact/${contact._id}`)
            .set('api_token', 'test_token')
            .send({ name: "nameUpdate" })
            .expect(200, {
                ...contact.toJSON(),
                _id: `${contact._id}`,
                name: "nameUpdate"
            });

        expect(updateSpy).toBeCalledTimes(1);
        expect(updateSpy).toBeCalledWith({
            _id: `${contact._id}`,
        }, { name: "nameUpdate" }, { rawResult: true, new: true });
    });
});