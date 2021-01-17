const Token = require("../models/Token");

const TokenAuth = async (req, res, next) => {
    if (!req.headers.api_token) {
        return res.status(401).send({ error: `You are not authorized to make this request` });
    }

    const token = await Token.findOne({ token: req.headers.api_token });
    if (!token) {
        return res.status(401).send({ error: `You are not authorized to make this request` });
    }

    return next();
};

module.exports = TokenAuth;