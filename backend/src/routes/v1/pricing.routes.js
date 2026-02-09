const express = require('express');
const router = express.Router();
const pricingController = require('../../controllers/pricing.controller');
const { protect } = require('../../middlewares/auth.middleware');
const validate = require('../../middlewares/validate.middleware');
const { updatePricingSchema } = require('../../utils/validation.schemas');

// Public routes
router.get('/', pricingController.getVisiblePricing);

// Protected routes (Admin only)
router.get('/all', protect, pricingController.getAllPricing);
router.get('/:id', protect, pricingController.getPricing);
router.post(
    '/',
    protect,
    validate(updatePricingSchema),
    pricingController.createPricing
);
router.put(
    '/:id',
    protect,
    validate(updatePricingSchema),
    pricingController.updatePricing
);
router.patch('/:id/toggle', protect, pricingController.toggleVisibility);
router.delete('/:id', protect, pricingController.deletePricing);

module.exports = router;
