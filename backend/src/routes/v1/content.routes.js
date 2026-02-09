const express = require('express');
const router = express.Router();
const contentController = require('../../controllers/content.controller');
const { protect } = require('../../middlewares/auth.middleware');
const validate = require('../../middlewares/validate.middleware');
const { updateContentSchema } = require('../../utils/validation.schemas');

// Public routes
router.get('/', contentController.getAllContent);
router.get('/:key', contentController.getContentByKey);

// Protected routes (Admin only)
router.put(
    '/:key',
    protect,
    validate(updateContentSchema),
    contentController.updateContent
);
router.delete('/:key', protect, contentController.deleteContent);

module.exports = router;
