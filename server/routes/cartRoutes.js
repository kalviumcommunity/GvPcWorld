const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');
router.all('*', authenticateToken);

router.get('/', (req, res, next) => {
  console.log('Processing GET cart request');
  getCart(req,res,next);
});

router.post('/add', (req, res, next) => {
  console.log('Processing add to cart request', { body: req.body });
  addToCart(req, res, next);
});

router.put('/update', (req, res, next) => {
  console.log('Processing update cart request', { body: req.body });
  updateCartItem(req, res, next);
});

router.delete('/delete/:productId', (req, res, next) => {
  console.log('Processing remove from cart request', { productId: req.params.productId });
  removeFromCart(req, res, next);
});

router.delete('/delete/all', (req, res, next) => {
  console.log('Processing clear cart request');
  clearCart(req, res, next);
});

module.exports = router;
