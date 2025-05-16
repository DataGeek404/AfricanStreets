const jwt = require('jsonwebtoken');
const { executeQuery } = require('../database/connection');

// Protect routes
const protect = async (req, res, next) => {
  let token;

  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      const users = await executeQuery(
        'SELECT id, name, email, role FROM users WHERE id = ?',
        [decoded.id]
      );

      if (users.length === 0) {
        res.status(401);
        return next(new Error('Not authorized, user not found'));
      }

      req.user = users[0];
      return next(); // ✅ Early return to prevent fallthrough

    } catch (error) {
      res.status(401);
      return next(new Error('Not authorized, invalid token'));
    }
  } else {
    res.status(401);
    return next(new Error('Not authorized, no token'));
  }
};

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  } else {
    res.status(403);
    return next(new Error('Not authorized as an admin'));
  }
};

module.exports = { protect, admin };
