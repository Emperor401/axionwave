const express = require('express');
const router = express.Router();
const {
  createShipment,
  getShipments,
  getAllShipments,
  getShipmentByTracking,
  updateShipment,
  deleteShipment,
} = require('../controllers/shipmentController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/create', protect, createShipment);
router.get('/my', protect, getShipments);
router.get('/all', protect, adminOnly, getAllShipments);
router.get('/track/:trackingId', getShipmentByTracking);
router.put('/update/:id', protect, adminOnly, updateShipment);
router.delete('/delete/:id', protect, adminOnly, deleteShipment);

module.exports = router;