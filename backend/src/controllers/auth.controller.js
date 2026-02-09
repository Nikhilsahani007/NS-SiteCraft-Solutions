const authService = require('../services/auth.service');
const { sendSuccess } = require('../utils/response.util');

/**
 * Auth Controller - Handle authentication requests
 */

// @desc    Login admin
// @route   POST /api/v1/auth/login
// @access  Public
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const result = await authService.login(email, password);

        sendSuccess(res, 200, {
            admin: result.admin,
            token: result.token,
        }, 'Login successful');
    } catch (error) {
        next(error);
    }
};

// @desc    Get current admin
// @route   GET /api/v1/auth/me
// @access  Private
const getMe = async (req, res, next) => {
    try {
        const admin = await authService.getCurrentAdmin(req.admin.id);
        sendSuccess(res, 200, admin, 'Admin retrieved successfully');
    } catch (error) {
        next(error);
    }
};

// @desc    Logout (client-side token removal)
// @route   POST /api/v1/auth/logout
// @access  Private
const logout = async (req, res, next) => {
    try {
        // In JWT, logout is handled client-side by removing the token
        // This endpoint is just for consistency
        sendSuccess(res, 200, null, 'Logout successful');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login,
    getMe,
    logout,
};
