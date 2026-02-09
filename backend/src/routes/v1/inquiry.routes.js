const express = require('express');
const router = express.Router();
const inquiryController = require('../../controllers/inquiry.controller');
const { protect } = require('../../middlewares/auth.middleware');
const validate = require('../../middlewares/validate.middleware');
const { publicLimiter } = require('../../middlewares/rateLimiter.middleware');
const {
    createInquirySchema,
    updateInquiryStatusSchema,
} = require('../../utils/validation.schemas');

// Public routes
router.post(
    '/',
    publicLimiter,
    validate(createInquirySchema),
    inquiryController.createInquiry
);

// Protected routes (Admin only)
router.get('/stats', protect, inquiryController.getInquiryStats);
router.get('/', protect, inquiryController.getInquiries);
router.get('/:id', protect, inquiryController.getInquiry);
router.put(
    '/:id',
    protect,
    validate(updateInquiryStatusSchema),
    inquiryController.updateInquiry
);
router.delete('/:id', protect, inquiryController.deleteInquiry);

module.exports = router;
