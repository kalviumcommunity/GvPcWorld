import express from 'express';
import Cart from '../models/Cart.js';
import makeCartRepository from '../data-access/cartRepository.js';
import makeCartService from '../services/cartService.js';
import makeCartController from '../controllers/cartController.js';
import isAuth from '../middleware/isAuth.js'; 

const router = express.Router();

const cartRepository = makeCartRepository(Cart);
const cartService = makeCartService(cartRepository);
const cartController = makeCartController(cartService);

router.use(isAuth);

router.get('/', cartController.get);
router.post('/add', cartController.add);
router.delete('/:itemId', cartController.remove);

export default router;