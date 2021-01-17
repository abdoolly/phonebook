const Token = require("../models/Token");

const seedToken = async () => {
    const testToken = 'uqZAQJ2F6PcRI4Jwdsks7ncoj';
    const token = await Token.findOne({ token: testToken });
    if (!token) {
        await Token.create({ token: testToken });
    }
};

module.exports = {
    seedToken
};