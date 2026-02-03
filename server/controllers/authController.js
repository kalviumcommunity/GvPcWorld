// const jwt = require('jsonwebtoken');

// const loginUser = async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });
//   if (!user || !user.comparePassword(req.body.password)) {
//     return res.status(401).json({ message: 'Invalid credentials' });
//   }

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//     expiresIn: '7d',
//   });

//   res.cookie('token', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV == 'production',
//     sameSite: 'None',
//     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//   });

//   res.status(200).json({ message: 'Login successful' });
// };

export default function makeAuthController(authService) {
  return {
    register: async (req, res, next) => {
      try {
        const { name, email, password } = req.body;
        const result = await authService.register(name, email, password);
        res.status(201).json(result);
      } catch (error) {
        next(error); // Pass to global error handler
      }
    },

    login: async (req, res, next) => {
      try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        res.status(200).json(result);
      } catch (error) {
        next(error); // Pass to global error handler
      }
    }
  };
}