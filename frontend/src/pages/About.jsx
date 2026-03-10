import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiTarget, FiEye, FiAward, FiUsers,
  FiGlobe, FiTruck, FiShield, FiArrowRight
} from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import CountUp from 'react-countup';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

const About = () => {
  const team = [
    {
      name: 'Emeka Okafor',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face',
      bio: 'Visionary leader with 15+ years in logistics and supply chain management.',
    },
    {
      name: 'Amaka Nwosu',
      role: 'Chief Operations Officer',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face',
      bio: 'Operations expert ensuring seamless delivery experiences across all regions.',
    },
    {
      name: 'Tunde Adeyemi',
      role: 'Head of Technology',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      bio: 'Tech innovator building cutting-edge logistics solutions for the modern world.',
    },
    {
      name: 'Chioma Eze',
      role: 'Customer Success Lead',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face',
      bio: 'Dedicated to ensuring every customer has an exceptional shipping experience.',
    },
  ];

  const values = [
    {
      icon: <FiShield className="text-3xl text-blue-600" />,
      title: 'Reliability',
      desc: 'We deliver on our promises. Every shipment, every time, with consistent excellence.',
    },
    {
      icon: <FiGlobe className="text-3xl text-blue-600" />,
      title: 'Global Reach',
      desc: 'Our network spans 180+ countries, connecting businesses and people worldwide.',
    },
    {
      icon: <FiUsers className="text-3xl text-blue-600" />,
      title: 'Customer First',
      desc: 'Every decision we make is guided by what is best for our customers.',
    },
    {
      icon: <FiAward className="text-3xl text-blue-600" />,
      title: 'Excellence',
      desc: 'We continuously push boundaries to deliver world-class logistics solutions.',
    },
  ];

  const milestones = [
    { year: '2018', title: 'Founded', desc: 'Axionwave Logistics was founded in Lagos, Nigeria.' },
    { year: '2019', title: 'First 1,000 Shipments', desc: 'Reached our first major milestone of 1,000 successful deliveries.' },
    { year: '2020', title: 'National Expansion', desc: 'Expanded operations to all 36 states in Nigeria.' },
    { year: '2021', title: 'International Launch', desc: 'Launched international shipping to 50+ countries.' },
    { year: '2022', title: 'Tech Platform', desc: 'Launched our digital platform with real-time tracking.' },
    { year: '2024', title: '50K+ Customers', desc: 'Serving over 50,000 satisfied customers worldwide.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section
        className="pt-32 pb-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f2040 0%, #1d4ed8 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1586528116493-a029325540fa?w=1600&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-300 rounded-full opacity-10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white text-sm mb-6">
                <FiAward /> About Axionwave
              </span>
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Delivering Excellence
                <span className="text-blue-300 block">Since 2018</span>
              </h1>
              <p className="text-blue-100 text-lg leading-relaxed mb-8">
                Axionwave Logistics is Africa's premier shipping and logistics platform, connecting businesses and individuals with fast, reliable, and secure delivery solutions across the globe.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register" className="btn-primary flex items-center gap-2">
                  Get Started <FiArrowRight />
                </Link>
                <Link to="/contact" className="border-2 border-white text-white hover:bg-white hover:text-blue-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300">
                  Contact Us
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80"
                  alt="About Axionwave"
                  className="rounded-3xl shadow-2xl w-full object-cover h-[450px]"
                />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FiTruck className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">6+ Years Experience</p>
                    <p className="text-gray-400 text-xs">Trusted by thousands</p>
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 text-center"
                >
                  <p className="text-2xl font-bold text-blue-600">180+</p>
                  <p className="text-gray-500 text-xs">Countries</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { end: 50, suffix: 'K+', label: 'Happy Customers' },
              { end: 180, suffix: '+', label: 'Countries Served' },
              { end: 1, suffix: 'M+', label: 'Packages Delivered' },
              { end: 99.8, suffix: '%', label: 'On-Time Delivery', decimals: 1 },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="text-center"
              >
                <CountUp
                  end={stat.end}
                  suffix={stat.suffix}
                  decimals={stat.decimals || 0}
                  duration={2.5}
                  enableScrollSpy
                  scrollSpyOnce
                  className="font-display text-4xl font-bold text-white"
                />
                <p className="text-blue-200 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="card border-l-4 border-l-blue-600"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <FiTarget className="text-blue-600 text-3xl" />
              </div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To provide fast, reliable, and affordable logistics solutions that empower businesses and individuals to ship with confidence. We are committed to revolutionizing the shipping experience across Africa and beyond through technology and dedication.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="card border-l-4 border-l-blue-400"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <FiEye className="text-blue-600 text-3xl" />
              </div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To become the most trusted and innovative logistics company in Africa, setting the standard for excellence in shipping, technology, and customer service. We envision a world where distance is no barrier to commerce and connection.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">What We Stand For</span>
            <h2 className="font-display text-4xl font-bold text-gray-900 mt-2">Our Core Values</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                whileHover={{ y: -4 }}
                className="card text-center hover:border-blue-200 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">The People Behind Axionwave</span>
            <h2 className="font-display text-4xl font-bold text-gray-900 mt-2">Meet Our Team</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              A passionate team of logistics experts, technologists, and customer champions dedicated to your success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                whileHover={{ y: -4 }}
                className="card text-center hover:border-blue-200 transition-all duration-300"
              >
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-2xl object-cover mx-auto"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mt-4">{member.name}</h3>
                <p className="text-blue-600 text-sm font-medium mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Our Journey</span>
            <h2 className="font-display text-4xl font-bold text-gray-900 mt-2">Company Milestones</h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-blue-100" />
            <div className="space-y-12">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className={`flex items-center gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="card inline-block hover:shadow-lg transition-all duration-300">
                      <p className="font-display text-2xl font-bold text-blue-600">{milestone.year}</p>
                      <h3 className="font-semibold text-gray-900 mt-1">{milestone.title}</h3>
                      <p className="text-gray-500 text-sm mt-1">{milestone.desc}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-blue-100 flex-shrink-0 z-10" />
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <FaQuoteLeft className="text-blue-200 text-6xl mx-auto mb-6" />
            <blockquote className="font-display text-2xl lg:text-3xl font-bold text-gray-900 leading-relaxed mb-8">
              "We don't just deliver packages, we deliver trust, reliability, and peace of mind to every customer we serve."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
                alt="CEO"
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="font-semibold text-gray-900">Emeka Okafor</p>
                <p className="text-gray-500 text-sm">CEO & Founder, Axionwave Logistics</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1600&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(15,32,64,0.92) 0%, rgba(29,78,216,0.88) 100%)' }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl font-bold text-white mb-6">
              Ready to Ship with Axionwave?
            </h2>
            <p className="text-blue-200 text-lg mb-10">
              Join thousands of businesses that trust us for their logistics needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold py-4 px-8 rounded-xl transition-colors text-lg">
                Get Started Today
              </Link>
              <Link to="/contact" className="border-2 border-white text-white hover:bg-white hover:text-blue-700 font-semibold py-4 px-8 rounded-xl transition-colors text-lg">
                Talk to Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;