const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// @desc    Reset Database (Delete all collections)
// @route   DELETE /api/test/reset
// @access  Public (Guarded by logic)
router.delete('/reset', async (req, res) => {
    try {
        // Drop all standard collections
        if (mongoose.connection.readyState === 1) {
            const collections = await mongoose.connection.db.collections();
            for (let collection of collections) {
                await collection.deleteMany({});
            }
            res.status(200).json({ message: 'Database reset successful' });
        } else {
            res.status(500).json({ message: 'Database not connected' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
