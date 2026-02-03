import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    unique: true 
  },
  items: [{
    pcName: { type: String, default: "Custom Build" },
    components: {
      cpu: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      gpu: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      ram: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      motherboard: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      storage: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      psu: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      case: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
    },
    totalPrice: { type: Number, required: true },
    quantity: { type: Number, default: 1 }
  }]
}, { timestamps: true });

export default mongoose.model('Cart', CartSchema);