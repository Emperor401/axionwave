import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiArrowRight, FiCheck } from 'react-icons/fi';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f2040 0%, #1a3a6b 100%)' }}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-300 rounded-full opacity-10 blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FiMail className="text-white text-2xl" />
          </div>

          <span className="text-blue-300 font-semibold text-sm uppercase tracking-widest">Newsletter</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mt-2 mb-4">
            Stay Updated with Axionwave
          </h2>
          <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">
            Get the latest shipping tips, logistics news, and exclusive offers delivered straight to your inbox.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 bg-green-500/20 border border-green-400/30 rounded-2xl px-8 py-5 max-w-md mx-auto"
            >
              <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center">
                <FiCheck className="text-white text-lg" />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">You are subscribed!</p>
                <p className="text-green-300 text-sm">Welcome to the Axionwave community.</p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <div className="relative flex-1">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-11 pr-4 py-4 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800 text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>Subscribe <FiArrowRight /></>
                )}
              </button>
            </form>
          )}

          <p className="text-blue-300 text-xs mt-4 opacity-70">
            No spam ever. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;