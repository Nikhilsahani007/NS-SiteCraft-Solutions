const mongoose = require('mongoose');
const { INQUIRY_STATUS, SOURCE_PAGES } = require('../utils/constants');

const inquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
        index: true,
    },
    phone: {
        type: String,
        trim: true,
        match: [/^[0-9]{10,15}$/, 'Please provide a valid phone number'],
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true,
        minlength: [10, 'Message must be at least 10 characters'],
        maxlength: [1000, 'Message cannot exceed 1000 characters'],
    },
    sourcePage: {
        type: String,
        enum: Object.values(SOURCE_PAGES),
        default: SOURCE_PAGES.CONTACT,
    },
    status: {
        type: String,
        enum: Object.values(INQUIRY_STATUS),
        default: INQUIRY_STATUS.NEW,
        index: true,
    },
    adminNotes: {
        type: String,
        trim: true,
        maxlength: [500, 'Admin notes cannot exceed 500 characters'],
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt
});

// Indexes for better query performance
inquirySchema.index({ createdAt: -1 });
inquirySchema.index({ status: 1, createdAt: -1 });

// Virtual for formatted date (if needed)
inquirySchema.virtual('formattedDate').get(function () {
    return this.createdAt.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
});

// Ensure virtuals are included in JSON
inquirySchema.set('toJSON', { virtuals: true });
inquirySchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Inquiry', inquirySchema);
