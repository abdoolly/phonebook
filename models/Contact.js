const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema({
    name: { type: String, unique: true },
    phoneNumbers: {
        type: Map,
        of: String
    },
    email: String,
    mailingAddress: String
});

schema.plugin(mongoosePaginate);

const Contact = mongoose.model('Contacts', schema);
module.exports = Contact;