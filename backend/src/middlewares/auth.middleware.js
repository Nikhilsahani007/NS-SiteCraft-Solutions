const jwt = require('jsonwebtoken');
const { AppError } = require('./errorHandler.middleware');
const { sendError } = require('../utils/response.util');
const Admin = require('../models/Admin');

/**
 * Protect routes - verify JWT token
 */
const protect = async (req, res, next) => {
    try {
        let token;

        // Check for token in Authorization header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        // Check if token exists
        if (!token) {
            return next(new AppError('Not authorized to access this route', 401));
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get admin from token
            const admin = await Admin.findById(decoded.id).select('-password');

            if (!admin) {
                return next(new AppError('Admin not found', 401));
            }

            // Attach admin to request
            req.admin = admin;
            next();
        } catch (error) {
            return next(new AppError('Not authorized to access this route', 401));
        }
    } catch (error) {
        next(error);
    }
};

/**
 * Authorize specific roles (future use)
 */
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.admin.role)) {
            return next(
                new AppError(`Role '${req.admin.role}' is not authorized to access this route`, 403)
            );
        }
        next();
    };
};

module.exports = {
    protect,
    authorize,
};
