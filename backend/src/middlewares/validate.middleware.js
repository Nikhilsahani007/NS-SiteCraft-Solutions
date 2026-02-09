const { sendError } = require('../utils/response.util');

/**
 * Validation middleware factory
 */
const validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false, // Return all errors
            stripUnknown: true, // Remove unknown fields
        });

        if (error) {
            const errors = error.details.map(detail => detail.message);
            return sendError(res, 400, 'Validation failed', errors);
        }

        // Replace req.body with validated and sanitized data
        req.body = value;
        next();
    };
};

module.exports = validate;
