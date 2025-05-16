
const express = require('express');
const router = express.Router();
const { 
  getDonations, 
  getDonationById, 
  createDonation, 
  updateDonationStatus 
} = require('../controllers/donationController');
const { protect, admin } = require('../middleware/authMiddleware');
const { body } = require('express-validator');

/**
 * @swagger
 * /api/donations:
 *   get:
 *     summary: Get all donations (admin only)
 *     tags: [Donations]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all donations
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Not authorized as an admin
 */
router.get('/', protect, admin, getDonations);

/**
 * @swagger
 * /api/donations/{id}:
 *   get:
 *     summary: Get a donation by ID
 *     tags: [Donations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Donation details
 *       404:
 *         description: Donation not found
 */
router.get('/:id', protect, getDonationById);

/**
 * @swagger
 * /api/donations:
 *   post:
 *     summary: Create a new donation
 *     tags: [Donations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - payment_method
 *               - payment_id
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 50.00
 *               currency:
 *                 type: string
 *                 example: USD
 *               payment_method:
 *                 type: string
 *                 example: stripe
 *               payment_id:
 *                 type: string
 *                 example: pi_12345
 *               donor_name:
 *                 type: string
 *                 example: John Doe
 *               donor_email:
 *                 type: string
 *                 example: john@example.com
 *               is_anonymous:
 *                 type: boolean
 *                 example: false
 *               message:
 *                 type: string
 *                 example: Keep up the good work!
 *     responses:
 *       201:
 *         description: Donation created
 *       400:
 *         description: Invalid donation data
 */
router.post(
  '/', 
  [
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('payment_method').notEmpty().withMessage('Payment method is required'),
    body('payment_id').notEmpty().withMessage('Payment ID is required')
  ],
  createDonation
);

/**
 * @swagger
 * /api/donations/{id}/status:
 *   put:
 *     summary: Update donation status (for payment gateway callbacks)
 *     tags: [Donations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, completed, failed]
 *                 example: completed
 *     responses:
 *       200:
 *         description: Donation status updated
 *       404:
 *         description: Donation not found
 */
router.put(
  '/:id/status',
  [
    body('status')
      .isIn(['pending', 'completed', 'failed'])
      .withMessage('Status must be pending, completed, or failed')
  ],
  updateDonationStatus
);

module.exports = router;
