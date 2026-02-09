const Content = require('../models/Content');
const { AppError } = require('../middlewares/errorHandler.middleware');

/**
 * Content Service - Business logic for content management
 */

// Get all content
const getAllContent = async () => {
    const content = await Content.find().lean();

    // Transform to key-value object
    const contentMap = content.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
    }, {});

    return contentMap;
};

// Get content by key
const getContentByKey = async (key) => {
    const content = await Content.findOne({ key: key.toLowerCase() });

    if (!content) {
        throw new AppError('Content not found', 404);
    }

    return content;
};

// Update or create content
const updateContent = async (key, value) => {
    const content = await Content.findOneAndUpdate(
        { key: key.toLowerCase() },
        { value },
        { new: true, upsert: true, runValidators: true }
    );

    return content;
};

// Delete content
const deleteContent = async (key) => {
    const content = await Content.findOneAndDelete({ key: key.toLowerCase() });

    if (!content) {
        throw new AppError('Content not found', 404);
    }

    return content;
};

module.exports = {
    getAllContent,
    getContentByKey,
    updateContent,
    deleteContent,
};
