const mongoose = require('mongoose');

const schema = mongoose.Schema({
    token: { type: String, unique: true }
});

const Token = mongoose.model('Tokens', schema);
module.exports = Token;