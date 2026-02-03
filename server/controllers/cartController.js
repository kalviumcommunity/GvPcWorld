export default function makeCartController(cartService) {
  return {
    get: async (req, res, next) => {
      try {
        const cart = await cartService.getCart(req.user.id);
        res.status(200).json(cart);
      } catch (error) {
        next(error);
      }
    },

    add: async (req, res, next) => {
      try {
        const cart = await cartService.addItemToCart(req.user.id, req.body);
        res.status(200).json(cart);
      } catch (error) {
        next(error);
      }
    },

    remove: async (req, res, next) => {
      try {
        const cart = await cartService.removeItem(req.user.id, req.params.itemId);
        res.status(200).json(cart);
      } catch (error) {
        next(error);
      }
    }
  };
}