const express = require('express');
const router = express.Router();
const {
  createPayment,
  getPayments,
  getAllPayments,
  updatePayment,
} = require('../controllers/paymentController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/create', protect, createPayment);
router.get('/my', protect, getPayments);
router.get('/all', protect, adminOnly, getAllPayments);
router.put('/update/:id', protect, adminOnly, updatePayment);

module.exports = router;