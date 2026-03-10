import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M3 12C3 7 7 3 12 3C17 3 21 7 21 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M5 16C5 13 8 10 12 10C16 10 19 13 19 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
              <path d="M8 20C8 18.5 9.8 17 12 17C14.2 17 16 18.5 16 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
            </svg>
          </div>
          <div>
            <div className="flex items-center leading-none">
              <span className="font-display font-bold text-2xl" style={{ color: '#1a3a6b' }}>Axion</span>
              <span className="font-display font-bold text-2xl text-blue-600">wave</span>
            </div>
            <span className="text-gray-400 font-medium uppercase" style={{ fontSize: '9px', letterSpacing: '3px' }}>Logistics</span>
          </div>
        </div>
      </motion.div>

      {/* Animated Dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-2 mb-6"
      >
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.4, 1],
              backgroundColor: ['#bfdbfe', '#2563eb', '#bfdbfe'],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.15,
            }}
            className="w-2.5 h-2.5 rounded-full bg-blue-200"
          />
        ))}
      </motion.div>

      {/* Progress Bar */}
      <motion.div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-400 text-xs mt-4 tracking-widest uppercase"
      >
        Loading...
      </motion.p>
    </div>
  );
};

export default Loader;