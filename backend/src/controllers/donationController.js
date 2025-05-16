
const { executeQuery } = require('../database/connection');
const logger = require('../utils/logger');

// @desc    Get all donations
// @route   GET /api/donations
// @access  Admin
const getDonations = async (req, res, next) => {
  try {
    const donations = await executeQuery(`
      SELECT d.*, 
             CASE WHEN d.is_anonymous = 1 THEN 'Anonymous' ELSE d.donor_name END as display_name
      FROM donations d
      ORDER BY d.created_at DESC
    `);
    
    res.json(donations);
  } catch (error) {
    next(error);
  }
};

// @desc    Get donation by ID
// @route   GET /api/donations/:id
// @access  Private/Admin
const getDonationById = async (req, res, next) => {
  try {
    const [donation] = await executeQuery(
      'SELECT * FROM donations WHERE id = ?', 
      [req.params.id]
    );

    if (!donation) {
      res.status(404);
      throw new Error('Donation not found');
    }

    // Check if user is admin or the owner of the donation
    if (req.user.role !== 'admin' && (donation.user_id !== req.user.id && !donation.is_anonymous)) {
      res.status(403);
      throw new Error('Not authorized to access this donation');
    }

    res.json(donation);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new donation
// @route   POST /api/donations
// @access  Public
const createDonation = async (req, res, next) => {
  try {
    const { 
      amount, 
      currency = 'USD', 
      payment_method, 
      payment_id, 
      donor_name, 
      donor_email, 
      is_anonymous = false, 
      message 
    } = req.body;

    // Get user ID if authenticated
    const user_id = req.user ? req.user.id : null;

    const result = await executeQuery(
      `INSERT INTO donations (
        user_id, amount, currency, payment_method, payment_id, 
        donor_name, donor_email, is_anonymous, message
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id, amount, currency, payment_method, payment_id,
        donor_name, donor_email, is_anonymous, message
      ]
    );

    if (result.affectedRows > 0) {
      const [donation] = await executeQuery(
        'SELECT * FROM donations WHERE id = ?',
        [result.insertId]
      );

      res.status(201).json(donation);
    } else {
      res.status(400);
      throw new Error('Invalid donation data');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update donation status
// @route   PUT /api/donations/:id/status
// @access  Private (Payment gateway callback)
const updateDonationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Check if donation exists
    const [donation] = await executeQuery(
      'SELECT id FROM donations WHERE id = ?',
      [id]
    );

    if (!donation) {
      res.status(404);
      throw new Error('Donation not found');
    }

    await executeQuery(
      'UPDATE donations SET status = ?, updated_at = NOW() WHERE id = ?',
      [status, id]
    );

    res.json({ message: 'Donation status updated' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDonations,
  getDonationById,
  createDonation,
  updateDonationStatus
};
