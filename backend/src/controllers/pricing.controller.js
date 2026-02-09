const pricingService = require('../services/pricing.service');
const { sendSuccess } = require('../utils/response.util');

/**
 * Pricing Controller - Handle pricing management requests
 */

// @desc    Get visible pricing packages
// @route   GET /api/v1/pricing
// @access  Public
const getVisiblePricing = async (req, res, next) => {
    try {
        const packages = await pricingService.getVisiblePricing();
        sendSuccess(res, 200, packages, 'Pricing packages retrieved successfully');
    } catch (error) {
        next(error);
    }
};

// @desc    Get all pricing packages
// @route   GET /api/v1/pricing/all
// @access  Private (Admin)
const getAllPricing = async (req, res, next) => {
    try {
        const packages = await pricingService.getAllPricing();
        sendSuccess(res, 200, packages, 'All pricing packages retrieved successfully');
    } catch (error) {
        next(error);
    }
};

// @desc    Get pricing by ID
// @route   GET /api/v1/pricing/:id
// @access  Private (Admin)
const getPricing = async (req, res, next) => {
    try {
        const pricing = await pricingService.getPricingById(req.params.id);
        sendSuccess(res, 200, pricing, 'Pricing package retrieved successfully');
    } catch (error) {
        next(error);
    }
};

// @desc    Create pricing package
// @route   POST /api/v1/pricing
// @access  Private (Admin)
const createPricing = async (req, res, next) => {
    try {
        const pricing = await pricingService.createPricing(req.body);
        sendSuccess(res, 201, pricing, 'Pricing package created successfully');
    } catch (error) {
        next(error);
    }
};

// @desc    Update pricing package
// @route   PUT /api/v1/pricing/:id
// @access  Private (Admin)
const updatePricing = async (req, res, next) => {
    try {
        const pricing = await pricingService.updatePricing(req.params.id, req.body);
        sendSuccess(res, 200, pricing, 'Pricing package updated successfully');
    } catch (error) {
        next(error);
    }
};

// @desc    Toggle pricing visibility
// @route   PATCH /api/v1/pricing/:id/toggle
// @access  Private (Admin)
const toggleVisibility = async (req, res, next) => {
    try {
        const pricing = await pricingService.toggleVisibility(req.params.id);
        sendSuccess(res, 200, pricing, 'Pricing visibility toggled successfully');
    } catch (error) {
        next(error);
    }
};

// @desc    Delete pricing package
// @route   DELETE /api/v1/pricing/:id
// @access  Private (Admin)
const deletePricing = async (req, res, next) => {
    try {
        await pricingService.deletePricing(req.params.id);
        sendSuccess(res, 200, null, 'Pricing package deleted successfully');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getVisiblePricing,
    getAllPricing,
    getPricing,
    createPricing,
    updatePricing,
    toggleVisibility,
    deletePricing,
};
