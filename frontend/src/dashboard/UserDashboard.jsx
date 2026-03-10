import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiPackage, FiTruck, FiCheckCircle, FiClock,
  FiPlus, FiArrowRight, FiAlertCircle
} from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';
import { getMyShipments } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const StatCard = ({ icon, label, value, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="card flex items-center gap-4"
  >
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="font-display text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </motion.div>
);

const UserDashboard = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const { data } = await getMyShipments();
        setShipments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchShipments();
  }, []);

  const stats = [
    {
      label: 'Total Shipments',
      value: shipments.length,
      icon: <FiPackage className="text-blue-600 text-2xl" />,
      color: 'bg-blue-50',
      delay: 0,
    },
    {
      label: 'In Transit',
      value: shipments.filter(s => s.status === 'In Transit').length,
      icon: <FiTruck className="text-orange-500 text-2xl" />,
      color: 'bg-orange-50',
      delay: 0.1,
    },
    {
      label: 'Delivered',
      value: shipments.filter(s => s.status === 'Delivered').length,
      icon: <FiCheckCircle className="text-green-500 text-2xl" />,
      color: 'bg-green-50',
      delay: 0.2,
    },
    {
      label: 'Pending',
      value: shipments.filter(s => s.status === 'Pending').length,
      icon: <FiClock className="text-yellow-500 text-2xl" />,
      color: 'bg-yellow-50',
      delay: 0.3,
    },
  ];

  const getStatusBadge = (status) => {
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
    <DashboardLayout>
      {/* Welcome Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-gray-900">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-gray-500 mt-1">Here's an overview of your shipments</p>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      >
        <Link
          to="/dashboard/create"
          className="card flex items-center gap-4 hover:shadow-lg transition-all duration-300 group cursor-pointer border-2 border-dashed border-blue-200 hover:border-blue-400"
        >
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <FiPlus className="text-white text-xl" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">Create Shipment</p>
            <p className="text-gray-400 text-sm">Ship a new package</p>
          </div>
        </Link>

        <Link
          to="/track"
          className="card flex items-center gap-4 hover:shadow-lg transition-all duration-300 group cursor-pointer"
        >
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <FiTruck className="text-orange-500 text-xl" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">Track Order</p>
            <p className="text-gray-400 text-sm">Check shipment status</p>
          </div>
        </Link>

        <Link
          to="/dashboard/shipments"
          className="card flex items-center gap-4 hover:shadow-lg transition-all duration-300 group cursor-pointer"
        >
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <FiPackage className="text-green-500 text-xl" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">My Shipments</p>
            <p className="text-gray-400 text-sm">View all shipments</p>
          </div>
        </Link>
      </motion.div>

      {/* Recent Shipments Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-lg font-bold text-gray-900">Recent Shipments</h2>
          <Link
            to="/dashboard/shipments"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
          >
            View All <FiArrowRight />
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : shipments.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FiAlertCircle className="text-gray-400 text-2xl" />
            </div>
            <p className="text-gray-500 mb-4">No shipments yet</p>
            <Link to="/dashboard/create" className="btn-primary text-sm py-2 px-6">
              Create Your First Shipment
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3">Tracking ID</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3">Origin</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3">Destination</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {shipments.slice(0, 5).map((shipment, i) => (
                  <motion.tr
                    key={shipment._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4">
                      <span className="font-semibold text-blue-600 text-sm">{shipment.trackingId}</span>
                    </td>
                    <td className="py-4 text-gray-600 text-sm">{shipment.origin}</td>
                    <td className="py-4 text-gray-600 text-sm">{shipment.destination}</td>
                    <td className="py-4">
                      <span className={`${getStatusBadge(shipment.status)}`}>
                        {shipment.status}
                      </span>
                    </td>
                    <td className="py-4 text-gray-400 text-sm">
                      {new Date(shipment.createdAt).toLocaleDateString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default UserDashboard;