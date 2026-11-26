# Owner checklist

Things only Nikhil can confirm or supply. Nothing on the site was invented: where
information is missing, the element stays hidden until it is filled in.
Most items are one line in `frontend/src/content/site.js`.

## 1. Fill in to switch on hidden trust elements

| What | Where | What appears |
|---|---|---|
| Udyam registration number | `business.udyam` | Shown in every footer next to "MSME Registered" |
| GSTIN (only if registered) | `business.gstin` | Footer and the contact block of the legal pages |
| WhatsApp number (e.g. `919390969461`) | `business.whatsapp` | Floating WhatsApp button on every page, plus a line on the contact page |
| Working hours | `business.hours` | Contact page |
| Client reviews, with permission | `testimonials` | "Client Voices" section on the homepage |
| Client names, with permission | `clients` | Client list in the same section |

## 2. Confirm these claims are true (already on the site)

- "MSME Registered" (homepage, footer, About) and "Est. 2024" (homepage).
- "Reply usually within 24 hours" (homepage contact section).
- The three projects on the homepage and the four on /projects are real work you can show.
- Support periods: Pricing says 3, 6 and 12 months by package. The homepage used to say
  "30 days of complimentary support", which contradicted it; it now says the period is
  stated in your proposal. Tell me which is right.
- "Dedicated project manager" and "Security audit" in the Advanced package.
- Privacy Policy section 8 says two-factor authentication is on for your email and hosting
  accounts. Please turn it on for Gmail, Vercel and GitHub if it is not, or tell me to remove the line.

## 3. Default business terms I chose (change any you disagree with)

| Term | Default | Where |
|---|---|---|
| Work pauses when a payment is overdue by | 15 days | Terms §4 |
| Project treated as on hold, milestone invoiced, after waiting on client for | 30 days | Terms §5 |
| Deliverable accepted if no problems reported within | 7 days | Terms §6 |
| Time to fix a serious breach before termination | 14 days | Terms §11 |
| Good-faith talks before going to court | 30 days, then Hyderabad courts | Terms §15 |
| Full refund of advance if cancelled within | 7 days and before work starts | Refund §2 |
| Maintenance plan cancellation notice | 30 days | Refund §6 |
| Refund confirmation / payout | 5 / 10 working days | Refund §7 |
| Unconverted enquiries deleted after | 12 months | Privacy §6 |
| Grievance response time | One month | Privacy §7, §13 |
| Grievance officer | Nikhil Sahani | `business.grievanceOfficer` |

The legal pages are a solid, India-specific starting point (DPDP Act 2023, IT Act 2000),
not legal advice. A one-time review by a lawyer is worth it before taking payments online.

## 4. Later

- Contact email on a custom domain (e.g. hello@yourdomain) looks more established than Gmail.
- Deploy the API (backend/) so production enquiries are stored and emailed by your own
  server instead of EmailJS. Then set `VITE_ENQUIRY_ENDPOINT` in Vercel.
- Real screenshots and links for the portfolio projects.
