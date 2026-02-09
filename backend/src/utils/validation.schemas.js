const Joi = require('joi');
const { INQUIRY_STATUS, SOURCE_PAGES } = require('./constants');

/**
 * Validation schemas using Joi
 */

// Inquiry validation
const createInquirySchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 2 characters',
            'string.max': 'Name cannot exceed 100 characters',
        }),

    email: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Please provide a valid email address',
        }),

    phone: Joi.string()
        .trim()
        .pattern(/^[0-9]{10,15}$/)
        .allow('', null)
        .messages({
            'string.pattern.base': 'Please provide a valid phone number (10-15 digits)',
        }),

    message: Joi.string()
        .trim()
        .min(10)
        .max(1000)
        .required()
        .messages({
            'string.empty': 'Message is required',
            'string.min': 'Message must be at least 10 characters',
            'string.max': 'Message cannot exceed 1000 characters',
        }),

    sourcePage: Joi.string()
        .valid(...Object.values(SOURCE_PAGES))
        .default(SOURCE_PAGES.CONTACT),
});

// Update inquiry status
const updateInquiryStatusSchema = Joi.object({
    status: Joi.string()
        .valid(...Object.values(INQUIRY_STATUS))
        .required()
        .messages({
            'any.only': 'Invalid status value',
            'string.empty': 'Status is required',
        }),

    adminNotes: Joi.string()
        .trim()
        .max(500)
        .allow('', null)
        .messages({
            'string.max': 'Admin notes cannot exceed 500 characters',
        }),
});

// Auth validation
const loginSchema = Joi.object({
    email: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Please provide a valid email address',
        }),

    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 6 characters',
        }),
});

// Content validation
const updateContentSchema = Joi.object({
    value: Joi.alternatives()
        .try(
            Joi.string(),
            Joi.object(),
            Joi.array()
        )
        .required()
        .messages({
            'any.required': 'Content value is required',
        }),
});

// Pricing validation
const updatePricingSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .messages({
            'string.min': 'Package name must be at least 2 characters',
            'string.max': 'Package name cannot exceed 100 characters',
        }),

    priceRange: Joi.string()
        .trim()
        .max(50)
        .messages({
            'string.max': 'Price range cannot exceed 50 characters',
        }),

    description: Joi.string()
        .trim()
        .max(200)
        .messages({
            'string.max': 'Description cannot exceed 200 characters',
        }),

    features: Joi.array()
        .items(Joi.string().trim().max(200))
        .messages({
            'array.base': 'Features must be an array',
        }),

    isVisible: Joi.boolean(),

    displayOrder: Joi.number()
        .integer()
        .min(0)
        .messages({
            'number.base': 'Display order must be a number',
            'number.min': 'Display order cannot be negative',
        }),
});

module.exports = {
    createInquirySchema,
    updateInquiryStatusSchema,
    loginSchema,
    updateContentSchema,
    updatePricingSchema,
};
