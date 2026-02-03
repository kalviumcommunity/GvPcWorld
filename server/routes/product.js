import express from 'express';
import Product from '../models/Product.js';
import makeProductRepository from '../data-access/productRepository.js';
import makeProductService from '../services/productService.js';
import makeProductController from '../controllers/productController.js';
const router = express.Router();

const productRepository = makeProductRepository(Product);
const productService = makeProductService(productRepository);
const productController = makeProductController(productService);

router.get('/', productController.getAll);
router.get('/:id', productController.getOne);

router.post('/', productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.remove);

export default router;