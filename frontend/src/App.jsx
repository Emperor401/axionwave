import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import TrackOrder from './pages/TrackOrder';
import Contact from './pages/Contact';
import About from './pages/About';

// Dashboard
import UserDashboard from './dashboard/UserDashboard';
import MyShipments from './dashboard/MyShipments';
import CreateShipment from './dashboard/CreateShipment';
import Profile from './dashboard/Profile';
import Notifications from './dashboard/Notifications';

// Admin
import AdminDashboard from './admin/AdminDashboard';
import AdminUsers from './admin/AdminUsers';
import AdminShipments from './admin/AdminShipments';
import AdminPayments from './admin/AdminPayments';
import AdminAnalytics from './admin/AdminAnalytics';

// Components
import LiveChat from './components/LiveChat';
import CookieBanner from './components/CookieBanner';
import ScrollToTop from './components/ScrollToTop';
import Loader from './components/Loader';

// Context
import { AuthProvider } from './context/AuthContext';

function App() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <AuthProvider>
      <Router>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: '12px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              boxShadow: '0 4px 24px rgba(37, 99, 235, 0.12)',
            },
            success: {
              iconTheme: {
                primary: '#2563eb',
                secondary: '#fff',
              },
            },
          }}
        />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/track" element={<TrackOrder />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />

          {/* User Dashboard Routes */}
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/dashboard/shipments" element={<MyShipments />} />
          <Route path="/dashboard/create" element={<CreateShipment />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/notifications" element={<Notifications />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/shipments" element={<AdminShipments />} />
          <Route path="/admin/payments" element={<AdminPayments />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
        </Routes>

        {/* Global Components */}
        <LiveChat />
        <CookieBanner />
        <ScrollToTop />
      </Router>
    </AuthProvider>
  );
}

export default App;