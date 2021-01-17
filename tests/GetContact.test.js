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

    it('should get single contact successfully', async () => {

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

    it('should list contacts successfully', async () => {
        const getManySpy = jest.spyOn(Contact, 'paginate');
        await request(app)
            .get(`/contacts?page=1&perPage=2`)
            .set('api_token', 'test_token')
            .expect(200, {
                contacts: [
                    { ...contact.toJSON(), _id: `${contact._id}` },
                ],
                totalPages: 1,
                nextPage: null,
                prevPage: null
            });
        expect(getManySpy).toBeCalledTimes(1);
        expect(getManySpy).toBeCalledWith({}, {
            page: "1", limit: "2", sort: { name: 1 }
        });
    });

});