import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';  
import connectDB from './config/db.js';
import User from './models/User.js';
import {} from './models/Cart.js';
// import router from './routes/authRoutes.js';
// import cartRoutes from './routes/cartRoutes.js';
// import productRoutes from './routes/productRoutes.js';
console.log(typeof express);
dotenv.config();
const app = express();
app.use(express.json());
connectDB();
app.post('/test', async (req, res) => {
  try {
    const {productid, quantity, price, isCustomBuild, selectedComponents} = req.body;
    const user = await User.create({ productid, quantity, price, isCustomBuild, selectedComponents });
    res.status(201).json({ message: 'product added succefully created successfully', user });
  }

  catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  } 
});
app.set('trust proxy', 1);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ 
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// Log all incoming requests to help debug route issue
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// console.log('Initializing passport and session...');
// app.use(passport.initialize());

// app.use(session({
//   secret: process.env.SESSION_SECRET || 'dev_secret',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'None'
//   }
// }));

const mountPaths = {
  auth: '/auth',
  cart: '/cart',
  products: '/products'
};

// Object.entries({
//   [mountPaths.auth]: authRoutes,
//   [mountPaths.cart]: cartRoutes,
//   [mountPaths.products]: productRoutes
// }).forEach(([path, router]) => {
//   console.log(`Mounting routes at ${path}`);
//   app.use(path, (req, res, next) => {
//     console.log(`Processing ${req.method} request to ${path}${req.url}`);
//     router(req, res, next);
//   });
// });

// console.log('All routes registered successfully');
// app.use('/cart', cartRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something broke!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});


const PORT = process.env.PORT || 4000;
const startServer = async () => {
  try {
    console.log('Starting server initialization...');
    await connectDB();
    console.log('MongoDB connected successfully');
    
    // Log all registered routes for debugging
    console.log('\nRegistered Routes:');
    app._router.stack.forEach(middleware => {
      if (middleware.route) {
        console.log(`${Object.keys(middleware.route.methods)} ${middleware.route.path}`);
      } else if (middleware.name === 'router') {
        console.log(`Router middleware: ${middleware.regexp}`);
      }
    });
      app.listen(PORT, () => {
      console.log(`\nServer running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1); 
  }
};

startServer();
