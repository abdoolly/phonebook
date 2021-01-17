const { checkSchema, param, query } = require("express-validator");
const Contact = require("../models/Contact");

const CreateContactValidator = () => {
    return checkSchema({
        name: {
            in: ['body'],
            trim: true,
            isString: { errorMessage: 'Name field is required' },
            custom: {
                options: (value) => {
                    return Contact.findOne({ name: value }).then((contact) => {
                        if (contact) {
                            return Promise.reject('Name already exist');
                        }
                    });
                },
            }
        },
        phoneNumbers: {
            in: ['body'],
            custom: {
                options: (value) => {
                    if (!Array.isArray(value) && typeof value === 'object' && Object.keys(value).length > 0) {
                        return true;
                    }
                    throw new Error('phoneNumbers should be an object of key string and value a mobile');
                },
            }
        },
        'phoneNumbers.*': {
            in: ['body'],
            isMobilePhone: true,
            errorMessage: 'Invalid phone number'
        },
        email: {
            in: ['body'],
            trim: true,
            isEmail: true,
            errorMessage: 'Email field is invalid'
        },
        mailingAddress: {
            trim: true,
            in: ['body'],
            isString: true,
            errorMessage: 'Mailing Address is required'
        }
    });
};

const UpdateContactValidator = () => {
    return checkSchema({
        contactId: {
            in: ['params'],
            isMongoId: true,
            errorMessage: 'contactId param should be a mongoId'
        },
        name: {
            in: ['body'],
            trim: true,
            optional: true,
            isString: { errorMessage: 'Name should be string' },
            custom: {
                options: (value, { req }) => {
                    return Contact.findOne({
                        _id: { $ne: req.params.contactId },
                        name: value
                    }).then((contact) => {
                        if (contact) {
                            return Promise.reject('Name already exist');
                        }
                    });
                },
            }
        },
        phoneNumbers: {
            in: ['body'],
            optional: true,
            custom: {
                options: (value) => {
                    if (!Array.isArray(value) && typeof value === 'object' && Object.keys(value).length > 0) {
                        return true;
                    }
                    throw new Error('phoneNumbers should be an object of key string and value a mobile');
                },
            }
        },
        'phoneNumbers.*': {
            in: ['body'],
            isMobilePhone: true,
            errorMessage: 'Invalid phone number'
        },
        email: {
            in: ['body'],
            trim: true,
            optional: true,
            isEmail: true,
            errorMessage: 'Email field is invalid'
        },
        mailingAddress: {
            trim: true,
            in: ['body'],
            optional: true,
            isString: true,
            errorMessage: 'Mailing Address should be a string'
        }
    });
}

const validationParamContact = () => {
    return param('contactId').isMongoId().withMessage('contactId param should be a mongoId');
};

const validatePageQueryString = () => {
    return [
        query('page')
            .isInt()
            .withMessage('Page query string should be an integer'),
        query('perPage').isInt().withMessage('perPage should be integer')
    ];
};

module.exports = {
    CreateContactValidator,
    UpdateContactValidator,
    validationParamContact,
    validatePageQueryString,
};