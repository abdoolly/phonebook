const express = require('express');
const Contact = require('../models/Contact');
const { throwOnValidationError, putIfExist } = require('../services/Helpers');
const { CreateContactValidator, UpdateContactValidator, validatePageQueryString, validationParamContact } = require('../services/Validators');
const router = express.Router();

/**
 * api to create a contact
 */
router.post('/contact', CreateContactValidator(), async (req, res) => {
    throwOnValidationError(req);
    const { name, phoneNumbers, email, mailingAddress } = req.body;
    const contact = await Contact.create({
        name,
        phoneNumbers,
        email,
        mailingAddress
    });
    return res.status(201).send(contact);
});

/**
 * api to update contact any field in it
 */
router.patch('/contact/:contactId', UpdateContactValidator(), async (req, res) => {
    throwOnValidationError(req);
    const { contactId } = req.params;
    const { name, phoneNumbers, email, mailingAddress } = req.body;

    const { value: contact } = await Contact.findByIdAndUpdate({
        _id: contactId,
    }, {
        ...putIfExist('name', name),
        ...putIfExist('phoneNumbers', phoneNumbers),
        ...putIfExist('email', email),
        ...putIfExist('mailingAddress', mailingAddress),
    }, { rawResult: true, new: true });

    if (!contact) {
        return res.status(404).send({ error: 'Contact not found' });
    }

    return res.send(contact);
});

/**
 * api to get single contact
 */
router.get('/contact/:contactId', validationParamContact(), async (req, res) => {
    throwOnValidationError(req);
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
        return res.status(404).send({ error: 'Contact not found' });
    }
    return res.send(contact);
});

/**
 * api to get many contacts give page, and perPage query strings
 */
router.get('/contacts', validatePageQueryString(), async (req, res) => {
    const page = req.query.page || 1;
    const perPage = req.query.perPage || 10;
    const { docs, totalPages, nextPage, prevPage } = await Contact.paginate({},
        {
            page, limit: perPage, sort: { name: 1 }
        });
    return res.send({
        contacts: docs,
        totalPages,
        nextPage,
        prevPage,
    });
});

/**
 * api to delete a contact give the contact id
 */
router.delete('/contact/:contactId', validationParamContact(), async (req, res) => {
    throwOnValidationError(req);
    const { contactId } = req.params;
    const { deletedCount } = await Contact.deleteOne({ _id: contactId });

    if (deletedCount === 0) {
        return res.status(404).send({ error: 'Contact not found' });
    }

    return res.status(200).send({ message: 'deleted successfully' });
});

module.exports = router;
