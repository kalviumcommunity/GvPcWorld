const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  console.log('Authenticating request to:', req.originalUrl);
  const token = req.cookies.jwt;
  
  if (!token) {
    console.log('No token found in request');
    return res.status(401).json({ 
      message: 'Authentication required',
      error: 'No token provided'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ 
      message: 'Invalid or expired token',
      error: err.message 
    });
  }
};

module.exports = { authenticateToken };
