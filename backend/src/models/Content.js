const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    value: {
        type: mongoose.Schema.Types.Mixed, // Can be string, object, or array
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    version: {
        type: Number,
        default: 1,
    },
}, {
    timestamps: true,
});

// Index for faster lookups
contentSchema.index({ key: 1 });

// Increment version on update
contentSchema.pre('save', function (next) {
    if (this.isModified('value') && !this.isNew) {
        this.version += 1;
    }
    next();
});

module.exports = mongoose.model('Content', contentSchema);
