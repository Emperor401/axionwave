import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiAlertCircle, FiEye } from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';
import { getMyShipments } from '../utils/api';
import { Link } from 'react-router-dom';

const MyShipments = () => {
  const [shipments, setShipments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const statuses = ['All', 'Pending', 'Processing', 'In Transit', 'Out for Delivery', 'Delivered'];

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const { data } = await getMyShipments();
        setShipments(data);
        setFiltered(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchShipments();
  }, []);

  useEffect(() => {
    let result = shipments;
    if (statusFilter !== 'All') {
      result = result.filter(s => s.status === statusFilter);
    }
    if (search) {
      result = result.filter(s =>
        s.trackingId.toLowerCase().includes(search.toLowerCase()) ||
        s.origin.toLowerCase().includes(search.toLowerCase()) ||
        s.destination.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(result);
  }, [search, statusFilter, shipments]);

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
      <div className="mb-8">
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-gray-900">My Shipments</h1>
        <p className="text-gray-500 mt-1">Manage and track all your shipments</p>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card mb-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by tracking ID, origin or destination..."
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
              className="input-field pl-11 pr-8 appearance-none cursor-pointer"
            >
              {statuses.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Shipments Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="card"
      >
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FiAlertCircle className="text-gray-400 text-2xl" />
            </div>
            <p className="text-gray-500 mb-4">No shipments found</p>
            <Link to="/dashboard/create" className="btn-primary text-sm py-2 px-6">
              Create Shipment
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-4">Tracking ID</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-4">Sender</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-4">Receiver</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-4">Origin</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-4">Destination</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-4">Weight</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-4">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-4">Date</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((shipment, i) => (
                  <motion.tr
                    key={shipment._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4">
                      <span className="font-semibold text-blue-600 text-sm">{shipment.trackingId}</span>
                    </td>
                    <td className="py-4 text-gray-600 text-sm">{shipment.sender?.name}</td>
                    <td className="py-4 text-gray-600 text-sm">{shipment.receiver?.name}</td>
                    <td className="py-4 text-gray-600 text-sm">{shipment.origin}</td>
                    <td className="py-4 text-gray-600 text-sm">{shipment.destination}</td>
                    <td className="py-4 text-gray-600 text-sm">{shipment.weight} kg</td>
                    <td className="py-4">
                      <span className={`${getStatusBadge(shipment.status)}`}>
                        {shipment.status}
                      </span>
                    </td>
                    <td className="py-4 text-gray-400 text-sm">
                      {new Date(shipment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4">
                      <Link
                        to={`/track?id=${shipment.trackingId}`}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        <FiEye /> Track
                      </Link>
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

export default MyShipments;