import AppError from '../util/AppError.js';
import { logger } from '../util/logger.js';

/**
 * @param {ProductRepository} productRepository
 */
export default function makeProductService(productRepository) {
  return {
    createProduct: async (productData) => {
      logger.info(`Creating new product: ${productData.name}`);
      // Business Logic: You could check here if a similar product already exists
      return await productRepository.create(productData);
    },

    getAllProducts: async (filters) => {
      // Logic: You can add complex filtering logic here later
      return await productRepository.findAll(filters);
    },

    getProduct: async (id) => {
      const product = await productRepository.findById(id);
      if (!product) {
        throw new AppError('Product not found', 404);
      }
      return product;
    },

    updateProduct: async (id, updates) => {
      logger.info(`Updating product: ${id}`);
      const updatedProduct = await productRepository.updateById(id, updates);
      if (!updatedProduct) {
        throw new AppError('Product not found', 404);
      }
      return updatedProduct;
    },

    deleteProduct: async (id) => {
      logger.warn(`Deleting product: ${id}`);
      const deleted = await productRepository.deleteById(id);
      if (!deleted) {
        throw new AppError('Product not found', 404);
      }
      return { message: 'Product deleted successfully' };
    }
  };
}