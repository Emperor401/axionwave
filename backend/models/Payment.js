const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  shipmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shipment',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
    default: 'Pending',
  },
  method: {
    type: String,
    enum: ['Paystack', 'Stripe', 'Flutterwave'],
    default: 'Paystack',
  },
  transactionId: {
    type: String,
    default: '',
  },
  paidAt: {
    type: Date,
  },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);