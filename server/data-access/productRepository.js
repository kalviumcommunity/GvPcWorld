/**
 * @typedef {Object} ProductRepository
 * @property {(productData: object) => Promise<object>} create
 * @property {(id: string) => Promise<object>} findById
 * @property {(query: object) => Promise<Array>} findAll
 * @property {(id: string, updates: object) => Promise<object>} updateById
 * @property {(id: string) => Promise<object>} deleteById
 */

export default function makeProductRepository(ProductModel) {
  return {
    create: async (productData) => {
      const product = new ProductModel(productData);
      return await product.save();
    },
    findById: async (id) => {
      return await ProductModel.findById(id);
    },
    findAll: async (query = {}) => {
      return await ProductModel.find(query);
    },
    updateById: async (id, updates) => {
      return await ProductModel.findByIdAndUpdate(id, updates, { new: true });
    },
    deleteById: async (id) => {
      return await ProductModel.findByIdAndDelete(id);
    }
  };
}