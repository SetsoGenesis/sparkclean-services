'use client'

import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Phone, CheckCircle } from 'lucide-react'
import { callSchema, type CallFormData } from '@/lib/schemas'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

function Spinner() {
  return (
    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  )
}

export default function CallPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<CallFormData>({
    resolver: zodResolver(callSchema),
    defaultValues: { best_time: 'morning', topic: 'enquiry' },
  })

  const onSubmit = async (data: CallFormData) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/call-requests', {
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
    <div className="pt-16 min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-[#75AADB]/10 to-white py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <div className="w-16 h-16 bg-[#75AADB]/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <Phone className="w-7 h-7 text-[#75AADB]" />
            </div>
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-gray-900 mb-4">Schedule a Call</h1>
            <p className="text-gray-500 text-lg">Tell us when to call — we will be there.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-lg mx-auto">
          {submitted ? (
            <motion.div initial="hidden" animate="show" variants={fadeUp}
              className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-[#75AADB]/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-8 h-8 text-[#75AADB]" />
              </div>
              <h2 className="font-heading font-bold text-xl text-gray-900 mb-2">Got it!</h2>
              <p className="text-gray-600 leading-relaxed">
                We will call you at your preferred time.<br />
                <span className="text-[#75AADB] font-semibold italic">Re a Gapa — We are on it!</span>
              </p>
              <a href="/" className="mt-6 inline-block text-[#75AADB] font-medium hover:underline">← Back to Home</a>
            </motion.div>
          ) : (
            <motion.div initial="hidden" animate="show" variants={fadeUp}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input {...register('full_name')} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#75AADB]" placeholder="Your full name" />
                  {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp / Phone Number</label>
                  <input {...register('phone')} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#75AADB]" placeholder="+267 762 44947" />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Best Time to Call</label>
                  <select {...register('best_time')} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#75AADB] bg-white">
                    <option value="morning">Morning (7am – 12pm)</option>
                    <option value="afternoon">Afternoon (12pm – 5pm)</option>
                    <option value="evening">Evening (5pm – 7pm)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">What is it about?</label>
                  <select {...register('topic')} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#75AADB] bg-white">
                    <option value="enquiry">General Enquiry</option>
                    <option value="quote">Get a Quote</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Short Message (optional)</label>
                  <textarea {...register('message')} rows={3} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#75AADB] resize-none" placeholder="Anything you would like us to know before the call?" />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button type="submit" disabled={loading}
                  className="w-full bg-[#75AADB] text-white font-heading font-semibold py-3.5 rounded-xl hover:bg-[#5a95cc] transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                  {loading ? <><Spinner /> Scheduling...</> : 'Schedule My Call →'}
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
