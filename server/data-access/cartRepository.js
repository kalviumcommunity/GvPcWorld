/**
 * @typedef {Object} CartRepository
 * @property {(userId: string) => Promise<object>} findByUserId
 * @property {(userId: string, cartData: object) => Promise<object>} update
 * @property {(userId: string) => Promise<object>} clear
 */

export default function makeCartRepository(CartModel) {
  return {
    findByUserId: async (userId) => {
      return await CartModel.findOne({ userId }).populate('items.components.cpu items.components.gpu items.components.ram items.components.motherboard items.components.storage items.components.psu items.components.case'); 
    },
    update: async (userId, cartData) => {
      return await CartModel.findOneAndUpdate(
        { userId },
        { $set: cartData },
        { upsert: true, new: true }
      );
    },
    clear: async (userId) => {
      return await CartModel.findOneAndDelete({ userId });
    }
  };
}