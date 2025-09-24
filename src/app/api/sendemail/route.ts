import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { prisma } from '../../../../lib/prisma';

export async function POST(req: Request) {
    try {
        const { email, name , referrer } = await req.json();
        console.log('📥 Incoming email:', email, name);

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }
        

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
    site:"BLW", // // ✅ include status here
    referrer, // // ✅ include status here
  },
});

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('❌ Email send error:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
