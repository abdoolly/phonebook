const express = require('express');
const Contact = require('../models/Contact');
const { throwOnValidationError } = require('../services/Helpers');
const { CreateContactValidator } = require('../services/Validators');
const router = express.Router();

router.post('/contact', CreateContactValidator(), async (req, res) => {
    const { name, phoneNumbers, email, mailingAddress } = req.body;
    await throwOnValidationError(req);
    const contact = await Contact.create({
        name,
        phoneNumbers,
        email,
        mailingAddress
    });
    return res.send(contact);
});

module.exports = router;
