import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { contactSchema, emailContent } from '@/lib/contact';
export const runtime='nodejs';
const limiter=process.env.UPSTASH_REDIS_REST_URL&&process.env.UPSTASH_REDIS_REST_TOKEN?new Ratelimit({redis:Redis.fromEnv(),limiter:Ratelimit.slidingWindow(5,'10 m'),prefix:'opsilura:contact'}):null;
export async function POST(request:NextRequest){
 const origin=request.headers.get('origin');
 let sameOrigin=false;try{const url=new URL(origin||'');sameOrigin=url.host===request.headers.get('host')&&url.protocol===request.nextUrl.protocol;}catch{}
 if(!sameOrigin)return NextResponse.json({error:'Please submit using the website contact form.'},{status:403});
 if(!request.headers.get('content-type')?.startsWith('application/json'))return NextResponse.json({error:'Invalid request format.'},{status:415});
 if(Number(request.headers.get('content-length')||0)>20000)return NextResponse.json({error:'Your message is too long.'},{status:413});
 let raw:unknown;try{const body=await request.text();if(body.length>20000)return NextResponse.json({error:'Your message is too long.'},{status:413});raw=JSON.parse(body);}catch{return NextResponse.json({error:'Please check your message and try again.'},{status:400});}
 const parsed=contactSchema.safeParse(raw);if(!parsed.success)return NextResponse.json({error:'Please provide your name, a valid email, and a message of at least 10 characters.'},{status:400});
 if(parsed.data.website)return NextResponse.json({error:'Unable to submit this enquiry.'},{status:400});
 const apiKey=process.env.BREVO_API_KEY;const sender=process.env.BREVO_SENDER_EMAIL;
 if(!apiKey||!sender||(process.env.NODE_ENV==='production'&&!limiter))return NextResponse.json({error:'The form is temporarily unavailable. Please email admin@opsilura.com.'},{status:503});
 try{
  if(limiter){const ip=request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim()||request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'unknown';const result=await limiter.limit(ip);if(!result.success)return NextResponse.json({error:'Please wait a few minutes before sending another enquiry.'},{status:429,headers:{'Retry-After':String(Math.max(1,Math.ceil((result.reset-Date.now())/1000)))}});}
  const result=await fetch('https://api.brevo.com/v3/smtp/email',{method:'POST',headers:{'api-key':apiKey,'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({sender:{email:sender,name:process.env.BREVO_SENDER_NAME||'Opsilura'},to:[{email:process.env.CONTACT_TO_EMAIL||'admin@opsilura.com'}],replyTo:{email:parsed.data.email,name:parsed.data.name},subject:'New website enquiry — Opsilura',...emailContent(parsed.data)}),signal:AbortSignal.timeout(15000)});
  if(!result.ok)return NextResponse.json({error:'We couldn’t send your enquiry. Please try again or email admin@opsilura.com.'},{status:502});
  return NextResponse.json({success:true});
 }catch{return NextResponse.json({error:'We couldn’t send your enquiry. Please try again or email admin@opsilura.com.'},{status:502});}
}
