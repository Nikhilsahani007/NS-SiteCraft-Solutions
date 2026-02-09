const Inquiry = require('../models/Inquiry');
const { INQUIRY_STATUS } = require('../utils/constants');
const { AppError } = require('../middlewares/errorHandler.middleware');
const emailService = require('./email.service');

/**
 * Inquiry Service - Business logic for inquiry management
 */

// Create new inquiry
const createInquiry = async (inquiryData) => {
    const inquiry = await Inquiry.create(inquiryData);

    // Send email notification (don't wait for it)
    emailService.sendNewInquiryNotification(inquiry).catch(err => {
        // Log error but don't fail the request
        console.error('Failed to send inquiry notification:', err);
    });

    return inquiry;
};

// Get all inquiries with pagination and filtering
const getInquiries = async (options = {}) => {
    const {
        page = 1,
        limit = 20,
        status,
        sortBy = 'createdAt',
        sortOrder = 'desc',
    } = options;

    // Build query
    const query = {};
    if (status) {
        query.status = status;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    // Execute query
    const [inquiries, total] = await Promise.all([
        Inquiry.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .lean(),
        Inquiry.countDocuments(query),
    ]);

    return {
        inquiries,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / limit),
        },
    };
};

// Get single inquiry
const getInquiryById = async (id) => {
    const inquiry = await Inquiry.findById(id);

    if (!inquiry) {
        throw new AppError('Inquiry not found', 404);
    }

    return inquiry;
};

// Update inquiry status
const updateInquiryStatus = async (id, updateData) => {
    const inquiry = await Inquiry.findById(id);

    if (!inquiry) {
        throw new AppError('Inquiry not found', 404);
    }

    // Update fields
    if (updateData.status) {
        inquiry.status = updateData.status;
    }
    if (updateData.adminNotes !== undefined) {
        inquiry.adminNotes = updateData.adminNotes;
    }

    await inquiry.save();
    return inquiry;
};

// Delete inquiry
const deleteInquiry = async (id) => {
    const inquiry = await Inquiry.findById(id);

    if (!inquiry) {
        throw new AppError('Inquiry not found', 404);
    }

    await inquiry.deleteOne();
    return inquiry;
};

// Get inquiry statistics
const getInquiryStats = async () => {
    const stats = await Inquiry.aggregate([
        {
            $group: {
                _id: '$status',
                count: { $sum: 1 },
            },
        },
    ]);

    const total = await Inquiry.countDocuments();

    return {
        total,
        byStatus: stats.reduce((acc, stat) => {
            acc[stat._id] = stat.count;
            return acc;
        }, {}),
    };
};

module.exports = {
    createInquiry,
    getInquiries,
    getInquiryById,
    updateInquiryStatus,
    deleteInquiry,
    getInquiryStats,
};
