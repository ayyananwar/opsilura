# Opsilura

Next.js App Router website with TypeScript, Tailwind CSS, Motion, Radix Accordion, Lucide icons, Zod validation, Brevo transactional email, and Upstash distributed rate limiting. Motion Primitives and Aceternity components are owned locally and styled for the brand.

## Local development

Run `npm install`, then `npm run dev`. Open http://localhost:3000.

If another local site owns the localhost address, use http://127.0.0.1:3000. The scripts use Webpack because Turbopack's CSS child process failed on this Windows environment.

`npm run typecheck`, `npm test`, and `npm run build` validate the project.

With the preview running and Playwright Chromium installed, `node tests/browser.mjs` checks interactions and `node tests/preview.mjs` checks screen widths and captures preview images.

## Contact delivery

Copy `.env.example` to `.env.local`. Set a Brevo API key, a Brevo-verified sender address, recipient address, and Upstash Redis REST URL/token. The form fails clearly without configuration; it never pretends to deliver. Production requires distributed rate limiting. On Vercel, set these variables for each intended environment, then redeploy. Do not use `NEXT_PUBLIC_` for credentials.

Visitor email is used as reply-to; it is never used as the sender. No visitor newsletter subscription or automatic acknowledgement is sent. Test a real delivery with production credentials before going live.

## Content and launch checks

Service content, phases and FAQs are in `src/lib/content.ts`. The homepage includes the attachment's five services, phase delivery, ownership, security, pricing models, India team, founder, founding program, FAQ, planning tools and one contact form. Repeated content is consolidated. Generic comparison claims, unverified testimonials, fake live project activity and unsupported popularity labels are omitted.

Before publication, the business must confirm the founding program, turnaround commitments, founder spelling, delivery/security commitments, legal identity and privacy retention/legal-basis details. Privacy and terms pages currently describe the implemented website flow and are not complete business legal documents. Add approved legal copy before publishing. Existing URL redirects should be mapped against the old site's actual routes before switching the domain. No WhatsApp, booking or LinkedIn links are invented.

Deploy to Vercel as a Next.js project. Set the domain only after content review and email delivery testing. This project does not include a CMS or fabricated client imagery.
