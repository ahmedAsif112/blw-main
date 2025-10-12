import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Stripe from 'stripe';
import { prisma } from '../../../../lib/prisma';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { sessionId, referrer } = await req.json();
    console.log('📥 Incoming session ID:', sessionId);

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    // Retrieve the Stripe checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log('✅ Stripe session retrieved:', session.id);

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 400 });
    }

    // Extract email from metadata or customer details
    const email = session.metadata?.email || session.customer_details?.email;

    if (!email) {
      return NextResponse.json({ error: 'Email not found in session' }, { status: 400 });
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });


    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Baby-Led Weaning Meal Plan + 6 Premium BLW Books',
      html: `<p>Hi, hope you are doing well<br /><br/></p>

<div>
We’re excited to share your customised <strong>Baby-Led Weaning Meal-Plan</strong> along with 
<strong>6 Premium BLW Books</strong> to support your baby’s healthy eating journey.  
<br /><br/>
You can download them here:
</div>

<p>
  <a href="https://drive.google.com/drive/folders/1A_97bElAj7rubdg06UYPl-Y3jYjibFsn?usp=sharing" target="_blank">
    📥 Download Meal Plan & Books
  </a>
</p>

<br /><br />

<div>
Best regards,<br/>
<strong>Baby-Led Weaning Support Team</strong>
</div>
`,

    });

    // Log in DB
    await prisma.emailLog.create({
      data: {
        email,
        status: 'Delivered',
        site: "BLW", // // ✅ include status here
        referrer, // // ✅ include status here
      },
    });

    console.log('✅ Email log created in database');

    return NextResponse.json({
      success: true,
      email,
      message: 'Email sent successfully'
    });

  } catch (error: any) {
    console.error('❌ Error:', error);

    // Handle specific Stripe errors
    if (error.type === 'StripeInvalidRequestError') {
      return NextResponse.json(
        { error: 'Invalid session ID or session not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to send email', details: error.message },
      { status: 500 }
    );
  }
}