import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiClock, FiMessageSquare, FiHeadphones, FiGlobe } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success('Message sent! We will get back to you within 24 hours.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <FiMapPin className="text-2xl text-blue-600" />,
      title: 'Our Office',
      details: ['123 Logistics Avenue', 'Lagos, Nigeria'],
      bg: 'bg-blue-50',
    },
    {
      icon: <FiPhone className="text-2xl text-green-600" />,
      title: 'Phone',
      details: ['+234 800 123 4567', '+234 800 987 6543'],
      bg: 'bg-green-50',
    },
    {
      icon: <FiMail className="text-2xl text-purple-600" />,
      title: 'Email',
      details: ['support@axionwave.com', 'info@axionwave.com'],
      bg: 'bg-purple-50',
    },
    {
      icon: <FiClock className="text-2xl text-orange-600" />,
      title: 'Working Hours',
      details: ['Mon - Fri: 8am - 6pm', 'Sat: 9am - 3pm'],
      bg: 'bg-orange-50',
    },
  ];

  const supportChannels = [
    {
      icon: <FiHeadphones className="text-3xl text-blue-600" />,
      title: 'Live Support',
      desc: 'Chat with our team in real-time for instant help.',
      action: 'Start Chat',
    },
    {
      icon: <FiMessageSquare className="text-3xl text-green-600" />,
      title: 'WhatsApp',
      desc: 'Message us on WhatsApp for quick responses.',
      action: 'Message Us',
    },
    {
      icon: <FiGlobe className="text-3xl text-purple-600" />,
      title: 'Help Center',
      desc: 'Browse our knowledge base for self-service answers.',
      action: 'View Articles',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-24 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(10,25,55,0.93) 0%, rgba(20,60,160,0.87) 100%)' }}
        />
        <div className="absolute top-20 right-10 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-300 rounded-full opacity-10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white text-sm mb-6">
                <FiMail /> Get In Touch
              </span>
              <h1 className="font-display text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                We Are Here
                <span className="text-blue-300 block">To Help You</span>
              </h1>
              <p className="text-blue-200 text-lg leading-relaxed mb-8 max-w-lg">
                Have a question about your shipment, our services, or want to partner with us? Our dedicated team is available around the clock to assist you.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <FiClock className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">24/7 Support</p>
                    <p className="text-blue-300 text-xs">Always available</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <FiPhone className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Quick Response</p>
                    <p className="text-blue-300 text-xs">Within 1 hour</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:grid grid-cols-2 gap-4"
            >
              {contactInfo.map((info, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-3">
                    {React.cloneElement(info.icon, { className: 'text-xl text-white' })}
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-1">{info.title}</h3>
                  {info.details.map((d, j) => (
                    <p key={j} className="text-blue-200 text-xs">{d}</p>
                  ))}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportChannels.map((channel, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                whileHover={{ y: -4 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 flex items-start gap-4 cursor-pointer transition-all duration-300 hover:border-blue-200 hover:shadow-md"
              >
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                  {channel.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{channel.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">{channel.desc}</p>
                  <span className="text-blue-600 text-sm font-semibold">{channel.action} →</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Contact Info */}
            <div className="space-y-5">
              <div className="mb-8">
                <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Contact Details</span>
                <h2 className="font-display text-2xl font-bold text-gray-900 mt-2">Reach Out To Us</h2>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                  We are available through multiple channels. Pick the one that works best for you.
                </p>
              </div>
              {contactInfo.map((info, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  whileHover={{ y: -2 }}
                  className="card flex items-start gap-4 hover:border-blue-200 transition-all duration-300"
                >
                  <div className={`w-12 h-12 ${info.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                    {info.details.map((detail, j) => (
                      <p key={j} className="text-gray-500 text-sm">{detail}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact Form */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2 card"
            >
              <div className="mb-8">
                <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Send A Message</span>
                <h2 className="font-display text-2xl font-bold text-gray-900 mt-2">How Can We Help?</h2>
                <p className="text-gray-500 text-sm mt-2">
                  Fill in the form and our team will get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="input-field"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="shipment">Shipment Inquiry</option>
                    <option value="tracking">Tracking Issue</option>
                    <option value="payment">Payment Issue</option>
                    <option value="partnership">Partnership</option>
                    <option value="complaint">Complaint</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    className="input-field resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2 text-base py-4"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <><FiSend /> Send Message</>
                  )}
                </button>

                <p className="text-gray-400 text-xs text-center">
                  By submitting this form, you agree to our privacy policy. We will never share your information.
                </p>
              </form>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 rounded-3xl overflow-hidden shadow-lg"
          >
            <div className="relative h-96">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1400&q=80"
                alt="Our Location"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.5))' }}
              />
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full px-4 flex justify-center">
                <div className="bg-white rounded-2xl shadow-2xl px-6 py-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Axionwave Logistics HQ</p>
                    <p className="text-gray-500 text-xs">123 Logistics Avenue, Lagos, Nigeria</p>
                  </div>
                  <div className="w-px h-10 bg-gray-200 mx-2 hidden sm:block" />
                  <div className="hidden sm:block">
                    <p className="text-green-600 font-semibold text-sm flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block" />
                      Open Now
                    </p>
                    <p className="text-gray-400 text-xs">Closes at 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;