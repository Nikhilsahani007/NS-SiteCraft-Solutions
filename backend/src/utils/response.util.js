/**
 * Standard API response utility
 */

const sendSuccess = (res, statusCode = 200, data = null, message = 'Success') => {
    const response = {
        success: true,
        message,
    };

    if (data !== null) {
        response.data = data;
    }

    return res.status(statusCode).json(response);
};

const sendError = (res, statusCode = 500, message = 'Internal server error', errors = null) => {
    const response = {
        success: false,
        message,
    };

    if (errors) {
        response.errors = errors;
    }

    return res.status(statusCode).json(response);
};

const sendPaginated = (res, data, pagination, message = 'Success') => {
    return res.status(200).json({
        success: true,
        message,
        data,
        pagination,
    });
};

module.exports = {
    sendSuccess,
    sendError,
    sendPaginated,
};
