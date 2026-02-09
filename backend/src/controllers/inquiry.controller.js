const inquiryService = require('../services/inquiry.service');
const { sendSuccess } = require('../utils/response.util');

/**
 * Inquiry Controller - Handle HTTP requests
 */

// @desc    Create new inquiry
// @route   POST /api/v1/inquiries
// @access  Public
const createInquiry = async (req, res, next) => {
    try {
        const inquiry = await inquiryService.createInquiry(req.body);

        sendSuccess(res, 201, {
            id: inquiry._id,
            name: inquiry.name,
            email: inquiry.email,
        }, 'Thank you for contacting us! We will get back to you soon.');
    } catch (error) {
        next(error);
    }
};

// @desc    Get all inquiries
// @route   GET /api/v1/inquiries
// @access  Private (Admin)
const getInquiries = async (req, res, next) => {
    try {
        const { page, limit, status, sortBy, sortOrder } = req.query;

        const result = await inquiryService.getInquiries({
            page,
            limit,
            status,
            sortBy,
            sortOrder,
        });

        res.status(200).json({
            success: true,
            message: 'Inquiries retrieved successfully',
            data: result.inquiries,
            pagination: result.pagination,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single inquiry
// @route   GET /api/v1/inquiries/:id
// @access  Private (Admin)
const getInquiry = async (req, res, next) => {
    try {
        const inquiry = await inquiryService.getInquiryById(req.params.id);
        sendSuccess(res, 200, inquiry, 'Inquiry retrieved successfully');
    } catch (error) {
        next(error);
    }
};

// @desc    Update inquiry status
// @route   PUT /api/v1/inquiries/:id
// @access  Private (Admin)
const updateInquiry = async (req, res, next) => {
    try {
        const inquiry = await inquiryService.updateInquiryStatus(req.params.id, req.body);
        sendSuccess(res, 200, inquiry, 'Inquiry updated successfully');
    } catch (error) {
        next(error);
    }
};

// @desc    Delete inquiry
// @route   DELETE /api/v1/inquiries/:id
// @access  Private (Admin)
const deleteInquiry = async (req, res, next) => {
    try {
        await inquiryService.deleteInquiry(req.params.id);
        sendSuccess(res, 200, null, 'Inquiry deleted successfully');
    } catch (error) {
        next(error);
    }
};

// @desc    Get inquiry statistics
// @route   GET /api/v1/inquiries/stats
// @access  Private (Admin)
const getInquiryStats = async (req, res, next) => {
    try {
        const stats = await inquiryService.getInquiryStats();
        sendSuccess(res, 200, stats, 'Statistics retrieved successfully');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createInquiry,
    getInquiries,
    getInquiry,
    updateInquiry,
    deleteInquiry,
    getInquiryStats,
};
