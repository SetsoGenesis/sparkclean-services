import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { callSchema } from '@/lib/schemas'

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const body = await req.json()
    const data = callSchema.parse(body)

    const { error } = await supabase.from('call_requests').insert(data)
    if (error) throw error

    await resend.emails.send({
      from: 'SparkClean <noreply@sparkclean.co.bw>',
      to: process.env.OWNER_EMAIL!,
      subject: `Call Request: ${data.full_name} — ${data.best_time}`,
      html: `
        <h2>New Call Request</h2>
        <p><strong>Name:</strong> ${data.full_name}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Best Time:</strong> ${data.best_time}</p>
        <p><strong>Topic:</strong> ${data.topic}</p>
        <p><strong>Message:</strong> ${data.message || 'None'}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    const message = err instanceof Error ? err.message : 'Something went wrong'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
