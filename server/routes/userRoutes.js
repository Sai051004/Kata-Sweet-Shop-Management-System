const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getCart,
    addToCart,
    removeFromCart,
    getFavorites,
    toggleFavorite,
    getHistory,
    checkout
} = require('../controllers/userController');

// Cart
router.route('/cart')
    .get(protect, getCart)
    .post(protect, addToCart);
router.delete('/cart/:sweetId', protect, removeFromCart);

// Favorites
router.route('/favorites')
    .get(protect, getFavorites);
router.post('/favorites/:sweetId', protect, toggleFavorite);

// History & Checkout
router.get('/history', protect, getHistory);
router.post('/checkout', protect, checkout);

module.exports = router;
