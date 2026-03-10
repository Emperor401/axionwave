import React from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie,
  Cell, LineChart, Line, Legend
} from 'recharts';
import AdminLayout from '../components/AdminLayout';
import { FiTrendingUp, FiPackage, FiDollarSign, FiUsers } from 'react-icons/fi';

const monthlyData = [
  { month: 'Jan', shipments: 65, revenue: 280000, users: 12 },
  { month: 'Feb', shipments: 78, revenue: 320000, users: 18 },
  { month: 'Mar', shipments: 90, revenue: 410000, users: 22 },
  { month: 'Apr', shipments: 85, revenue: 390000, users: 19 },
  { month: 'May', shipments: 110, revenue: 480000, users: 28 },
  { month: 'Jun', shipments: 125, revenue: 520000, users: 35 },
  { month: 'Jul', shipments: 140, revenue: 610000, users: 42 },
  { month: 'Aug', shipments: 132, revenue: 580000, users: 38 },
  { month: 'Sep', shipments: 155, revenue: 650000, users: 48 },
  { month: 'Oct', shipments: 168, revenue: 720000, users: 55 },
  { month: 'Nov', shipments: 180, revenue: 790000, users: 62 },
  { month: 'Dec', shipments: 200, revenue: 880000, users: 70 },
];

const statusData = [
  { name: 'Delivered', value: 450, color: '#22c55e' },
  { name: 'In Transit', value: 120, color: '#3b82f6' },
  { name: 'Pending', value: 80, color: '#eab308' },
  { name: 'Processing', value: 60, color: '#a855f7' },
  { name: 'Out for Delivery', value: 40, color: '#f97316' },
];

const topRoutes = [
  { route: 'Lagos → Abuja', shipments: 145 },
  { route: 'Lagos → PH', shipments: 98 },
  { route: 'Abuja → Kano', shipments: 76 },
  { route: 'Lagos → Ibadan', shipments: 65 },
  { route: 'PH → Enugu', shipments: 54 },
];

const COLORS = ['#22c55e', '#3b82f6', '#eab308', '#a855f7', '#f97316'];

const AdminAnalytics = () => {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500 mt-1">Platform performance and insights</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: 'Total Shipments',
            value: '1,258',
            change: '+12.5%',
            icon: <FiPackage className="text-blue-600 text-xl" />,
            color: 'bg-blue-50',
            delay: 0,
          },
          {
            label: 'Total Revenue',
            value: '₦6.2M',
            change: '+18.2%',
            icon: <FiDollarSign className="text-green-600 text-xl" />,
            color: 'bg-green-50',
            delay: 0.1,
          },
          {
            label: 'Total Users',
            value: '449',
            change: '+8.7%',
            icon: <FiUsers className="text-purple-600 text-xl" />,
            color: 'bg-purple-50',
            delay: 0.2,
          },
          {
            label: 'Growth Rate',
            value: '24.3%',
            change: '+4.1%',
            icon: <FiTrendingUp className="text-orange-500 text-xl" />,
            color: 'bg-orange-50',
            delay: 0.3,
          },
        ].map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: kpi.delay }}
            className="card"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${kpi.color} rounded-2xl flex items-center justify-center`}>
                {kpi.icon}
              </div>
              <span className="text-green-500 text-sm font-semibold bg-green-50 px-2 py-1 rounded-lg">
                {kpi.change}
              </span>
            </div>
            <p className="font-display text-2xl font-bold text-gray-900">{kpi.value}</p>
            <p className="text-gray-500 text-sm mt-1">{kpi.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Shipments & Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card mb-6"
      >
        <h2 className="font-display text-lg font-bold text-gray-900 mb-6">
          Shipments & Revenue Trend
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="shipGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
            <YAxis yAxisId="left" tick={{ fontSize: 12, fill: '#94a3b8' }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: '#94a3b8' }} />
            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
                fontFamily: 'Poppins',
              }}
            />
            <Legend />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="shipments"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#shipGrad)"
              name="Shipments"
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#22c55e"
              strokeWidth={2}
              fill="url(#revGrad)"
              name="Revenue (₦)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Shipment Status Pie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <h2 className="font-display text-lg font-bold text-gray-900 mb-6">
            Shipment Status Distribution
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
                    fontFamily: 'Poppins',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 flex-shrink-0">
              {statusData.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-600 text-sm">{item.name}</span>
                  <span className="font-semibold text-gray-900 text-sm ml-auto">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Top Routes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card"
        >
          <h2 className="font-display text-lg font-bold text-gray-900 mb-6">
            Top Shipping Routes
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={topRoutes} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis
                dataKey="route"
                type="category"
                tick={{ fontSize: 11, fill: '#64748b' }}
                width={120}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
                  fontFamily: 'Poppins',
                }}
              />
              <Bar dataKey="shipments" fill="#3b82f6" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* User Growth Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="card"
      >
        <h2 className="font-display text-lg font-bold text-gray-900 mb-6">
          User Growth
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyData}>
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
            <Line
              type="monotone"
              dataKey="users"
              stroke="#a855f7"
              strokeWidth={3}
              dot={{ fill: '#a855f7', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
              name="New Users"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminAnalytics;