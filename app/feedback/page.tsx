'use client'

import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react'
import { Star, MessageSquare, Lightbulb, AlertCircle, Handshake } from 'lucide-react'
import { feedbackSchema, type FeedbackFormData } from '@/lib/schemas'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const feedbackTypes = [
  { value: 'review', label: 'Service Review', icon: Star },
  { value: 'suggestion', label: 'Suggestion / Idea', icon: Lightbulb },
  { value: 'complaint', label: 'Complaint', icon: AlertCircle },
  { value: 'comment', label: 'General Comment', icon: MessageSquare },
  { value: 'partnership', label: 'Partnership', icon: Handshake },
]

const placeholderReviews = [
  { name: 'Kabo M.', rating: 5, message: 'SparkClean completely transformed my home. Punctual, thorough, and professional!' },
  { name: 'Lesego T.', rating: 5, message: 'I use them for my Airbnb and my guests always comment on how clean it is. Reliable every time.' },
  { name: 'Oratile D.', rating: 5, message: 'The deep clean was exceptional — behind the fridge, inside the oven, everything. Worth every Pula.' },
]

function StarSelector({ value, onChange }: { value?: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button" onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)} onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110">
          <Star className="w-8 h-8"
            fill={(hovered || value || 0) >= n ? '#C8A96E' : 'none'}
            stroke={(hovered || value || 0) >= n ? '#C8A96E' : '#d1d5db'} />
        </button>
      ))}
    </div>
  )
}

type Review = { name: string; rating: number; message: string }

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [reviews, setReviews] = useState<Review[]>([])
  const [rating, setRating] = useState<number | undefined>()

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: { feedback_type: 'review' },
  })

  const feedbackType = watch('feedback_type')

  useEffect(() => {
    fetch('/api/feedback')
      .then((r) => r.json())
      .then((d) => { if (d.data?.length > 0) setReviews(d.data); else setReviews(placeholderReviews) })
      .catch(() => setReviews(placeholderReviews))
  }, [])

  const onSubmit = async (data: FeedbackFormData) => {
    setLoading(true)
    setError('')
    try {
      const payload = { ...data, rating: feedbackType === 'review' ? rating : undefined }
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
      {/* Header */}
      <section className="bg-gradient-to-br from-[#75AADB]/10 to-white py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-gray-900 mb-3">
              Your Voice Matters
            </h1>
            <p className="text-[#75AADB] font-heading font-semibold text-lg italic mb-3">
              Re Bua Mmogo — Let&apos;s Talk
            </p>
            <p className="text-gray-500 max-w-lg mx-auto">
              Help us serve Gaborone better. Share your experience, suggest a new service, or just say hello.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-14 bg-gray-50 px-4">
        <div className="max-w-lg mx-auto">
          {submitted ? (
            <motion.div initial="hidden" animate="show" variants={fadeUp}
              className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 text-center">
              <motion.div animate={{ scale: [0.8, 1.15, 1] }} transition={{ duration: 0.5 }} className="text-5xl mb-4">
                💙
              </motion.div>
              <h2 className="font-heading font-bold text-xl text-gray-900 mb-2">Thank you!</h2>
              <p className="text-gray-600">Your feedback helps us grow. — SparkClean Team 💙</p>
              <button onClick={() => setSubmitted(false)} className="mt-6 text-[#75AADB] font-medium hover:underline text-sm">
                Submit another response
              </button>
            </motion.div>
          ) : (
            <motion.div initial="hidden" animate="show" variants={fadeUp}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name <span className="text-gray-400 font-normal">(optional — can submit anonymously)</span>
                  </label>
                  <input {...register('name')} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#75AADB]" placeholder="Your name or leave blank" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Feedback Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {feedbackTypes.map(({ value, label, icon: Icon }) => (
                      <label key={value}
                        className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-colors text-sm ${
                          feedbackType === value
                            ? 'border-[#75AADB] bg-[#75AADB]/5 text-[#75AADB] font-medium'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}>
                        <input type="radio" value={value} {...register('feedback_type')} className="sr-only" />
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="leading-tight">{label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.feedback_type && <p className="text-red-500 text-xs mt-1">{errors.feedback_type.message}</p>}
                </div>

                {feedbackType === 'review' && (
                  <motion.div initial="hidden" animate="show" variants={fadeUp}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <StarSelector value={rating} onChange={setRating} />
                  </motion.div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                  <textarea {...register('message')} rows={4}
                    className={`w-full border ${errors.message ? 'border-red-400' : 'border-gray-300'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#75AADB] resize-none`}
                    placeholder="Tell us what you think..." />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    WhatsApp <span className="text-gray-400 font-normal">(optional — if you want a response)</span>
                  </label>
                  <input {...register('whatsapp')} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#75AADB]" placeholder="+267 762 44947" />
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
                  ) : 'Send Feedback'}
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </section>

      {/* Wall of Praise */}
      <section className="py-16 bg-white px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="font-heading font-bold text-3xl text-gray-900 mb-2">Wall of Praise</h2>
            <p className="text-gray-500">Kind words from our Gaborone clients.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <motion.div key={i} initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl border border-gray-100 p-6">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-[#C8A96E] fill-[#C8A96E]" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm italic mb-3 leading-relaxed">&ldquo;{r.message}&rdquo;</p>
                <p className="font-heading font-semibold text-gray-800 text-sm">{r.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
