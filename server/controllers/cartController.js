const Cart = require('../models/Cart');

const addToCart = async (req, res) => {
// try {
//     const { userId } = req.body;

//     if (!userId) {
//       return res.status(400).json({ error: 'userId is required' });
//     }

//     const cart = await Cart.findOneAndUpdate(
//       { userId },
//       { $setOnInsert: { userId, items: [] } }, //array
//       {
//         new: true,       
//         upsert: true,    // create if not found
//       }
//     );

//     res.status(200).json(cart);
//   } catch (error) {
//     console.error('Error fetching or creating cart:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }


  try {
    console.log('Processing add to cart request', { body: req.body });
    const { userId, type, buildName, components, totalPrice, quantity = 1 } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Missing userId" });
    }

    let cart = await Cart.findOne({ userId });
    console.log({cart})
    const newItem = {
      type,
      buildName,
      components,
      totalPrice,
      quantity,
    };

    if (!cart) {
      cart = new Cart({
        userId,
        items: [newItem],
      });
    } else {
      const existingItem = cart.items.find(
        item => item.type === type && item.buildName === buildName
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push(newItem);
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log({reqQuery: req.query});
    if (!userId) return res.status(400).json({ message: "Missing userId" });

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(200).json({ items: [], totalAmount: 0 });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { userId, type, buildName, quantity } = req.body;

    if (!userId) return res.status(400).json({ message: "Missing userId" });

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(item => item.type === type && item.buildName === buildName);
    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    if (quantity <= 0) {
      cart.items = cart.items.filter(i => !(i.type === type && i.buildName === buildName));
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart item', error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userId, type, buildName } = req.body;

    if (!userId) return res.status(400).json({ message: "Missing userId" });

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => !(item.type === type && item.buildName === buildName));

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) return res.status(400).json({ message: "Missing userId" });

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart', error: error.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
