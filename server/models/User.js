const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * User Schema
 * Defines the structure for Users in the system, including:
 * - Basic credentials (username, password)
 * - Role (user/admin)
 * - E-commerce data (ShoppingCart, Favorites, PurchaseHistory)
 */
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    // References to Sweet model for favorites
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sweet'
    }],
    // Associated Shopping Cart
    cart: [{
        sweet: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sweet'
        },
        quantity: {
            type: Number,
            default: 1,
            min: 1
        }
    }],
    // Historical record of purchases
    purchaseHistory: [{
        items: [{
            sweet: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Sweet'
            },
            name: String,
            price: Number,
            quantity: Number
        }],
        totalAmount: Number,
        date: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

/**
 * Pre-save middleware to hash the password before storing it.
 * Only runs if the password field has been modified.
 */
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

/**
 * methods.matchPassword
 * Compares entered password with the hashed password in database.
 * @param {string} enteredPassword 
 * @returns {boolean}
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
