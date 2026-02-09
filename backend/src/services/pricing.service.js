const Pricing = require('../models/Pricing');
const { AppError } = require('../middlewares/errorHandler.middleware');

/**
 * Pricing Service - Business logic for pricing management
 */

// Get all visible pricing packages (public)
const getVisiblePricing = async () => {
    const packages = await Pricing.find({ isVisible: true })
        .sort({ displayOrder: 1 })
        .lean();

    return packages;
};

// Get all pricing packages (admin)
const getAllPricing = async () => {
    const packages = await Pricing.find()
        .sort({ displayOrder: 1 })
        .lean();

    return packages;
};

// Get pricing by ID
const getPricingById = async (id) => {
    const pricing = await Pricing.findById(id);

    if (!pricing) {
        throw new AppError('Pricing package not found', 404);
    }

    return pricing;
};

// Create pricing package
const createPricing = async (pricingData) => {
    const pricing = await Pricing.create(pricingData);
    return pricing;
};

// Update pricing package
const updatePricing = async (id, updateData) => {
    const pricing = await Pricing.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    );

    if (!pricing) {
        throw new AppError('Pricing package not found', 404);
    }

    return pricing;
};

// Toggle visibility
const toggleVisibility = async (id) => {
    const pricing = await Pricing.findById(id);

    if (!pricing) {
        throw new AppError('Pricing package not found', 404);
    }

    pricing.isVisible = !pricing.isVisible;
    await pricing.save();

    return pricing;
};

// Delete pricing package
const deletePricing = async (id) => {
    const pricing = await Pricing.findByIdAndDelete(id);

    if (!pricing) {
        throw new AppError('Pricing package not found', 404);
    }

    return pricing;
};

module.exports = {
    getVisiblePricing,
    getAllPricing,
    getPricingById,
    createPricing,
    updatePricing,
    toggleVisibility,
    deletePricing,
};
