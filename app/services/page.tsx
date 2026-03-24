'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, Building2, Layers, Hotel, Check } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const quoteSchema = z.object({
  name: z.string().min(2, 'Name required'),
  phone: z.string().min(7, 'Phone required'),
  property_type: z.string().min(1, 'Please select property type'),
  location: z.string().min(2, 'Location required'),
  message: z.string().optional(),
})
type QuoteForm = z.infer<typeof quoteSchema>

const services = [
  {
    icon: Home, title: 'Residential Cleaning', price: 'From P250/session', slug: 'residential',
    desc: 'A thorough, regular clean for your home. We take care of every room so you can focus on what matters.',
    includes: ['Vacuuming all rooms & hallways', 'Mopping hard floors', 'Dusting surfaces & shelves', 'Bathroom scrubbing & sanitising', 'Kitchen surfaces & sink', 'Trash removal'],
  },
  {
    icon: Building2, title: 'Office & Commercial Cleaning', price: 'Custom Quote', slug: 'office',
    desc: 'A clean workspace is a productive workspace. We handle offices, retail spaces, and more.',
    includes: ['Workstation & desk cleaning', 'Floor vacuuming & mopping', 'Bathroom sanitising', 'Kitchen & breakroom cleaning', 'Window cleaning (interior)', 'Trash & recycling removal'],
  },
  {
    icon: Layers, title: 'Deep Cleaning', price: 'From P500', slug: 'deep_clean',
    desc: 'The full reset. Perfect for move-in/out, seasonal cleans, or when you need every corner spotless.',
    includes: ['Everything in Residential Clean', 'Inside appliances (fridge, oven, microwave)', 'Behind & under furniture', 'Ceiling fans & light fittings', 'Deep bathroom scrubbing', 'Skirting boards & light switches'],
  },
  {
    icon: Hotel, title: 'Airbnb & Rental Turnover', price: 'From P300', slug: 'airbnb',
    desc: 'Keep your guests happy with a spotless property every time. Full reset between every booking.',
    includes: ['Full property clean & reset', 'Linen changes & bed making', 'Restocking essentials', 'Inspection report after each clean', 'Quick turnaround between guests', 'Consistent quality every visit'],
  },
]

export default function ServicesPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<QuoteForm>({
    resolver: zodResolver(quoteSchema),
  })

  const onSubmit = async (data: QuoteForm) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: data.name,
          phone: data.phone,
          message: `Quote request - Property: ${data.property_type}, Location: ${data.location}. ${data.message || ''}`.trim(),
        }),
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
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-gray-900 mb-4">Our Services</h1>
            <p className="text-gray-500 text-lg">Professional cleaning for every space in Gaborone.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((s) => {
              const Icon = s.icon
              return (
                <motion.div key={s.slug}
                  initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }}
                  className="bg-white rounded-2xl border border-gray-200 p-8 hover:border-[#75AADB] hover:shadow-md transition-all">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#75AADB]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-[#75AADB]" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-xl text-gray-900">{s.title}</h3>
                      <p className="text-[#C8A96E] font-semibold">{s.price}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">{s.desc}</p>
                  <ul className="space-y-2 mb-8">
                    {s.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-[#5C8A3C] flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href={'/book?service=' + s.slug}
                    className="block w-full text-center bg-[#75AADB] text-white font-heading font-semibold px-6 py-3 rounded-xl hover:bg-[#5a95cc] transition-colors">
                    Book This Service
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }}>
            <h2 className="font-heading font-bold text-3xl text-gray-900 text-center mb-2">Request a Free Quote</h2>
            <p className="text-gray-500 text-center mb-8">Tell us about your space and we will get back to you within 2 hours.</p>
            {submitted ? (
              <div className="bg-[#75AADB]/10 border border-[#75AADB] rounded-2xl p-8 text-center">
                <p className="font-heading font-semibold text-[#75AADB] text-xl mb-2">Quote request received!</p>
                <p className="text-gray-600">We will WhatsApp you shortly. Re a Gapa!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input {...register('name')} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#75AADB]" placeholder="Your name" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone / WhatsApp</label>
                    <input {...register('phone')} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#75AADB]" placeholder="+267 762 44947" />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                    <select {...register('property_type')} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#75AADB] bg-white">
                      <option value="">Select type</option>
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="office">Office</option>
                      <option value="airbnb">Airbnb / Rental</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.property_type && <p className="text-red-500 text-xs mt-1">{errors.property_type.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location in Gaborone</label>
                    <input {...register('location')} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#75AADB]" placeholder="e.g. Phakalane, Block 8" />
                    {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message (optional)</label>
                  <textarea {...register('message')} rows={3} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#75AADB] resize-none" placeholder="Anything else you would like us to know?" />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button type="submit" disabled={loading}
                  className="w-full bg-[#75AADB] text-white font-heading font-semibold py-3.5 rounded-xl hover:bg-[#5a95cc] transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Sending...
                    </>
                  ) : 'Request Free Quote'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
