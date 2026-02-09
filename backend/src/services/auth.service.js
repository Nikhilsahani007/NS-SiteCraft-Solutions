const Admin = require('../models/Admin');
const { AppError } = require('../middlewares/errorHandler.middleware');

/**
 * Auth Service - Business logic for authentication
 */

// Login admin
const login = async (email, password) => {
    // Find admin with password field
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
        throw new AppError('Invalid credentials', 401);
    }

    // Check if admin is active
    if (!admin.isActive) {
        throw new AppError('Account is deactivated', 401);
    }

    // Verify password
    const isPasswordCorrect = await admin.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new AppError('Invalid credentials', 401);
    }

    // Update last login
    await admin.updateLastLogin();

    // Generate token
    const token = admin.generateAuthToken();

    // Return admin without password
    const adminData = admin.toObject();
    delete adminData.password;

    return {
        admin: adminData,
        token,
    };
};

// Get current admin
const getCurrentAdmin = async (adminId) => {
    const admin = await Admin.findById(adminId);

    if (!admin) {
        throw new AppError('Admin not found', 404);
    }

    return admin;
};

// Create admin (for initial setup or super admin use)
const createAdmin = async (adminData) => {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminData.email });

    if (existingAdmin) {
        throw new AppError('Admin with this email already exists', 400);
    }

    const admin = await Admin.create(adminData);

    // Return admin without password
    const adminResponse = admin.toObject();
    delete adminResponse.password;

    return adminResponse;
};

module.exports = {
    login,
    getCurrentAdmin,
    createAdmin,
};
