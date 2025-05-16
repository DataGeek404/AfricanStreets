
const bcrypt = require('bcryptjs');
const { executeQuery } = require('../database/connection');
const logger = require('../utils/logger');

// @desc    Get all users
// @route   GET /api/users
// @access  Admin
const getUsers = async (req, res, next) => {
  try {
    const users = await executeQuery(
      'SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC'
    );
    
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Admin/Private
const getUserById = async (req, res, next) => {
  try {
    const [user] = await executeQuery(
      'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
      [req.params.id]
    );

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    // Check if user is admin or requesting their own info
    if (req.user.role !== 'admin' && req.user.id !== user.id) {
      res.status(403);
      throw new Error('Not authorized to view this user');
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Admin/Private
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, role, password } = req.body;

    // Check if user exists
    const [user] = await executeQuery(
      'SELECT id FROM users WHERE id = ?',
      [id]
    );

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    // Check if user is admin or updating their own info
    if (req.user.role !== 'admin' && req.user.id !== parseInt(id)) {
      res.status(403);
      throw new Error('Not authorized to update this user');
    }

    // Only allow role changes if admin
    if (role && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Not authorized to change role');
    }

    // Prepare update fields
    let updateQuery = 'UPDATE users SET ';
    const updateValues = [];
    
    if (name) {
      updateQuery += 'name = ?, ';
      updateValues.push(name);
    }
    
    if (email) {
      updateQuery += 'email = ?, ';
      updateValues.push(email);
    }
    
    // Only admin can update role
    if (role && req.user.role === 'admin') {
      updateQuery += 'role = ?, ';
      updateValues.push(role);
    }
    
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateQuery += 'password = ?, ';
      updateValues.push(hashedPassword);
    }
    
    // Add the updated_at field
    updateQuery += 'updated_at = NOW() WHERE id = ?';
    updateValues.push(id);

    await executeQuery(updateQuery, updateValues);

    // Get updated user
    const [updatedUser] = await executeQuery(
      'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
      [id]
    );

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser
};
