const Payment = require('../models/Payment');

const createPayment = async (req, res) => {
  try {
    const { shipmentId, amount, method, transactionId } = req.body;

    const payment = await Payment.create({
      userId: req.user._id,
      shipmentId,
      amount,
      method,
      transactionId,
      status: 'Pending',
    });

    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user._id })
      .populate('shipmentId', 'trackingId origin destination status')
      .sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({})
      .populate('userId', 'name email')
      .populate('shipmentId', 'trackingId origin destination status')
      .sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    payment.status = req.body.status || payment.status;
    payment.transactionId = req.body.transactionId || payment.transactionId;

    if (req.body.status === 'Completed') {
      payment.paidAt = new Date();
    }

    const updated = await payment.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPayment, getPayments, getAllPayments, updatePayment };