import { NextRequest, NextResponse } from 'next/server'

/**
 * Contact Form API Route
 * 
 * Handles contact form submissions with spam protection and validation
 * 
 * TODO: Integrate with email service (Resend, SendGrid, Nodemailer, etc.)
 * Current implementation logs submissions - update with real email service
 * 
 * Security Features:
 * - Honeypot field for spam protection
 * - Server-side validation
 * - Email format validation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message, honeypot } = body

    // Honeypot spam protection - bots will fill this hidden field
    if (honeypot) {
      // Silently accept spam submissions without processing
      return NextResponse.json(
        { success: true, message: 'Message sent successfully' },
        { status: 200 }
      )
    }

    // Server-side validation - Required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      )
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Log submission for development/testing
    // TODO: Remove console.log in production
    console.log('Contact form submission:', { name, email, message })

    /**
     * TODO: Integrate with email service
     * 
     * Recommended services:
     * - Resend (https://resend.com) - Simple and modern
     * - SendGrid (https://sendgrid.com) - Enterprise-grade
     * - Nodemailer with SMTP - Self-hosted option
     * 
     * Example with Resend:
     * 
     * import { Resend } from 'resend'
     * const resend = new Resend(process.env.RESEND_API_KEY)
     * 
     * await resend.emails.send({
     *   from: 'Portfolio Contact <contact@yourdomain.com>',
     *   to: 'your-email@example.com',
     *   replyTo: email,
     *   subject: `New contact from ${name}`,
     *   html: `
     *     <h2>New Contact Form Submission</h2>
     *     <p><strong>Name:</strong> ${name}</p>
     *     <p><strong>Email:</strong> ${email}</p>
     *     <p><strong>Message:</strong></p>
     *     <p>${message.replace(/\n/g, '<br>')}</p>
     *   `,
     * })
     */

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}

