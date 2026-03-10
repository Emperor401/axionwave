const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const shipmentSchema = new mongoose.Schema({
  trackingId: {
    type: String,
    default: () => 'AXW' + uuidv4().toString().slice(0, 8).toUpperCase(),
    unique: true,
  },
  sender: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  receiver: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'In Transit', 'Out for Delivery', 'Delivered'],
    default: 'Pending',
  },
  history: [
    {
      status: { type: String },
      message: { type: String },
      timestamp: { type: Date, default: Date.now },
      location: { type: String },
    },
  ],
  estimatedDelivery: {
    type: Date,
  },
  amount: {
    type: Number,
    default: 0,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

module.exports = mongoose.model('Shipment', shipmentSchema);