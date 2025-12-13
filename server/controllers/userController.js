const User = require('../models/User');
const Sweet = require('../models/Sweet');

// --- CART ---

/**
 * @desc    Get user cart
 * @route   GET /api/users/cart
 * @access  Private
 */
const getCart = async (req, res) => {
    const user = await User.findById(req.user._id).populate('cart.sweet');
    if (user) {
        res.json(user.cart);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

/**
 * @desc    Add item to cart
 * @route   POST /api/users/cart
 * @access  Private
 */
const addToCart = async (req, res) => {
    const { sweetId, quantity } = req.body;
    const user = await User.findById(req.user._id);

    if (user) {
        // Check if item already exists
        const itemIndex = user.cart.findIndex(item => item.sweet.toString() === sweetId);

        if (itemIndex > -1) {
            user.cart[itemIndex].quantity += Number(quantity);
        } else {
            user.cart.push({ sweet: sweetId, quantity: Number(quantity) });
        }
        await user.save();
        res.json(user.cart);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

/**
 * @desc    Remove item from cart
 * @route   DELETE /api/users/cart/:sweetId
 * @access  Private
 */
const removeFromCart = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.cart = user.cart.filter(item => item.sweet.toString() !== req.params.sweetId);
        await user.save();
        res.json(user.cart);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};


// --- FAVORITES ---

/**
 * @desc    Get user favorites
 * @route   GET /api/users/favorites
 * @access  Private
 */
const getFavorites = async (req, res) => {
    const user = await User.findById(req.user._id).populate('favorites');
    res.json(user.favorites);
};

/**
 * @desc    Toggle favorite status of a sweet
 * @route   POST /api/users/favorites/:sweetId
 * @access  Private
 */
const toggleFavorite = async (req, res) => {
    const sweetId = req.params.sweetId;
    const user = await User.findById(req.user._id);

    if (user.favorites.includes(sweetId)) {
        user.favorites = user.favorites.filter(id => id.toString() !== sweetId);
    } else {
        user.favorites.push(sweetId);
    }
    await user.save();
    res.json(user.favorites);
};

// --- HISTORY & CHECKOUT ---

/**
 * @desc    Get purchase history
 * @route   GET /api/users/history
 * @access  Private
 */
const getHistory = async (req, res) => {
    const user = await User.findById(req.user._id);
    res.json(user.purchaseHistory);
};

/**
 * @desc    Checkout cart (Purchase items)
 * @route   POST /api/users/checkout
 * @access  Private
 */
const checkout = async (req, res) => {
    const user = await User.findById(req.user._id).populate('cart.sweet');
    
    if (!user || user.cart.length === 0) {
        return res.status(400).json({ message: 'Cart is empty' });
    }

    let totalAmount = 0;
    const orderItems = [];

    // Verify stock and calculate total
    for (const item of user.cart) {
        const sweet = await Sweet.findById(item.sweet._id);
        if (!sweet) return res.status(404).json({ message: `Sweet not found` });
        if (sweet.quantity < item.quantity) {
            return res.status(400).json({ message: `${sweet.name} is out of stock or low quantity` });
        }
        
        // Deduct stock
        sweet.quantity -= item.quantity;
        await sweet.save();

        totalAmount += sweet.price * item.quantity;
        orderItems.push({
            sweet: sweet._id,
            name: sweet.name,
            price: sweet.price,
            quantity: item.quantity
        });
    }

    // Add to history
    user.purchaseHistory.push({
        items: orderItems,
        totalAmount,
        date: Date.now()
    });

    // Clear cart
    user.cart = [];
    await user.save();

    res.json({ message: 'Purchase successful', order: user.purchaseHistory[user.purchaseHistory.length - 1] });
};

module.exports = {
    getCart,
    addToCart,
    removeFromCart,
    getFavorites,
    toggleFavorite,
    getHistory,
    checkout
};
