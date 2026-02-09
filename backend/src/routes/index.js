const express = require('express');
const router = express.Router();

// Import v1 routes
const inquiryRoutes = require('./v1/inquiry.routes');
const authRoutes = require('./v1/auth.routes');
const contentRoutes = require('./v1/content.routes');
const pricingRoutes = require('./v1/pricing.routes');

// Import health controller
const healthController = require('../controllers/health.controller');

// API v1 routes
router.use('/v1/inquiries', inquiryRoutes);
router.use('/v1/auth', authRoutes);
router.use('/v1/content', contentRoutes);
router.use('/v1/pricing', pricingRoutes);

// Health check routes
router.get('/health', healthController.getHealth);
router.get('/health/detailed', healthController.getDetailedHealth);
router.get('/health/ready', healthController.getReadiness);
router.get('/health/live', healthController.getLiveness);

module.exports = router;
