'use client'

import { useState, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { bookingSchema, type BookingFormData } from '@/lib/schemas'
import { getEstimatedPrice, formatPrice, type ServiceType, type PropertySize } from '@/lib/pricing'
import { CheckCircle } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

function Spinner() {
  return (
    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  )
}

function inputCls(hasError?: boolean) {
  return `w-full border ${hasError ? 'border-red-400' : 'border-gray-300'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#75AADB] bg-white`
}

function BookingInner() {
  const searchParams = useSearchParams()
  const defaultService = (searchParams.get('service') as BookingFormData['service_type']) || 'residential'

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { service_type: defaultService, property_size: '2bed', preferred_time: 'morning' },
  })

  const watchedService = watch('service_type') as ServiceType
  const watchedSize = watch('property_size') as PropertySize
  const price = getEstimatedPrice(watchedService, watchedSize)
  const today = new Date().toISOString().split('T')[0]

  const nextStep = async () => {
    const fields: (keyof BookingFormData)[] =
      step === 1
        ? ['service_type', 'property_size', 'preferred_date', 'preferred_time']
        : ['full_name', 'whatsapp', 'address']
    const ok = await trigger(fields)
    if (ok) setStep((s) => s + 1)
  }

  const onSubmit = async (data: BookingFormData) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/bookings', {
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

  const serviceLabels: Record<BookingFormData['service_type'], string> = {
    residential: 'Residential Cleaning',
    office: 'Office & Commercial',
    deep_clean: 'Deep Cleaning',
    airbnb: 'Airbnb & Rental',
  }
  const sizeLabels: Record<BookingFormData['property_size'], string> = {
    studio: 'Studio', '1bed': '1 Bedroom', '2bed': '2 Bedrooms', '3bed': '3 Bedrooms', larger: 'Larger Property',
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-16">
        <motion.div initial="hidden" animate="show" variants={fadeUp} className="text-center max-w-md">
          <div className="w-20 h-20 bg-[#75AADB]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#75AADB]" />
          </div>
          <h2 className="font-heading font-bold text-2xl text-gray-900 mb-3">Booking Received!</h2>
          <p className="text-gray-600 leading-relaxed">
            We will WhatsApp you within 2 hours to confirm your booking.<br />
            <span className="text-[#75AADB] font-semibold italic">Re a Gapa — We are on it!</span>
          </p>
          <a href="/" className="mt-6 inline-block text-[#75AADB] font-medium hover:underline">← Back to Home</a>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#75AADB]/10 to-white py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-heading font-extrabold text-4xl text-gray-900 mb-2">Book a Clean</h1>
          <p className="text-gray-500">Complete the form below — takes under 2 minutes.</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-8">
        <div className="flex items-center gap-0 mb-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-heading font-bold transition-colors ${step >= s ? 'bg-[#75AADB] text-white' : 'bg-gray-200 text-gray-500'}`}>
                {s}
              </div>
              {s < 3 && <div className={`flex-1 h-0.5 mx-2 transition-colors ${step > s ? 'bg-[#75AADB]' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-400 mb-6 px-1">
          <span>Service Details</span><span>Contact Info</span><span>Confirm</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto px-4 pb-16">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" initial="hidden" animate="show" exit={{ opacity: 0 }} variants={fadeUp}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-5">
              <h2 className="font-heading font-bold text-xl text-gray-900">Service Details</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                <select {...register('service_type')} className={inputCls(!!errors.service_type)}>
                  <option value="residential">Residential Cleaning</option>
                  <option value="office">Office & Commercial Cleaning</option>
                  <option value="deep_clean">Deep Cleaning</option>
                  <option value="airbnb">Airbnb & Rental Turnover</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Size</label>
                <select {...register('property_size')} className={inputCls(!!errors.property_size)}>
                  <option value="studio">Studio</option>
                  <option value="1bed">1 Bedroom</option>
                  <option value="2bed">2 Bedrooms</option>
                  <option value="3bed">3 Bedrooms</option>
                  <option value="larger">Larger (4+ bedrooms / commercial)</option>
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                  <input type="date" min={today} {...register('preferred_date')} className={inputCls(!!errors.preferred_date)} />
                  {errors.preferred_date && <p className="text-red-500 text-xs mt-1">{errors.preferred_date.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                  <select {...register('preferred_time')} className={inputCls()}>
                    <option value="morning">Morning (7am – 12pm)</option>
                    <option value="afternoon">Afternoon (12pm – 5pm)</option>
                  </select>
                </div>
              </div>
              <div className="bg-[#75AADB]/5 border border-[#75AADB]/20 rounded-xl p-4">
                <p className="text-sm text-gray-600">Estimated price: <span className="font-heading font-bold text-[#75AADB] text-lg">{formatPrice(price, watchedSize)}</span></p>
              </div>
              <button type="button" onClick={nextStep}
                className="w-full bg-[#75AADB] text-white font-heading font-semibold py-3.5 rounded-xl hover:bg-[#5a95cc] transition-colors">
                Next: Contact Details →
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial="hidden" animate="show" exit={{ opacity: 0 }} variants={fadeUp}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-5">
              <h2 className="font-heading font-bold text-xl text-gray-900">Contact Details</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input {...register('full_name')} className={inputCls(!!errors.full_name)} placeholder="Your full name" />
                {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                <input {...register('whatsapp')} className={inputCls(!!errors.whatsapp)} placeholder="+267 762 44947" />
                {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email (optional)</label>
                <input type="email" {...register('email')} className={inputCls()} placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address / Area in Gaborone</label>
                <input {...register('address')} className={inputCls(!!errors.address)} placeholder="e.g. Plot 123 Phakalane, or Block 8" />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions (optional)</label>
                <textarea {...register('special_instructions')} rows={3} className={inputCls()} placeholder="Pets, access codes, areas to focus on..." />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)}
                  className="flex-1 border border-gray-300 text-gray-700 font-heading font-semibold py-3.5 rounded-xl hover:bg-gray-50 transition-colors">
                  ← Back
                </button>
                <button type="button" onClick={nextStep}
                  className="flex-1 bg-[#75AADB] text-white font-heading font-semibold py-3.5 rounded-xl hover:bg-[#5a95cc] transition-colors">
                  Review Booking →
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" initial="hidden" animate="show" exit={{ opacity: 0 }} variants={fadeUp}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-5">
              <h2 className="font-heading font-bold text-xl text-gray-900">Confirm Your Booking</h2>
              <div className="space-y-0 divide-y divide-gray-100 text-sm">
                {([
                  ['Service', serviceLabels[watchedService]],
                  ['Property Size', sizeLabels[watchedSize]],
                  ['Date', watch('preferred_date')],
                  ['Time', watch('preferred_time') === 'morning' ? 'Morning (7am–12pm)' : 'Afternoon (12pm–5pm)'],
                  ['Name', watch('full_name')],
                  ['WhatsApp', watch('whatsapp')],
                  ['Address', watch('address')],
                ] as [string, string][]).map(([label, value]) => (
                  <div key={label} className="flex justify-between py-2.5">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-medium text-gray-900 text-right max-w-[60%]">{value}</span>
                  </div>
                ))}
              </div>
              <div className="bg-[#75AADB]/5 border border-[#75AADB]/20 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-500 mb-1">Estimated Price</p>
                <p className="font-heading font-extrabold text-3xl text-[#75AADB]">{formatPrice(price, watchedSize)}</p>
                {watchedService === 'office' && <p className="text-xs text-gray-400 mt-1">We will provide a custom quote after reviewing your space.</p>}
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(2)}
                  className="flex-1 border border-gray-300 text-gray-700 font-heading font-semibold py-3.5 rounded-xl hover:bg-gray-50 transition-colors">
                  ← Back
                </button>
                <button type="submit" disabled={loading}
                  className="flex-1 bg-[#75AADB] text-white font-heading font-semibold py-3.5 rounded-xl hover:bg-[#5a95cc] transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                  {loading ? <><Spinner /> Confirming...</> : 'Confirm Booking ✓'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  )
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-gray-400">Loading...</div>}>
      <BookingInner />
    </Suspense>
  )
}
