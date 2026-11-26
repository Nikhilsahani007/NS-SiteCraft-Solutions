import LegalPage from '../../sections/LegalPage';
import { business, company } from '../../content/site';

/*
 * Refund and cancellation terms. Payment gateways in India (Razorpay, PayU,
 * Cashfree and others) ask for a public page like this before going live.
 * The time periods are defaults listed in docs/project/OWNER-CHECKLIST.md
 * for the owner to confirm. Not legal advice.
 */

const sections = [
  {
    id: 'scope',
    title: '1. What this policy covers',
    content: [
      `This policy explains what happens to payments when a project with ${business.legalName} is cancelled, and when refunds are given. If your Proposal states different terms, the Proposal applies.`,
      'Because our work is custom, made to order and time-based, refunds depend on how much work has been done when a project ends.',
    ],
  },
  {
    id: 'before-start',
    title: '2. Cancelling before work starts',
    content: [
      'If you cancel within 7 days of paying the advance and before the kickoff meeting or any work has started, we refund the advance in full, less any non-recoverable bank or payment gateway charges.',
    ],
  },
  {
    id: 'after-start',
    title: '3. Cancelling after work starts',
    content: ['Once work has started:'],
    bullets: [
      'Payments for milestones already delivered are not refundable.',
      'For the milestone in progress, we charge for the work done so far, in proportion to that milestone\'s value, and refund any balance of what you have paid.',
      'We hand over all work you have paid for, in its current state.',
    ],
  },
  {
    id: 'our-side',
    title: '4. If we cannot deliver',
    content: [
      'If we cancel a project, or cannot deliver what the Proposal promises for reasons within our control, we refund all payments for milestones not yet delivered.',
    ],
  },
  {
    id: 'not-refundable',
    title: '5. What is not refundable',
    content: [],
    bullets: [
      'Third-party costs paid on your behalf, such as domains, hosting, licences, app store fees and paid plugins.',
      'Change requests that have been delivered.',
      'Support or maintenance periods that have already started.',
    ],
  },
  {
    id: 'maintenance',
    title: '6. Maintenance plans',
    content: [
      'Ongoing maintenance or support plans can be cancelled with 30 days\' written notice. The current paid period is not refunded, and no further charges are made after the notice period ends.',
    ],
  },
  {
    id: 'how',
    title: '7. How to request a refund',
    content: [
      `Email ${company.email} with your name, the project, and the reason. We confirm the amount within 5 working days. Approved refunds are paid to the original payment method, or by bank transfer, within 10 working days of confirmation.`,
    ],
  },
  {
    id: 'disputes',
    title: '8. Questions and disputes',
    content: [
      'If you disagree with a refund decision, write to us and we will review it with you. Disputes that cannot be resolved are handled as described in our Terms and Conditions.',
    ],
    contact: true,
  },
];

const summary = [
  'Cancel within 7 days and before work starts: full refund of the advance.',
  'After work starts: you pay only for work done, and get the work you paid for.',
  'If we cannot deliver, you get back what you paid for undelivered milestones.',
  'Refunds are paid within 10 working days of confirmation.',
];

const seo = {
  title: 'Refund and Cancellation Policy',
  description: `How cancellations and refunds work for projects with ${company.name}.`,
  canonicalPath: '/refund-policy',
  keywords: 'refund policy, cancellation policy, NS SiteCraft Solutions refunds',
};

const RefundPolicy = () => (
  <LegalPage
    seo={seo}
    title={
      <>
        Refund &amp; <em>Cancellation</em>
      </>
    }
    lede="Fair to both sides: you pay for work done, and nothing more."
    summary={summary}
    sections={sections}
    related={[
      { to: '/terms-and-conditions', label: 'Terms and Conditions' },
      { to: '/privacy-policy', label: 'Privacy Policy' },
    ]}
  />
);

export default RefundPolicy;
