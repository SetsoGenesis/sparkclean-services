import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export const metadata: Metadata = {
  title: 'SparkClean Services | Professional Cleaning | Gaborone, Botswana',
  description: 'Gaborone\'s most trusted professional cleaning service. Residential, office, deep cleaning and Airbnb turnover. Starting from P250. Re a Gapa — We Deliver.',
  keywords: 'cleaning service Gaborone, house cleaning Botswana, office cleaning, deep cleaning, Airbnb cleaning',
  openGraph: {
    title: 'SparkClean Services | Gaborone, Botswana',
    description: 'Professional. Reliable. Affordable. Re a Gapa — We Deliver.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
