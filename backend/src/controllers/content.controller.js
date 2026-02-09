const contentService = require('../services/content.service');
const { sendSuccess } = require('../utils/response.util');

/**
 * Content Controller - Handle content management requests
 */

// @desc    Get all content
// @route   GET /api/v1/content
// @access  Public
const getAllContent = async (req, res, next) => {
    try {
        const content = await contentService.getAllContent();
        sendSuccess(res, 200, content, 'Content retrieved successfully');
    } catch (error) {
        next(error);
    }
};

// @desc    Get content by key
// @route   GET /api/v1/content/:key
// @access  Public
const getContentByKey = async (req, res, next) => {
    try {
        const content = await contentService.getContentByKey(req.params.key);
        sendSuccess(res, 200, content, 'Content retrieved successfully');
    } catch (error) {
        next(error);
    }
};

// @desc    Update content
// @route   PUT /api/v1/content/:key
// @access  Private (Admin)
const updateContent = async (req, res, next) => {
    try {
        const content = await contentService.updateContent(req.params.key, req.body.value);
        sendSuccess(res, 200, content, 'Content updated successfully');
    } catch (error) {
        next(error);
    }
};

// @desc    Delete content
// @route   DELETE /api/v1/content/:key
// @access  Private (Admin)
const deleteContent = async (req, res, next) => {
    try {
        await contentService.deleteContent(req.params.key);
        sendSuccess(res, 200, null, 'Content deleted successfully');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllContent,
    getContentByKey,
    updateContent,
    deleteContent,
};
