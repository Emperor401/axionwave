import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShield, FiX } from 'react-icons/fi';

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('axionwave_cookies');
    if (!accepted) {
      setTimeout(() => setVisible(true), 2000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('axionwave_cookies', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('axionwave_cookies', 'declined');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4 sm:p-6"
        >
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <FiShield className="text-blue-600 text-xl" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-sm mb-1">We value your privacy</p>
              <p className="text-gray-500 text-xs leading-relaxed">
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking "Accept All", you consent to our use of cookies.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={handleDecline}
                className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors px-4 py-2 rounded-xl hover:bg-gray-100"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-md"
              >
                Accept All
              </button>
              <button
                onClick={handleDecline}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <FiX />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;