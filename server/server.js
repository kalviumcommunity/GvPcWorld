import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';  
import connectDB from './config/db.js';
import authroutes from './routes/auth.js';
import requestContext from './middleware/requestContext.js';
import errorHandler from './middleware/errorHandler.js';
import productRoutes from './routes/product.js';
import cartRoutes from './routes/cart.js';
// we are going on a new journey and this is important to do.

dotenv.config();
const app = express();
app.use(express.json());
app.use(requestContext); 
connectDB();
app.use('/auth', authroutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);



app.use(cookieParser());
app.use(cors({ 
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));


app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});


app.use(errorHandler)
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
