import mongoose from 'mongoose';
const cartItemSchema = new mongoose.Schema({
  productId: { // we can reference to box user has choosen in cart
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  isCustomBuild: { type: Boolean, default: false },
  selectedComponents: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Product' } // Array of IDs (CPU, GPU, etc.)
  ]
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [cartItemSchema],
  totalAmount: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

cartSchema.pre('save', function(next) {
  this.totalAmount = this.items.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);
  next();
});

const Cart = mongoose.model('Cart', cartSchema);
const Item = mongoose.model('CartItem', cartItemSchema);

export { Cart, Item };
