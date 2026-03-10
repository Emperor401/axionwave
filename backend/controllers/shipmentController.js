const Shipment = require('../models/Shipment');

const createShipment = async (req, res) => {
  try {
    const { sender, receiver, origin, destination, weight, description, estimatedDelivery, amount } = req.body;

    const shipment = await Shipment.create({
      sender,
      receiver,
      origin,
      destination,
      weight,
      description,
      estimatedDelivery,
      amount,
      userId: req.user._id,
      history: [
        {
          status: 'Pending',
          message: 'Shipment created and pending processing',
          location: origin,
        },
      ],
    });

    res.status(201).json(shipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(shipments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find({}).populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(shipments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getShipmentByTracking = async (req, res) => {
  try {
    const shipment = await Shipment.findOne({ trackingId: req.params.trackingId });
    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }
    res.json(shipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    const { status, location, message } = req.body;

    shipment.status = status || shipment.status;

    if (status) {
      shipment.history.push({
        status,
        message: message || `Shipment status updated to ${status}`,
        location: location || '',
        timestamp: new Date(),
      });
    }

    const updated = await shipment.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteShipment = async (req, res) => {
  try {
    await Shipment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Shipment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createShipment,
  getShipments,
  getAllShipments,
  getShipmentByTracking,
  updateShipment,
  deleteShipment,
};