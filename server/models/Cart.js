const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['customBuild', 'prebuilt'],
    required: true,
  },
  buildName: {
    type: String,
    required: true,
  },
  components: {
    type: Object,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
}, { _id: false });

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

module.exports = mongoose.model('Cart', cartSchema);
