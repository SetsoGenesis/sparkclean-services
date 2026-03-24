'use client'

import { motion } from 'framer-motion'
import { Heart, Shield, Banknote, Users } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const stats = [
  { value: '40+', label: 'Happy Clients' },
  { value: '100%', label: 'Local Business' },
  { value: 'P250', label: 'Starting Price' },
  { value: '2hr', label: 'Response Time' },
]

const values = [
  { icon: Shield, title: 'Reliability', desc: 'We show up on time, every time. Your schedule matters.' },
  { icon: Heart, title: 'Professionalism', desc: 'Trained staff who treat your space with care and respect.' },
  { icon: Banknote, title: 'Affordability', desc: 'Premium cleaning at prices that work for Botswana families.' },
  { icon: Users, title: 'Community', desc: 'Proudly local. We reinvest in Gaborone with every booking.' },
]

// Simple SVG outline of Botswana with Gaborone marker
function BotswanaMap() {
  return (
    <svg viewBox="0 0 200 220" className="w-full max-w-xs mx-auto opacity-80" fill="none">
      <path
        d="M60 20 L80 15 L120 18 L150 30 L165 55 L170 90 L160 130 L150 160 L130 185 L100 200 L70 195 L45 175 L30 145 L25 110 L30 75 L40 45 Z"
        stroke="#75AADB"
        strokeWidth="2.5"
        fill="#75AADB"
        fillOpacity="0.08"
      />
      {/* Gaborone dot */}
      <circle cx="85" cy="178" r="5" fill="#75AADB" />
      <circle cx="85" cy="178" r="9" stroke="#75AADB" strokeWidth="1.5" fill="none" opacity="0.4" />
      <text x="96" y="182" fontSize="11" fill="#75AADB" fontFamily="sans-serif" fontWeight="600">Gaborone</text>
    </svg>
  )
}

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#75AADB]/10 to-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-gray-900 mb-4">
              About SparkClean
            </h1>
            <p className="text-gray-500 text-lg">Proudly local. Built for Gaborone.</p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }}>
            <h2 className="font-heading font-bold text-3xl text-gray-900 mb-5">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              SparkClean was born out of frustration with unreliable cleaning services in Gaborone.
              Our founder — tired of cancelled appointments and half-done jobs — decided to build
              something better: a cleaning company that actually shows up, does the work thoroughly,
              and treats every client like family.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              We started small, serving a handful of homes in Broadhurst. Word spread fast — because
              when a cleaner shows up on time and leaves your bathroom spotless, you tell your neighbours.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today we serve 40+ clients across Gaborone — from busy professionals in Phakalane
              to Airbnb hosts in the Airport Junction area. We are proudly 100% Botswana-owned and operated.
            </p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }}>
            <BotswanaMap />
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-[#75AADB]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }}>
            <p className="text-blue-100 text-sm font-semibold uppercase tracking-widest mb-4">Our Mission</p>
            <blockquote className="font-heading font-bold text-2xl sm:text-3xl text-white leading-snug">
              &ldquo;To keep every home and office in Botswana clean, healthy, and sparkling —
              delivered with Botswana warmth.&rdquo;
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }}
            className="font-heading font-bold text-3xl text-gray-900 text-center mb-10"
          >
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }}
                className="text-center p-6 rounded-2xl border border-gray-100 hover:border-[#75AADB] transition-colors"
              >
                <div className="w-12 h-12 bg-[#75AADB]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-[#75AADB]" />
                </div>
                <h3 className="font-heading font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map(({ value, label }) => (
              <motion.div
                key={label}
                initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }}
              >
                <p className="font-heading font-extrabold text-4xl text-[#75AADB] mb-1">{value}</p>
                <p className="text-gray-400 text-sm">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }}
            className="font-heading font-bold text-3xl text-gray-900 text-center mb-10"
          >
            The Team
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg mx-auto">
            {[
              { name: 'T. Mokoena', role: 'Founder & Owner', initial: 'T' },
              { name: 'L. Kgosimore', role: 'Lead Cleaning Specialist', initial: 'L' },
            ].map(({ name, role, initial }) => (
              <motion.div
                key={name}
                initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }}
                className="text-center p-6 rounded-2xl border border-gray-100"
              >
                <div className="w-16 h-16 bg-[#75AADB] rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="font-heading font-bold text-white text-2xl">{initial}</span>
                </div>
                <p className="font-heading font-semibold text-gray-900">{name}</p>
                <p className="text-gray-400 text-sm">{role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
