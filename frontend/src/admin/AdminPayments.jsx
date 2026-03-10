import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiDollarSign, FiSearch, FiFilter,
  FiAlertCircle, FiCheckCircle, FiClock, FiXCircle
} from 'react-icons/fi';
import AdminLayout from '../components/AdminLayout';
import { getAllPayments, updatePayment } from '../utils/api';
import toast from 'react-hot-toast';

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const statuses = ['All', 'Pending', 'Completed', 'Failed', 'Refunded'];

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data } = await getAllPayments();
        setPayments(data);
        setFiltered(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  useEffect(() => {
    let result = payments;
    if (statusFilter !== 'All') {
      result = result.filter(p => p.status === statusFilter);
    }
    if (search) {
      result = result.filter(p =>
        p.userId?.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.transactionId?.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(result);
  }, [search, statusFilter, payments]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updatePayment(id, { status });
      setPayments(payments.map(p =>
        p._id === id ? { ...p, status } : p
      ));
      toast.success('Payment status updated');
    } catch (error) {
      toast.error('Failed to update payment');
    }
  };

  const totalRevenue = payments
    .filter(p => p.status === 'Completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return <FiCheckCircle className="text-green-500" />;
      case 'Pending': return <FiClock className="text-yellow-500" />;
      case 'Failed': return <FiXCircle className="text-red-500" />;
      case 'Refunded': return <FiAlertCircle className="text-blue-500" />;
      default: return <FiClock className="text-gray-400" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Failed': return 'bg-red-100 text-red-700';
      case 'Refunded': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-500 mt-1">Manage all payment transactions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          {
            label: 'Total Revenue',
            value: `₦${totalRevenue.toLocaleString()}`,
            icon: <FiDollarSign className="text-green-600 text-xl" />,
            color: 'bg-green-50',
          },
          {
            label: 'Completed',
            value: payments.filter(p => p.status === 'Completed').length,
            icon: <FiCheckCircle className="text-green-500 text-xl" />,
            color: 'bg-green-50',
          },
          {
            label: 'Pending',
            value: payments.filter(p => p.status === 'Pending').length,
            icon: <FiClock className="text-yellow-500 text-xl" />,
            color: 'bg-yellow-50',
          },
          {
            label: 'Failed',
            value: payments.filter(p => p.status === 'Failed').length,
            icon: <FiXCircle className="text-red-500 text-xl" />,
            color: 'bg-red-50',
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card flex items-center gap-4"
          >
            <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center`}>
              {stat.icon}
            </div>
            <div>
              <p className="font-display text-xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card mb-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by customer or transaction ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-11"
            />
          </div>
          <div className="relative">
            <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field pl-11 appearance-none cursor-pointer"
            >
              {statuses.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card"
      >
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <FiAlertCircle className="text-gray-300 text-4xl mx-auto mb-3" />
            <p className="text-gray-500">No payments found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-4">Customer</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-4">Shipment</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-4">Amount</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-4">Method</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-4">Transaction ID</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-4">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-4">Date</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((payment, i) => (
                  <motion.tr
                    key={payment._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 text-gray-900 font-medium text-sm">
                      {payment.userId?.name || 'N/A'}
                    </td>
                    <td className="py-4 text-blue-600 font-medium text-sm">
                      {payment.shipmentId?.trackingId || 'N/A'}
                    </td>
                    <td className="py-4 text-gray-900 font-semibold text-sm">
                      ₦{payment.amount?.toLocaleString()}
                    </td>
                    <td className="py-4 text-gray-600 text-sm">
                      {payment.method}
                    </td>
                    <td className="py-4 text-gray-400 text-xs font-mono">
                      {payment.transactionId || 'N/A'}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(payment.status)}
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(payment.status)}`}>
                          {payment.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-gray-400 text-sm">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4">
                      {payment.status === 'Pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleStatusUpdate(payment._id, 'Completed')}
                            className="text-xs bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded-lg font-medium transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(payment._id, 'Failed')}
                            className="text-xs bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-lg font-medium transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      )}
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

export default AdminPayments;