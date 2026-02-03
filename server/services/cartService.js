import AppError from '../util/AppError.js';
import { logger } from '../util/logger.js';

/**
 * @param {CartRepository} cartRepository
 */
export default function makeCartService(cartRepository) {
  return {
    getCart: async (userId) => {
      const cart = await cartRepository.findByUserId(userId);
      if (!cart) return { userId, items: [] };
      return cart;
    },

    addItemToCart: async (userId, newItem) => {
      logger.info(`Adding item to cart for user: ${userId}`);
      
      const cart = await cartRepository.findByUserId(userId);
      const items = cart ? cart.items : [];
      
      items.push(newItem);

      const updatedCart = await cartRepository.update(userId, { items });
      return updatedCart;
    },

    removeItem: async (userId, itemId) => {
      const cart = await cartRepository.findByUserId(userId);
      if (!cart) throw new AppError('Cart not found', 404);

      const filteredItems = cart.items.filter(item => item._id.toString() !== itemId);
      return await cartRepository.update(userId, { items: filteredItems });
    }
  };
}