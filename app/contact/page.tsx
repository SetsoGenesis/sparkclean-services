'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { contactSchema, type ContactFormData } from '@/lib/schemas'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const areas = ['Phakalane', 'Block 8', 'Broadhurst', 'Molapo', 'Tlokweng', 'Airport Junction', 'Gaborone West', 'Extension 2', 'and surrounding areas']

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please WhatsApp us directly at +267 762 44947')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-[#75AADB]/10 to-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-gray-900 mb-4">Contact Us</h1>
            <p className="text-gray-500 text-lg">We are always happy to hear from you. Re a Gapa!</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <motion.div initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }}>
            <h2 className="font-heading font-bold text-2xl text-gray-900 mb-8">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#75AADB]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#75AADB]" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Phone</p>
                  <p className="text-gray-600">+267 762 44947</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">WhatsApp</p>
                  <a
                    href="https://wa.me/26776244947"
                    className="text-green-600 hover:underline font-medium"
                    target="_blank" rel="noopener noreferrer"
                  >
                    Chat with us on WhatsApp
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#75AADB]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#75AADB]" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-gray-600">hello@sparkclean.co.bw</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#75AADB]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#75AADB]" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Operating Hours</p>
                  <p className="text-gray-600">Monday – Saturday</p>
                  <p className="text-gray-600">7:00am – 6:00pm</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#C8A96E]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#C8A96E]" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Areas Served</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{areas.join(' · ')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }}>
            <h2 className="font-heading font-bold text-2xl text-gray-900 mb-8">Send a Message</h2>
            {submitted ? (
              <div className="bg-[#75AADB]/10 border border-[#75AADB] rounded-2xl p-8 text-center">
                <p className="font-heading font-semibold text-[#75AADB] text-xl mb-2">Message received!</p>
                <p className="text-gray-600">We will get back to you very soon. Re a Gapa!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input {...register('full_name')} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#75AADB]" placeholder="Your name" />
                  {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input {...register('phone')} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#75AADB]" placeholder="+267 762 44947" />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea {...register('message')} rows={4} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#75AADB] resize-none" placeholder="How can we help you?" />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#75AADB] text-white font-heading font-semibold py-3.5 rounded-xl hover:bg-[#5a95cc] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Sending...
                    </>
                  ) : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
