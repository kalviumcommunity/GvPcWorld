const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
  // Authenticate user credentials
  const user = await User.findOne({ email: req.body.email });
  if (!user || !user.comparePassword(req.body.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  // Set HttpOnly cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Set to true in production
    sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json({ message: 'Login successful' });
};
