const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['product', 'customBuild']
  },
  productId: {
    type: String
  },
  name: {
    type: String
  },
  price: {
    type: Number
  },
  image: {
    type: String
  },
  buildName: {
    type: String
  },
  components: {
    type: Object
  },
  totalPrice: {
    type: Number
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  description: {
    type: String
  }
}, { _id: false })

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [cartItemSchema],
  totalAmount: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
})

cartSchema.pre('save', function(next) {
  this.totalAmount = this.items.reduce((total, item) => {
    if (item.type === 'customBuild') {
      return total + ((item.totalPrice || 0) * (item.quantity || 1))
    } else {
      return total + ((item.price || 0) * (item.quantity || 1))
    }
  }, 0)
  next()
})

module.exports = mongoose.model('Cart', cartSchema)
