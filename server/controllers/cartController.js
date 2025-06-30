const Cart = require('../models/Cart')

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id })
    if (!cart) return res.json({ items: [], totalAmount: 0 })
    res.json({ items: cart.items, totalAmount: cart.totalAmount })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart' })
  }
}

exports.addToCart = async (req, res) => {
  try {
    const { type } = req.body
    let cart = await Cart.findOne({ userId: req.user._id })
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] })
    }
    let existingIndex = -1
    if (type === 'product') {
      existingIndex = cart.items.findIndex(item => item.type === 'product' && item.productId === req.body.productId)
    } else if (type === 'customBuild') {
      existingIndex = cart.items.findIndex(item => item.type === 'customBuild' && item.buildName === req.body.buildName)
    }
    if (existingIndex !== -1) {
      cart.items[existingIndex].quantity += req.body.quantity || 1
    } else {
      cart.items.push(req.body)
    }
    await cart.save()
    res.json({ items: cart.items, totalAmount: cart.totalAmount })
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to cart' })
  }
}

exports.updateCartItem = async (req, res) => {
  try {
    const { type, productId, buildName, quantity } = req.body
    const cart = await Cart.findOne({ userId: req.user._id })
    if (!cart) return res.status(404).json({ error: 'Cart not found' })
    let item
    if (type === 'product') {
      item = cart.items.find(i => i.type === 'product' && i.productId === productId)
    } else if (type === 'customBuild') {
      item = cart.items.find(i => i.type === 'customBuild' && i.buildName === buildName)
    }
    if (!item) return res.status(404).json({ error: 'Item not found' })
    if (quantity > 0) {
      item.quantity = quantity
    } else {
      cart.items = cart.items.filter(i => i !== item)
    }
    await cart.save()
    res.json({ items: cart.items, totalAmount: cart.totalAmount })
  } catch (err) {
    res.status(500).json({ error: 'Failed to update cart item' })
  }
}

exports.removeFromCart = async (req, res) => {
  try {
    const { type, productId, buildName } = req.body
    const cart = await Cart.findOne({ userId: req.user._id })
    if (!cart) return res.status(404).json({ error: 'Cart not found' })
    if (type === 'product') {
      cart.items = cart.items.filter(item => !(item.type === 'product' && item.productId === productId))
    } else if (type === 'customBuild') {
      cart.items = cart.items.filter(item => !(item.type === 'customBuild' && item.buildName === buildName))
    }
    await cart.save()
    res.json({ items: cart.items, totalAmount: cart.totalAmount })
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove from cart' })
  }
}

exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id })
    if (!cart) return res.json({ items: [], totalAmount: 0 })
    cart.items = []
    await cart.save()
    res.json({ items: [], totalAmount: 0 })
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear cart' })
  }
}
