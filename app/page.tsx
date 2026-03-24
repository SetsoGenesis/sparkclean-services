'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, Building2, Layers, Hotel, CheckCircle, Sparkles, ArrowRight, Star } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const stagger = {
  show: { transition: { staggerChildren: 0.12 } },
}

const testimonials = [
  {
    name: 'Kabo M.',
    area: 'Phakalane',
    stars: 5,
    quote: 'SparkClean completely transformed my home. The team was punctual, thorough, and so professional. I will never use anyone else!',
  },
  {
    name: 'Lesego T.',
    area: 'Block 8',
    stars: 5,
    quote: 'I use them for my Airbnb and my guests always comment on how clean the place is. Reliable, fast, and worth every Pula.',
  },
  {
    name: 'Oratile D.',
    area: 'Broadhurst',
    stars: 5,
    quote: 'Booked online on a Monday, they were there Tuesday morning. The deep clean was exceptional — behind the fridge, inside the oven, everything.',
  },
]

const services = [
  { icon: Home, title: 'Residential Cleaning', price: 'From P250', desc: 'Regular home cleaning done right.', href: '/services' },
  { icon: Building2, title: 'Office & Commercial', price: 'Custom Quotes', desc: 'Keep your workspace spotless.', href: '/services' },
  { icon: Layers, title: 'Deep Cleaning', price: 'From P500', desc: 'Top to bottom, nothing missed.', href: '/services' },
  { icon: Hotel, title: 'Airbnb & Rental', price: 'From P300', desc: 'Full reset between every guest.', href: '/services' },
]

const trusts = [
  { icon: CheckCircle, label: 'Trained Staff' },
  { icon: CheckCircle, label: 'Eco-Friendly Products' },
  { icon: CheckCircle, label: 'Reliable Scheduling' },
  { icon: CheckCircle, label: 'Affordable Pricing' },
]

// Simple SVG sparkle particle
function SparkleParticle({ x, y, delay }: { x: string; y: string; delay: number }) {
  return (
    <motion.div
      className="absolute w-1.5 h-1.5 bg-white rounded-full"
      style={{ left: x, top: y }}
      animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
      transition={{ duration: 2.5, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

export default function HomePage() {
  const particles = [
    { x: '10%', y: '20%', delay: 0 }, { x: '25%', y: '60%', delay: 0.4 },
    { x: '45%', y: '35%', delay: 0.8 }, { x: '65%', y: '70%', delay: 0.2 },
    { x: '80%', y: '25%', delay: 1.2 }, { x: '90%', y: '55%', delay: 0.6 },
    { x: '15%', y: '80%', delay: 1.0 }, { x: '55%', y: '15%', delay: 1.4 },
  ]

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#75AADB] via-[#5a95cc] to-[#3a6fa8]">
        {particles.map((p, i) => (
          <SparkleParticle key={i} {...p} />
        ))}
        {/* Basket-weave overlay */}
        <div className="absolute inset-0 basket-pattern opacity-30" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-7 h-7 text-[#C8A96E]" />
              <span className="text-[#C8A96E] font-heading font-semibold text-lg tracking-wide">SparkClean Services</span>
            </div>
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-4">
              Gaborone&apos;s Most Trusted<br />Cleaning Service
            </h1>
            <p className="text-blue-100 text-lg sm:text-xl mb-2">
              Professional. Reliable. Affordable.
            </p>
            <p className="text-[#C8A96E] font-heading font-semibold text-xl mb-8 italic">
              Re a Gapa — We Deliver.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book"
                className="bg-white text-[#75AADB] font-heading font-bold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-colors text-lg shadow-lg"
              >
                Book a Clean →
              </Link>
              <Link
                href="/call"
                className="bg-transparent border-2 border-white text-white font-heading font-bold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors text-lg"
              >
                Schedule a Call →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="py-16 bg-gray-50 basket-pattern">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {trusts.map(({ icon: Icon, label }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100"
              >
                <Icon className="w-8 h-8 text-[#75AADB] mx-auto mb-3" />
                <p className="font-heading font-semibold text-gray-800">{label}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-6 text-[#75AADB] font-semibold italic"
          >
            Tirisano Mmogo — Working Together
          </motion.p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 mb-3">Our Services</h2>
            <p className="text-gray-500 text-lg">Everything your space needs — at prices that make sense.</p>
          </motion.div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map(({ icon: Icon, title, price, desc, href }) => (
              <motion.div key={title} variants={fadeUp}>
                <Link
                  href={href}
                  className="block bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#75AADB] hover:shadow-md transition-all group h-full"
                >
                  <div className="w-12 h-12 bg-[#75AADB]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#75AADB]/20 transition-colors">
                    <Icon className="w-6 h-6 text-[#75AADB]" />
                  </div>
                  <h3 className="font-heading font-semibold text-gray-900 mb-1">{title}</h3>
                  <p className="text-[#C8A96E] font-semibold text-sm mb-2">{price}</p>
                  <p className="text-gray-500 text-sm">{desc}</p>
                  <span className="inline-flex items-center gap-1 text-[#75AADB] text-sm font-medium mt-3">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 mb-3">How It Works</h2>
            <p className="text-gray-500 text-lg">Simple. Fast. Stress-free.</p>
          </motion.div>
          <div className="relative">
            {/* Connector line — desktop */}
            <div className="hidden md:block absolute top-10 left-[16.5%] right-[16.5%] h-0.5 bg-[#75AADB]/30" />
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                { step: '01', title: 'Book Online or via WhatsApp', desc: 'Fill in our quick form or send us a WhatsApp message. Takes under 2 minutes.' },
                { step: '02', title: 'We Confirm & Schedule', desc: 'We\'ll WhatsApp you within 2 hours to confirm your booking and time slot.' },
                { step: '03', title: 'Sit Back — We Handle the Rest', desc: 'Our trained team arrives on time and leaves your space sparkling clean.' },
              ].map(({ step, title, desc }) => (
                <motion.div key={step} variants={fadeUp} className="text-center">
                  <div className="w-20 h-20 bg-[#75AADB] rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <span className="font-heading font-bold text-white text-xl">{step}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 mb-3">What Gaborone Says</h2>
            <p className="text-gray-500">Real clients. Real results.</p>
          </motion.div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#C8A96E] fill-[#C8A96E]" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
                <p className="font-heading font-semibold text-gray-900 text-sm">{t.name}</p>
                <p className="text-gray-400 text-xs">{t.area}, Gaborone</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 bg-gradient-to-r from-[#75AADB] to-[#5a95cc]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">
              Ready for a Sparkling Clean Space?
            </h2>
            <p className="text-blue-100 mb-8 text-lg">Join 40+ happy clients across Gaborone.</p>
            <Link
              href="/book"
              className="inline-block bg-white text-[#75AADB] font-heading font-bold px-10 py-4 rounded-xl hover:bg-blue-50 transition-colors text-lg shadow-lg"
            >
              Book Now — Starting at P250
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
