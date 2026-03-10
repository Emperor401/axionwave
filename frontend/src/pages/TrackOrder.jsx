import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiPackage, FiTruck, FiMapPin, FiCheckCircle, FiClock } from 'react-icons/fi';
import { trackShipment } from '../utils/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';

const TrackOrder = () => {
  const [trackingId, setTrackingId] = useState('');
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!trackingId.trim()) return toast.error('Please enter a tracking number');
    setLoading(true);
    try {
      const { data } = await trackShipment(trackingId);
      setShipment(data);
    } catch (error) {
      toast.error('Shipment not found. Please check your tracking number.');
      setShipment(null);
    } finally {
      setLoading(false);
    }
  };

  const statuses = ['Pending', 'Processing', 'In Transit', 'Out for Delivery', 'Delivered'];
  const getStatusIndex = (status) => statuses.indexOf(status);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <FiClock className="text-xl" />;
      case 'Processing': return <FiPackage className="text-xl" />;
      case 'In Transit': return <FiTruck className="text-xl" />;
      case 'Out for Delivery': return <FiMapPin className="text-xl" />;
      case 'Delivered': return <FiCheckCircle className="text-xl" />;
      default: return <FiPackage className="text-xl" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'badge-pending';
      case 'Processing': return 'badge-processing';
      case 'In Transit': return 'badge-transit';
      case 'Out for Delivery': return 'badge-transit';
      case 'Delivered': return 'badge-delivered';
      default: return 'badge-pending';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-24 relative overflow-hidden min-h-96">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1600&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(10,25,55,0.93) 0%, rgba(20,60,160,0.87) 100%)' }}
        />
        <div className="absolute top-20 right-10 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-300 rounded-full opacity-10 blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white text-sm mb-6">
              <FiTruck /> Real-time Shipment Tracking
            </span>
            <h1 className="font-display text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Track Your
              <span className="text-blue-300 block">Shipment</span>
            </h1>
            <p className="text-blue-200 text-lg mb-10 max-w-xl mx-auto">
              Enter your tracking number to get real-time updates on your shipment location and delivery status.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleTrack(e)}
                  placeholder="e.g. AXW-2024-ABC123"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800 text-base shadow-lg"
                />
              </div>
              <button
                onClick={handleTrack}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <><FiSearch /> Track Now</>
                )}
              </button>
            </div>

            <p className="text-blue-300 text-xs mt-4 opacity-70">
              Example: AXW-XXXXXXXX — Find your tracking number in your shipment confirmation email
            </p>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {shipment ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Shipment Header */}
              <div className="card border-l-4 border-l-blue-600">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Tracking Number</p>
                    <h2 className="font-display text-2xl font-bold text-gray-900">{shipment.trackingId}</h2>
                  </div>
                  <span className={`${getStatusColor(shipment.status)} text-sm px-4 py-2 rounded-full font-semibold self-start md:self-center`}>
                    {shipment.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">From</p>
                    <p className="font-semibold text-gray-800">{shipment.origin}</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 text-center flex flex-col items-center justify-center">
                    <FiTruck className="text-blue-600 text-2xl mb-1" />
                    <p className="text-blue-600 text-xs font-semibold uppercase tracking-wide">In Transit</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-right">
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">To</p>
                    <p className="font-semibold text-gray-800">{shipment.destination}</p>
                  </div>
                </div>

                {shipment.estimatedDelivery && (
                  <div className="mt-4 flex items-center gap-2 bg-blue-50 rounded-xl px-4 py-3 text-sm">
                    <FiClock className="text-blue-600" />
                    <span className="text-gray-600">Estimated Delivery:</span>
                    <strong className="text-gray-900">
                      {new Date(shipment.estimatedDelivery).toLocaleDateString('en-US', {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </strong>
                  </div>
                )}
              </div>

              {/* Progress Timeline */}
              <div className="card">
                <h3 className="font-semibold text-gray-900 text-lg mb-8">Shipment Progress</h3>
                <div className="relative">
                  <div className="flex justify-between">
                    {statuses.map((status, i) => {
                      const currentIndex = getStatusIndex(shipment.status);
                      const isCompleted = i <= currentIndex;
                      const isCurrent = i === currentIndex;
                      return (
                        <div key={i} className="flex flex-col items-center flex-1">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className={`w-10 h-10 rounded-full flex items-center justify-center z-10 relative ${
                              isCompleted ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400'
                            } ${isCurrent ? 'ring-4 ring-blue-200' : ''}`}
                          >
                            {getStatusIcon(status)}
                          </motion.div>
                          <p className={`text-xs mt-2 text-center font-medium hidden sm:block ${isCompleted ? 'text-blue-600' : 'text-gray-400'}`}>
                            {status}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200" style={{ zIndex: 0 }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(getStatusIndex(shipment.status) / (statuses.length - 1)) * 100}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-blue-600"
                    />
                  </div>
                </div>
              </div>

              {/* Sender & Receiver Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                      <FiPackage className="text-blue-600" />
                    </div>
                    Sender Info
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-50">
                      <span className="text-gray-400">Name</span>
                      <span className="font-medium text-gray-800">{shipment.sender?.name}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-50">
                      <span className="text-gray-400">Phone</span>
                      <span className="font-medium text-gray-800">{shipment.sender?.phone}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-400">Address</span>
                      <span className="font-medium text-gray-800 text-right max-w-xs">{shipment.sender?.address}</span>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                      <FiMapPin className="text-green-600" />
                    </div>
                    Receiver Info
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-50">
                      <span className="text-gray-400">Name</span>
                      <span className="font-medium text-gray-800">{shipment.receiver?.name}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-50">
                      <span className="text-gray-400">Phone</span>
                      <span className="font-medium text-gray-800">{shipment.receiver?.phone}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-400">Address</span>
                      <span className="font-medium text-gray-800 text-right max-w-xs">{shipment.receiver?.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* History Timeline */}
              <div className="card">
                <h3 className="font-semibold text-gray-900 text-lg mb-6">Tracking History</h3>
                <div className="space-y-0">
                  {shipment.history?.slice().reverse().map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4 relative"
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-blue-600 rounded-full mt-1.5 flex-shrink-0 ring-4 ring-blue-50" />
                        {i < shipment.history.length - 1 && (
                          <div className="w-0.5 flex-1 bg-blue-100 my-1" />
                        )}
                      </div>
                      <div className="pb-6">
                        <p className="font-semibold text-gray-800 text-sm">{item.status}</p>
                        <p className="text-gray-500 text-sm mt-0.5">{item.message}</p>
                        {item.location && (
                          <p className="text-gray-400 text-xs flex items-center gap-1 mt-1">
                            <FiMapPin className="text-blue-400" /> {item.location}
                          </p>
                        )}
                        <p className="text-gray-400 text-xs mt-1">
                          {new Date(item.timestamp).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <div className="w-28 h-28 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <FiPackage className="text-blue-600 text-5xl" />
              </div>
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-3">Track Your Package</h3>
              <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
                Enter your Axionwave tracking number above to see real-time updates on your shipment status, location, and estimated delivery.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <div className="bg-blue-50 rounded-2xl px-6 py-4 text-left">
                  <p className="text-blue-600 font-semibold text-sm mb-1">Tracking Number Format</p>
                  <p className="text-gray-500 text-sm font-mono">AXW-XXXXXXXX</p>
                </div>
                <div className="bg-gray-50 rounded-2xl px-6 py-4 text-left">
                  <p className="text-gray-700 font-semibold text-sm mb-1">Need Help?</p>
                  <p className="text-gray-500 text-sm">Check your confirmation email</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TrackOrder;