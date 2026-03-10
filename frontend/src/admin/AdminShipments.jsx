import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiPackage, FiSearch, FiFilter, FiEdit,
  FiTrash2, FiAlertCircle, FiX, FiSave
} from 'react-icons/fi';
import AdminLayout from '../components/AdminLayout';
import { getAllShipments, updateShipment, deleteShipment } from '../utils/api';
import toast from 'react-hot-toast';

const AdminShipments = () => {
  const [shipments, setShipments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editModal, setEditModal] = useState(null);
  const [updateData, setUpdateData] = useState({ status: '', location: '', message: '' });

  const statuses = ['All', 'Pending', 'Processing', 'In Transit', 'Out for Delivery', 'Delivered'];

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      const { data } = await getAllShipments();
      setShipments(data);
      setFiltered(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleEdit = (shipment) => {
    setEditModal(shipment);
    setUpdateData({ status: shipment.status, location: '', message: '' });
  };

  const handleUpdate = async () => {
    try {
      await updateShipment(editModal._id, updateData);
      toast.success('Shipment updated successfully');
      setEditModal(null);
      fetchShipments();
    } catch (error) {
      toast.error('Failed to update shipment');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this shipment?')) return;
    try {
      await deleteShipment(id);
      setShipments(shipments.filter(s => s._id !== id));
      toast.success('Shipment deleted successfully');
    } catch (error) {
      toast.error('Failed to delete shipment');
    }
  };

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
      <div className="mb-8">
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-gray-900">Shipments</h1>
        <p className="text-gray-500 mt-1">Manage all shipments and update their status</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {['All', 'Pending', 'In Transit', 'Out for Delivery', 'Delivered'].map((status, i) => (
          <motion.div
            key={status}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setStatusFilter(status)}
            className={`card cursor-pointer text-center transition-all duration-300 hover:shadow-md ${
              statusFilter === status ? 'border-2 border-blue-600' : ''
            }`}
          >
            <p className="font-display text-xl font-bold text-gray-900">
              {status === 'All'
                ? shipments.length
                : shipments.filter(s => s.status === status).length}
            </p>
            <p className="text-gray-500 text-xs mt-1">{status}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
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
        transition={{ delay: 0.6 }}
        className="card"
      >
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <FiAlertCircle className="text-gray-300 text-4xl mx-auto mb-3" />
            <p className="text-gray-500">No shipments found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-4">Tracking ID</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-4">Customer</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-4">Sender</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-4">Receiver</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-4">Origin</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-4">Destination</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-4">Weight</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-4">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-4">Date</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((shipment, i) => (
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
                    <td className="py-4 text-gray-600 text-sm">{shipment.sender?.name}</td>
                    <td className="py-4 text-gray-600 text-sm">{shipment.receiver?.name}</td>
                    <td className="py-4 text-gray-600 text-sm">{shipment.origin}</td>
                    <td className="py-4 text-gray-600 text-sm">{shipment.destination}</td>
                    <td className="py-4 text-gray-600 text-sm">{shipment.weight} kg</td>
                    <td className="py-4">
                      <span className={getStatusBadge(shipment.status)}>
                        {shipment.status}
                      </span>
                    </td>
                    <td className="py-4 text-gray-400 text-sm">
                      {new Date(shipment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(shipment)}
                          className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(shipment._id)}
                          className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-gray-900">Update Shipment</h2>
              <button
                onClick={() => setEditModal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Tracking ID</p>
              <p className="font-semibold text-blue-600">{editModal.trackingId}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={updateData.status}
                  onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}
                  className="input-field"
                >
                  {statuses.filter(s => s !== 'All').map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={updateData.location}
                  onChange={(e) => setUpdateData({ ...updateData, location: e.target.value })}
                  placeholder="e.g. Lagos Sorting Center"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={updateData.message}
                  onChange={(e) => setUpdateData({ ...updateData, message: e.target.value })}
                  placeholder="Status update message..."
                  rows={3}
                  className="input-field resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setEditModal(null)}
                className="btn-outline flex-1 py-3"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="btn-primary flex-1 py-3 flex items-center justify-center gap-2"
              >
                <FiSave /> Update
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminShipments;