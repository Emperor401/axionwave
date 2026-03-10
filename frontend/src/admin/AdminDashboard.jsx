import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiPackage, FiUsers, FiTruck, FiCheckCircle,
  FiDollarSign, FiArrowUp, FiClock, FiAlertCircle
} from 'react-icons/fi';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import AdminLayout from '../components/AdminLayout';
import { getAllShipments, getAllUsers, getAllPayments } from '../utils/api';

const chartData = [
  { month: 'Jan', shipments: 65, revenue: 280000 },
  { month: 'Feb', shipments: 78, revenue: 320000 },
  { month: 'Mar', shipments: 90, revenue: 410000 },
  { month: 'Apr', shipments: 85, revenue: 390000 },
  { month: 'May', shipments: 110, revenue: 480000 },
  { month: 'Jun', shipments: 125, revenue: 520000 },
  { month: 'Jul', shipments: 140, revenue: 610000 },
];

const StatCard = ({ icon, label, value, change, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="card"
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div className="flex items-center gap-1 text-green-500 text-sm font-medium">
        <FiArrowUp className="text-xs" />
        <span>{change}</span>
      </div>
    </div>
    <p className="font-display text-2xl font-bold text-gray-900">{value}</p>
    <p className="text-gray-500 text-sm mt-1">{label}</p>
  </motion.div>
);

const AdminDashboard = () => {
  const [shipments, setShipments] = useState([]);
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [shipmentsRes, usersRes, paymentsRes] = await Promise.all([
          getAllShipments(),
          getAllUsers(),
          getAllPayments(),
        ]);
        setShipments(shipmentsRes.data);
        setUsers(usersRes.data);
        setPayments(paymentsRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalRevenue = payments
    .filter(p => p.status === 'Completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const stats = [
    {
      label: 'Total Shipments',
      value: shipments.length,
      icon: <FiPackage className="text-blue-600 text-xl" />,
      color: 'bg-blue-50',
      change: '12%',
      delay: 0,
    },
    {
      label: 'Total Users',
      value: users.length,
      icon: <FiUsers className="text-purple-600 text-xl" />,
      color: 'bg-purple-50',
      change: '8%',
      delay: 0.1,
    },
    {
      label: 'Active Deliveries',
      value: shipments.filter(s => s.status === 'In Transit').length,
      icon: <FiTruck className="text-orange-500 text-xl" />,
      color: 'bg-orange-50',
      change: '5%',
      delay: 0.2,
    },
    {
      label: 'Delivered',
      value: shipments.filter(s => s.status === 'Delivered').length,
      icon: <FiCheckCircle className="text-green-500 text-xl" />,
      color: 'bg-green-50',
      change: '18%',
      delay: 0.3,
    },
    {
      label: 'Pending',
      value: shipments.filter(s => s.status === 'Pending').length,
      icon: <FiClock className="text-yellow-500 text-xl" />,
      color: 'bg-yellow-50',
      change: '3%',
      delay: 0.4,
    },
    {
      label: 'Total Revenue',
      value: `₦${totalRevenue.toLocaleString()}`,
      icon: <FiDollarSign className="text-green-600 text-xl" />,
      color: 'bg-green-50',
      change: '22%',
      delay: 0.5,
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
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-gray-900">
            Admin Dashboard 👑
          </h1>
          <p className="text-gray-500 mt-1">Overview of all platform activities</p>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Shipments Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card"
        >
          <h2 className="font-display text-lg font-bold text-gray-900 mb-6">
            Shipments Overview
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="shipmentGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
                  fontFamily: 'Poppins',
                }}
              />
              <Area
                type="monotone"
                dataKey="shipments"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#shipmentGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="card"
        >
          <h2 className="font-display text-lg font-bold text-gray-900 mb-6">
            Revenue Overview
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
                  fontFamily: 'Poppins',
                }}
              />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Shipments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="card"
      >
        <h2 className="font-display text-lg font-bold text-gray-900 mb-6">
          Recent Shipments
        </h2>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : shipments.length === 0 ? (
          <div className="text-center py-12">
            <FiAlertCircle className="text-gray-300 text-4xl mx-auto mb-3" />
            <p className="text-gray-500">No shipments found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3">Tracking ID</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3">Customer</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3">Origin</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3">Destination</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {shipments.slice(0, 8).map((shipment, i) => (
                  <motion.tr
                    key={shipment._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4">
                      <span className="font-semibold text-blue-600 text-sm">{shipment.trackingId}</span>
                    </td>
                    <td className="py-4 text-gray-600 text-sm">{shipment.userId?.name || 'N/A'}</td>
                    <td className="py-4 text-gray-600 text-sm">{shipment.origin}</td>
                    <td className="py-4 text-gray-600 text-sm">{shipment.destination}</td>
                    <td className="py-4">
                      <span className={getStatusBadge(shipment.status)}>
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
    </AdminLayout>
  );
};

export default AdminDashboard;