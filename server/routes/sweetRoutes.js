const express = require('express');
const router = express.Router();
const {
    createSweet,
    getSweets,
    searchSweets,
    updateSweet,
    deleteSweet,
    purchaseSweet,
    restockSweet
} = require('../controllers/sweetController');
const { protect, admin } = require('../middleware/authMiddleware');

const upload = require('../middleware/uploadMiddleware');


router.route('/')
    .get(protect, getSweets)
    .post(protect, upload.single('image'), createSweet);

/**
 * @swagger
 * /api/sweets/search:
 *   get:
 *     summary: Search for sweets
 *     tags: [Sweets]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search term
 *     responses:
 *       200:
 *         description: List of matching sweets
 */
router.get('/search', protect, searchSweets);

/**
 * @swagger
 * /api/sweets/{id}:
 *   put:
 *     summary: Update a sweet (Admin only)
 *     tags: [Sweets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: The sweet was updated
 *   delete:
 *     summary: Delete a sweet (Admin only)
 *     tags: [Sweets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: The sweet was deleted
 */
router.route('/:id')
    .put(protect, upload.single('image'), updateSweet)
    .delete(protect, admin, deleteSweet);

/**
 * @swagger
 * /api/sweets/{id}/purchase:
 *   post:
 *     summary: Purchase a sweet (Decreases stock)
 *     tags: [Sweets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Purchase successful
 */
router.post('/:id/purchase', protect, purchaseSweet);
router.post('/:id/restock', protect, admin, restockSweet);

module.exports = router;
