const Sweet = require('../models/Sweet');

/**
 * @desc    Create a new sweet
 * @route   POST /api/sweets
 * @access  Protected
 */
const createSweet = async (req, res) => {
    const { name, category, price, quantity } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const sweet = await Sweet.create({
            name,
            category,
            price,
            quantity,
            image
        });
        res.status(201).json(sweet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * @desc    Get all sweets
 * @route   GET /api/sweets
 * @access  Protected
 */
const getSweets = async (req, res) => {
    try {
        const sweets = await Sweet.find({});
        res.json(sweets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc    Search sweets by name, category, or price range
 * @route   GET /api/sweets/search
 * @access  Protected
 */
const searchSweets = async (req, res) => {
    const { query } = req.query; // Expecting ?query=something
    // Or specific fields like ?name=x&category=y
    // Requirement says: "Search for sweets by name, category, or price range."
    
    // I will implement a general search or field specific.
    // Let's support query params: name, category, minPrice, maxPrice
    
    const { name, category, minPrice, maxPrice } = req.query;

    let filter = {};
    if (name) {
        filter.name = { $regex: name, $options: 'i' };
    }
    if (category) {
        filter.category = { $regex: category, $options: 'i' };
    }
    if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    try {
        const sweets = await Sweet.find(filter);
        res.json(sweets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc    Update a sweet (Admin only)
 * @route   PUT /api/sweets/:id
 * @access  Protected
 */
const updateSweet = async (req, res) => {
    try {
        const sweet = await Sweet.findById(req.params.id);

        if (sweet) {
            sweet.name = req.body.name || sweet.name;
            sweet.category = req.body.category || sweet.category;
            sweet.price = req.body.price !== undefined ? req.body.price : sweet.price;
            sweet.quantity = req.body.quantity !== undefined ? req.body.quantity : sweet.quantity;
            if (req.file) {
                sweet.image = `/uploads/${req.file.filename}`;
            }

            const updatedSweet = await sweet.save();
            res.json(updatedSweet);
        } else {
            res.status(404).json({ message: 'Sweet not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * @desc    Delete a sweet (Admin only)
 * @route   DELETE /api/sweets/:id
 * @access  Admin
 */
const deleteSweet = async (req, res) => {
    try {
        const sweet = await Sweet.findById(req.params.id);

        if (sweet) {
            await sweet.deleteOne(); // or remove() depending on mg version, deleteOne is safer now
            res.json({ message: 'Sweet removed' });
        } else {
            res.status(404).json({ message: 'Sweet not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc    Purchase a sweet (Decreases stock)
 * @route   POST /api/sweets/:id/purchase
 * @access  Protected
 */
const purchaseSweet = async (req, res) => {
    try {
        const sweet = await Sweet.findById(req.params.id);

        if (sweet) {
            if (sweet.quantity > 0) {
                sweet.quantity = sweet.quantity - 1;
                const updatedSweet = await sweet.save();
                res.json(updatedSweet);
            } else {
                res.status(400).json({ message: 'Sweet is out of stock' });
            }
        } else {
            res.status(404).json({ message: 'Sweet not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * @desc    Restock a sweet (Increase quantity)
 * @route   POST /api/sweets/:id/restock
 * @access  Admin
 */
const restockSweet = async (req, res) => {
    const { quantity } = req.body; // Amount to add
    const qtyToAdd = quantity ? Number(quantity) : 1; // Default to 1 if not specified? Or required? 
    // "Restock a sweet, increasing its quantity" - likely takes an amount or just +1? 
    // Usually restock implies adding a batch. I'll read body.quantity or default to 1.

    try {
        const sweet = await Sweet.findById(req.params.id);

        if (sweet) {
            sweet.quantity = sweet.quantity + qtyToAdd;
            const updatedSweet = await sweet.save();
            res.json(updatedSweet);
        } else {
            res.status(404).json({ message: 'Sweet not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createSweet,
    getSweets,
    searchSweets,
    updateSweet,
    deleteSweet,
    purchaseSweet,
    restockSweet
};
