import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiBell, FiPackage, FiTruck, FiCheckCircle,
  FiAlertCircle, FiInfo, FiTrash2
} from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Shipment Delivered',
      message: 'Your shipment AXW-2024-001 has been delivered successfully.',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      type: 'info',
      title: 'Shipment In Transit',
      message: 'Your shipment AXW-2024-002 is now in transit to Abuja.',
      time: '5 hours ago',
      read: false,
    },
    {
      id: 3,
      type: 'warning',
      title: 'Delivery Delayed',
      message: 'Your shipment AXW-2024-003 has been slightly delayed due to weather conditions.',
      time: '1 day ago',
      read: false,
    },
    {
      id: 4,
      type: 'success',
      title: 'Shipment Created',
      message: 'Your new shipment AXW-2024-004 has been created and is pending processing.',
      time: '2 days ago',
      read: true,
    },
    {
      id: 5,
      type: 'info',
      title: 'Payment Confirmed',
      message: 'Payment of ₦15,000 for shipment AXW-2024-004 has been confirmed.',
      time: '2 days ago',
      read: true,
    },
    {
      id: 6,
      type: 'success',
      title: 'Out for Delivery',
      message: 'Your shipment AXW-2024-005 is out for delivery today.',
      time: '3 days ago',
      read: true,
    },
  ]);

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <FiCheckCircle className="text-green-500 text-xl" />;
      case 'warning': return <FiAlertCircle className="text-yellow-500 text-xl" />;
      case 'info': return <FiInfo className="text-blue-500 text-xl" />;
      default: return <FiBell className="text-gray-500 text-xl" />;
    }
  };

  const getIconBg = (type) => {
    switch (type) {
      case 'success': return 'bg-green-50';
      case 'warning': return 'bg-yellow-50';
      case 'info': return 'bg-blue-50';
      default: return 'bg-gray-50';
    }
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const markRead = (id) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-gray-900">
            Notifications
          </h1>
          <p className="text-gray-500 mt-1">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="btn-outline py-2 px-4 text-sm"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total', value: notifications.length, icon: <FiBell />, color: 'bg-blue-50 text-blue-600' },
          { label: 'Unread', value: unreadCount, icon: <FiAlertCircle />, color: 'bg-yellow-50 text-yellow-600' },
          { label: 'Read', value: notifications.length - unreadCount, icon: <FiCheckCircle />, color: 'bg-green-50 text-green-600' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card flex items-center gap-4"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="font-display text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Notifications List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        {notifications.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FiBell className="text-gray-400 text-2xl" />
            </div>
            <p className="text-gray-500">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification, i) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => markRead(notification.id)}
                className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                  !notification.read
                    ? 'bg-blue-50 border border-blue-100'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getIconBg(notification.type)}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`font-semibold text-sm ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                      {notification.title}
                      {!notification.read && (
                        <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full inline-block" />
                      )}
                    </p>
                    <span className="text-gray-400 text-xs flex-shrink-0">{notification.time}</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">{notification.message}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notification.id);
                  }}
                  className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0"
                >
                  <FiTrash2 />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default Notifications;