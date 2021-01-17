const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: { type: String, unique: true },
    phoneNumbers: {
        type: Map,
        of: String
    },
    email: String,
    mailingAddress: String
});

const Contact = mongoose.model('Contacts', schema);
module.exports = Contact;