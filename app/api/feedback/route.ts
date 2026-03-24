import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { feedbackSchema } from '@/lib/schemas'

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const body = await req.json()
    const data = feedbackSchema.parse(body)

    const { error } = await supabase.from('feedback').insert({
      name: data.name || 'Anonymous',
      feedback_type: data.feedback_type,
      rating: data.rating,
      message: data.message,
      whatsapp: data.whatsapp,
    })
    if (error) throw error

    await resend.emails.send({
      from: 'SparkClean <noreply@sparkclean.co.bw>',
      to: process.env.OWNER_EMAIL!,
      subject: `New Feedback: ${data.feedback_type} from ${data.name || 'Anonymous'}`,
      html: `
        <h2>New Feedback Received</h2>
        <p><strong>From:</strong> ${data.name || 'Anonymous'}</p>
        <p><strong>Type:</strong> ${data.feedback_type}</p>
        ${data.rating ? `<p><strong>Rating:</strong> ${'⭐'.repeat(data.rating)}</p>` : ''}
        <p><strong>Message:</strong> ${data.message}</p>
        <p><strong>WhatsApp:</strong> ${data.whatsapp || 'Not provided'}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    const message = err instanceof Error ? err.message : 'Something went wrong'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  try {
    const { data, error } = await supabase
      .from('feedback')
      .select('id, name, rating, message, created_at')
      .eq('feedback_type', 'review')
      .eq('approved', true)
      .order('created_at', { ascending: false })
      .limit(12)

    if (error) throw error
    return NextResponse.json({ data })
  } catch {
    return NextResponse.json({ data: [] })
  }
}
