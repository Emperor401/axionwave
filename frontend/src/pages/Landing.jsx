import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { FiPackage, FiTruck, FiGlobe, FiShield, FiArrowRight, FiStar, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FaShippingFast, FaWarehouse, FaBoxOpen } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

const Landing = () => {
  const [trackingNum, setTrackingNum] = React.useState('');
  const [openFaq, setOpenFaq] = React.useState(null);

  const services = [
    { icon: <FaShippingFast className="text-3xl text-blue-600" />, title: 'Express Delivery', desc: 'Same-day and next-day delivery options for urgent shipments across the country.' },
    { icon: <FiGlobe className="text-3xl text-blue-600" />, title: 'International Shipping', desc: 'Reliable worldwide shipping with real-time tracking to over 180 countries.' },
    { icon: <FaWarehouse className="text-3xl text-blue-600" />, title: 'Warehousing', desc: 'Secure storage solutions with inventory management for your business needs.' },
    { icon: <FiTruck className="text-3xl text-blue-600" />, title: 'Freight Services', desc: 'Heavy cargo and bulk shipment solutions for businesses of all sizes.' },
    { icon: <FaBoxOpen className="text-3xl text-blue-600" />, title: 'Last Mile Delivery', desc: 'Efficient final delivery to your doorstep with proof of delivery.' },
    { icon: <FiShield className="text-3xl text-blue-600" />, title: 'Secure Packaging', desc: 'Professional packaging services to ensure your items arrive safely.' },
  ];

  const testimonials = [
    { name: 'Chidi Okonkwo', role: 'Business Owner', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', text: 'Axionwave has transformed our business logistics. Deliveries are always on time and tracking is seamless.', rating: 5 },
    { name: 'Amina Hassan', role: 'E-commerce Seller', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', text: 'The best shipping platform I have used. Professional, fast, and their customer support is excellent.', rating: 5 },
    { name: 'David Mensah', role: 'Import/Export Manager', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', text: 'International shipping made easy. Real-time tracking gives me peace of mind for every shipment.', rating: 5 },
  ];

  const partners = [
    { name: 'DHL', bg: '#FFCC00', text: '#CC0000' },
    { name: 'FedEx', bg: '#4D148C', text: '#FF6600' },
    { name: 'UPS', bg: '#351C15', text: '#FFB500' },
    { name: 'Maersk', bg: '#42B0D5', text: '#ffffff' },
    { name: 'Aramex', bg: '#E31837', text: '#ffffff' },
    { name: 'Jumia', bg: '#F68B1E', text: '#ffffff' },
    { name: 'Bolt', bg: '#34D186', text: '#ffffff' },
    { name: 'Shopify', bg: '#96BF48', text: '#ffffff' },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '0',
      period: 'Free forever',
      color: 'border-gray-200',
      badge: null,
      features: ['Up to 5 shipments/month', 'Basic tracking', 'Email support', 'Standard delivery only', 'Nigeria coverage'],
      cta: 'Get Started Free',
      ctaStyle: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 w-full text-center block',
    },
    {
      name: 'Business',
      price: '15,000',
      period: 'per month',
      color: 'border-blue-600',
      badge: 'Most Popular',
      features: ['Unlimited shipments', 'Real-time tracking', 'Priority support 24/7', 'Express & standard delivery', 'West Africa coverage', 'Analytics dashboard'],
      cta: 'Start Business Plan',
      ctaStyle: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 w-full text-center block shadow-lg',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'tailored pricing',
      color: 'border-gray-200',
      badge: null,
      features: ['Everything in Business', 'Dedicated account manager', 'Custom API integration', 'Worldwide coverage', 'Bulk shipment discounts', 'SLA guarantees'],
      cta: 'Contact Sales',
      ctaStyle: 'border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 font-semibold py-3 px-6 rounded-xl transition-all duration-300 w-full text-center block',
    },
  ];

  const faqs = [
    { q: 'How do I track my shipment?', a: 'Simply enter your tracking number on our Track page or homepage. You will see real-time updates including current location, estimated delivery time, and full shipment history.' },
    { q: 'How long does delivery take?', a: 'Local express deliveries take 24–48 hours. Standard domestic deliveries take 3–5 business days. International shipments typically take 5–14 business days depending on destination.' },
    { q: 'What items are prohibited for shipping?', a: 'We do not ship hazardous materials, illegal substances, live animals, or perishable goods without prior arrangement. Contact our support team for a full list of restricted items.' },
    { q: 'How is the shipping cost calculated?', a: 'Shipping cost is based on the weight, dimensions, destination, and selected delivery speed of your package. You can get an instant quote when creating a shipment on our platform.' },
    { q: 'Is my shipment insured?', a: 'Yes, all shipments are covered by our basic insurance policy. You can also opt for premium insurance coverage for high-value items during the shipment creation process.' },
    { q: 'Can I cancel or modify a shipment?', a: 'You can cancel or modify a shipment before it is picked up by our team. Once a shipment is in transit, changes may be limited. Contact support immediately for assistance.' },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f2040 0%, #1a3a6b 50%, #1d4ed8 100%)' }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-300 rounded-full opacity-10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white text-sm font-medium">Trusted by 50,000+ customers worldwide</span>
              </motion.div>

              <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
                className="font-display text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              >
                Fast & Reliable
                <span className="text-blue-300 block">Shipping Solutions</span>
              </motion.h1>

              <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
                className="text-blue-100 text-lg leading-relaxed mb-8 max-w-lg"
              >
                Professional logistics services for businesses and individuals. Track your shipments in real-time and experience delivery excellence.
              </motion.p>

              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <Link to="/register" className="btn-primary flex items-center justify-center gap-2 text-base">
                  Get Started Free <FiArrowRight />
                </Link>
                <Link to="/track" className="btn-outline border-white text-white hover:bg-white hover:text-blue-700 flex items-center justify-center gap-2 text-base">
                  Track Shipment
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4"
              >
                <p className="text-white text-sm font-medium mb-3">Quick Track</p>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter tracking number..."
                    value={trackingNum}
                    onChange={(e) => setTrackingNum(e.target.value)}
                    className="flex-1 bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-blue-200 focus:outline-none focus:border-white text-sm"
                  />
                  <Link to={`/track?id=${trackingNum}`}
                    className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-xl font-semibold transition-colors text-sm whitespace-nowrap"
                  >
                    Track
                  </Link>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80"
                  alt="Logistics"
                  className="rounded-3xl shadow-2xl w-full object-cover h-[500px]"
                />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <FiPackage className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Package Delivered</p>
                    <p className="text-gray-400 text-xs">AXW-2024-0892</p>
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4"
                >
                  <p className="text-2xl font-bold text-blue-600">99.8%</p>
                  <p className="text-gray-500 text-xs">On-time delivery</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { end: 50, suffix: 'K+', label: 'Shipments Delivered' },
              { end: 180, suffix: '+', label: 'Countries Served' },
              { end: 99.8, suffix: '%', label: 'On-Time Delivery', decimals: 1 },
              { end: 24, suffix: '/7', label: 'Customer Support' },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} className="text-center">
                <CountUp end={stat.end} suffix={stat.suffix} decimals={stat.decimals || 0} duration={2.5} enableScrollSpy scrollSpyOnce className="font-display text-4xl font-bold text-white" />
                <p className="text-blue-200 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Marquee */}
      <section className="py-14 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center text-gray-400 text-xs font-semibold uppercase tracking-widest mb-10"
          >
            Trusted Partners & Integrations
          </motion.p>
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
              className="flex items-center gap-6 w-max"
            >
              {[...partners, ...partners].map((partner, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center h-12 px-7 rounded-xl flex-shrink-0 opacity-70 hover:opacity-100 transition-all duration-300 cursor-default"
                  style={{ backgroundColor: partner.bg, minWidth: '110px' }}
                >
                  <span className="font-display font-bold text-base tracking-tight" style={{ color: partner.text }}>
                    {partner.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Our Services</span>
            <h2 className="font-display text-4xl font-bold text-gray-900 mt-2">Complete Logistics Solutions</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">From local deliveries to international freight, we provide end-to-end shipping solutions tailored to your needs.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1} whileHover={{ y: -4 }}
                className="card hover:border-blue-200 transition-all duration-300 cursor-pointer"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">{service.icon}</div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">How It Works</span>
            <h2 className="font-display text-4xl font-bold text-gray-900 mt-2">Ship in 3 Easy Steps</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Create Shipment', desc: 'Fill in sender and receiver details, package info and select delivery options.' },
              { step: '02', title: 'We Pick & Pack', desc: 'Our team picks up your package and ensures it is securely packed for transit.' },
              { step: '03', title: 'Track & Receive', desc: 'Monitor your shipment in real-time and receive it at your doorstep.' },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="font-display text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-xl mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Pricing</span>
            <h2 className="font-display text-4xl font-bold text-gray-900 mt-2">Simple, Transparent Pricing</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">Choose the plan that works best for your shipping needs. No hidden fees, no surprises.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {pricingPlans.map((plan, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                className={`bg-white rounded-3xl border-2 ${plan.color} p-8 relative flex flex-col ${plan.badge ? 'shadow-2xl scale-105' : 'shadow-md'} transition-all duration-300 hover:shadow-xl`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow">{plan.badge}</span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-display text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-end gap-1">
                    {plan.price !== 'Custom' && <span className="text-gray-400 text-lg">₦</span>}
                    <span className="font-display text-4xl font-bold text-gray-900">{plan.price}</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">{plan.period}</p>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-5 h-5 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/register" className={plan.ctaStyle}>{plan.cta}</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Testimonials</span>
            <h2 className="font-display text-4xl font-bold text-gray-900 mt-2">What Our Customers Say</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} whileHover={{ y: -4 }}
                className="card hover:border-blue-200 transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <FiStar key={j} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 text-sm">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">FAQ</span>
            <h2 className="font-display text-4xl font-bold text-gray-900 mt-2">Frequently Asked Questions</h2>
            <p className="text-gray-500 mt-4">Everything you need to know about Axionwave Logistics.</p>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-sm pr-4">{faq.q}</span>
                  {openFaq === i
                    ? <FiChevronUp className="text-blue-600 flex-shrink-0" />
                    : <FiChevronDown className="text-gray-400 flex-shrink-0" />
                  }
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-5"
                  >
                    <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1600&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,32,64,0.92) 0%, rgba(29,78,216,0.88) 100%)' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white text-sm mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Trusted by 50,000+ customers worldwide
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">Ready to Ship with Confidence?</h2>
            <p className="text-blue-200 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of businesses that trust Axionwave for their logistics needs. Fast, reliable and secure shipping worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold py-4 px-8 rounded-xl transition-colors text-lg">
                Start Shipping Today
              </Link>
              <Link to="/contact" className="border-2 border-white text-white hover:bg-white hover:text-blue-700 font-semibold py-4 px-8 rounded-xl transition-colors text-lg">
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Newsletter />

      <Footer />
    </div>
  );
};

export default Landing;