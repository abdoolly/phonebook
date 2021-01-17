const { validationResult } = require("express-validator");
const { ValidationErrors } = require("./Errors");

/**
 * check if there is a validation error in the request
 * @param {*} req 
 */
const throwOnValidationError = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ValidationErrors(errors.array());
    }
};

const putIfExist = (key, value) => value ? { [key]: value } : {};

module.exports = {
    throwOnValidationError,
    putIfExist
};