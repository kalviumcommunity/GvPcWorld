const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  addReview,
  getCompatibleProducts
} = require('../controllers/productController');

// Public routes
router.get('/', getProducts);
router.get('/compatible', getCompatibleProducts);
router.get('/:id', getProduct);

// Protected routes (require authentication)
router.use(authenticateToken);
router.post('/', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.post('/:id/reviews', addReview);

module.exports = router;
