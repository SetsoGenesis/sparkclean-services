import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { bookingSchema } from '@/lib/schemas'
import { getEstimatedPrice, formatPrice, type ServiceType, type PropertySize } from '@/lib/pricing'

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const body = await req.json()
    const data = bookingSchema.parse(body)
    const price = getEstimatedPrice(data.service_type as ServiceType, data.property_size as PropertySize)

    const { error } = await supabase.from('bookings').insert({ ...data, estimated_price: price })
    if (error) throw error

    await resend.emails.send({
      from: 'SparkClean <noreply@sparkclean.co.bw>',
      to: process.env.OWNER_EMAIL!,
      subject: `New Booking: ${data.full_name} — ${data.service_type}`,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${data.full_name}</p>
        <p><strong>Service:</strong> ${data.service_type}</p>
        <p><strong>Property Size:</strong> ${data.property_size}</p>
        <p><strong>Date:</strong> ${data.preferred_date}</p>
        <p><strong>Time:</strong> ${data.preferred_time}</p>
        <p><strong>WhatsApp:</strong> ${data.whatsapp}</p>
        <p><strong>Email:</strong> ${data.email || 'Not provided'}</p>
        <p><strong>Address:</strong> ${data.address}</p>
        <p><strong>Special Instructions:</strong> ${data.special_instructions || 'None'}</p>
        <p><strong>Estimated Price:</strong> ${formatPrice(price, data.property_size as PropertySize)}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    const message = err instanceof Error ? err.message : 'Something went wrong'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
