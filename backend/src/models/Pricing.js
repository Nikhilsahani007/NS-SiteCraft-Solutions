const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Package name is required'],
        trim: true,
    },
    priceRange: {
        type: String,
        required: [true, 'Price range is required'],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    features: [{
        type: String,
        trim: true,
    }],
    isVisible: {
        type: Boolean,
        default: true,
    },
    displayOrder: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

// Indexes
pricingSchema.index({ displayOrder: 1 });
pricingSchema.index({ isVisible: 1, displayOrder: 1 });

module.exports = mongoose.model('Pricing', pricingSchema);
