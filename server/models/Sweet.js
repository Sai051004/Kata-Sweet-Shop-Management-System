const mongoose = require('mongoose');

/**
 * Sweet Schema
 * Defines the structure for Sweets inventory items.
 * Use unique name to prevent duplicates.
 */
const sweetSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    image: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const Sweet = mongoose.model('Sweet', sweetSchema);

module.exports = Sweet;
