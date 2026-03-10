import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPackage, FiUser, FiMapPin, FiTruck, FiDollarSign } from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';
import { createShipment } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateShipment = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    sender: { name: '', email: '', phone: '', address: '' },
    receiver: { name: '', email: '', phone: '', address: '' },
    origin: '',
    destination: '',
    weight: '',
    description: '',
    estimatedDelivery: '',
    amount: '',
  });

  const handleChange = (section, field, value) => {
    if (section) {
      setFormData({
        ...formData,
        [section]: { ...formData[section], [field]: value },
      });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await createShipment(formData);
      toast.success('Shipment created successfully!');
      navigate('/dashboard/shipments');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create shipment');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'Sender Info', icon: <FiUser /> },
    { number: 2, title: 'Receiver Info', icon: <FiUser /> },
    { number: 3, title: 'Shipment Details', icon: <FiPackage /> },
    { number: 4, title: 'Review & Submit', icon: <FiTruck /> },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-gray-900">Create Shipment</h1>
        <p className="text-gray-500 mt-1">Fill in the details to create a new shipment</p>
      </div>

      {/* Step Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-6"
      >
        <div className="flex items-center justify-between relative">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 z-0">
            <div
              className="h-full bg-blue-600 transition-all duration-500"
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
          {steps.map((s) => (
            <div key={s.number} className="flex flex-col items-center z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                step >= s.number
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white border-2 border-gray-200 text-gray-400'
              }`}>
                {step > s.number ? '✓' : s.icon}
              </div>
              <p className={`text-xs mt-2 font-medium hidden sm:block ${
                step >= s.number ? 'text-blue-600' : 'text-gray-400'
              }`}>
                {s.title}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Step Content */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="card"
      >
        {/* Step 1 - Sender Info */}
        {step === 1 && (
          <div>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <FiUser className="text-blue-600" />
              </div>
              Sender Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.sender.name}
                  onChange={(e) => handleChange('sender', 'name', e.target.value)}
                  placeholder="John Doe"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.sender.email}
                  onChange={(e) => handleChange('sender', 'email', e.target.value)}
                  placeholder="john@example.com"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.sender.phone}
                  onChange={(e) => handleChange('sender', 'phone', e.target.value)}
                  placeholder="+234 800 000 0000"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  value={formData.sender.address}
                  onChange={(e) => handleChange('sender', 'address', e.target.value)}
                  placeholder="123 Main St, Lagos"
                  className="input-field"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2 - Receiver Info */}
        {step === 2 && (
          <div>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <FiUser className="text-blue-600" />
              </div>
              Receiver Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.receiver.name}
                  onChange={(e) => handleChange('receiver', 'name', e.target.value)}
                  placeholder="Jane Doe"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.receiver.email}
                  onChange={(e) => handleChange('receiver', 'email', e.target.value)}
                  placeholder="jane@example.com"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.receiver.phone}
                  onChange={(e) => handleChange('receiver', 'phone', e.target.value)}
                  placeholder="+234 800 000 0000"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  value={formData.receiver.address}
                  onChange={(e) => handleChange('receiver', 'address', e.target.value)}
                  placeholder="456 Park Ave, Abuja"
                  className="input-field"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3 - Shipment Details */}
        {step === 3 && (
          <div>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <FiPackage className="text-blue-600" />
              </div>
              Shipment Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Origin City</label>
                <div className="relative">
                  <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={formData.origin}
                    onChange={(e) => handleChange(null, 'origin', e.target.value)}
                    placeholder="Lagos, Nigeria"
                    className="input-field pl-11"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Destination City</label>
                <div className="relative">
                  <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={(e) => handleChange(null, 'destination', e.target.value)}
                    placeholder="Abuja, Nigeria"
                    className="input-field pl-11"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleChange(null, 'weight', e.target.value)}
                  placeholder="5"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₦)</label>
                <div className="relative">
                  <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => handleChange(null, 'amount', e.target.value)}
                    placeholder="5000"
                    className="input-field pl-11"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Delivery</label>
                <input
                  type="date"
                  value={formData.estimatedDelivery}
                  onChange={(e) => handleChange(null, 'estimatedDelivery', e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => handleChange(null, 'description', e.target.value)}
                  placeholder="Electronics, clothing, etc."
                  className="input-field"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4 - Review */}
        {step === 4 && (
          <div>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <FiTruck className="text-blue-600" />
              </div>
              Review & Submit
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-2xl p-5">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiUser className="text-blue-600" /> Sender
                </h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-400">Name:</span> <span className="font-medium">{formData.sender.name}</span></p>
                  <p><span className="text-gray-400">Email:</span> <span className="font-medium">{formData.sender.email}</span></p>
                  <p><span className="text-gray-400">Phone:</span> <span className="font-medium">{formData.sender.phone}</span></p>
                  <p><span className="text-gray-400">Address:</span> <span className="font-medium">{formData.sender.address}</span></p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiUser className="text-blue-600" /> Receiver
                </h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-400">Name:</span> <span className="font-medium">{formData.receiver.name}</span></p>
                  <p><span className="text-gray-400">Email:</span> <span className="font-medium">{formData.receiver.email}</span></p>
                  <p><span className="text-gray-400">Phone:</span> <span className="font-medium">{formData.receiver.phone}</span></p>
                  <p><span className="text-gray-400">Address:</span> <span className="font-medium">{formData.receiver.address}</span></p>
                </div>
              </div>
              <div className="bg-blue-50 rounded-2xl p-5 md:col-span-2">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiPackage className="text-blue-600" /> Shipment Details
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <p><span className="text-gray-400">From:</span> <span className="font-medium">{formData.origin}</span></p>
                  <p><span className="text-gray-400">To:</span> <span className="font-medium">{formData.destination}</span></p>
                  <p><span className="text-gray-400">Weight:</span> <span className="font-medium">{formData.weight} kg</span></p>
                  <p><span className="text-gray-400">Amount:</span> <span className="font-medium">₦{formData.amount}</span></p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
          <button
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
            className="btn-outline py-2 px-6 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="btn-primary py-2 px-6 text-sm"
            >
              Next Step
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-primary py-2 px-8 text-sm flex items-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <><FiTruck /> Create Shipment</>
              )}
            </button>
          )}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default CreateShipment;