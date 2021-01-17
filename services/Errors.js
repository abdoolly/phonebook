class ValidationErrors extends Error {
    validationErrors = [];
    constructor(validationErrors) {
        super('validation error');
        this.name = 'ValidationErrors';
        this.validationErrors = validationErrors;
        Error.captureStackTrace(this, ValidationErrors);
    }
}

module.exports = { ValidationErrors };