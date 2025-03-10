import { render } from '@react-email/render';
import WelcomeTemplate from '@/emails';
import { Resend } from 'resend';
import { type NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { env } from '@/env';

const resend = new Resend(env.RESEND_API_KEY);
  
const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(2, '1 m'),
});

export async function POST(request: NextRequest, _response: NextResponse) {
  const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';

  const result = await ratelimit.limit(ip);

  if (!result.success) {
    return Response.json(
      {
        error: 'Too many requests!!',
      },
      {
        status: 429,
      },
    );
  }

  const { email, firstname } = await request.json();

  const { data, error } = await resend.emails.send({
    from: 'Aegis<mathewlewallen@cloudcontext.cc>',
    to: [email],
    subject: 'Thank you for joining the Aegis Waitlist!',
    replyTo: 'mathewlewallen@cloudcontext.cc',
    html: await render(WelcomeTemplate({ userFirstname: firstname })),
  });

  // const { data, error } = { data: true, error: null }

  if (error) {
    return NextResponse.json(error);
  }

  if (!data) {
    return NextResponse.json({ message: 'Failed to send email' });
  }

  return NextResponse.json({ message: 'Email sent successfully' });
}
