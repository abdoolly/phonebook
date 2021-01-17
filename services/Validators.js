const { checkSchema } = require("express-validator");
const Contact = require("../models/Contact");

const CreateContactValidator = () => {
    return checkSchema({
        name: {
            in: ['body'],
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
            isEmail: true,
            errorMessage: 'Email field is invalid'
        },
        mailingAddress: {
            in: ['body'],
            isString: true,
            errorMessage: 'Mailing Address is required'
        }
    });
};


module.exports = {
    CreateContactValidator,
};