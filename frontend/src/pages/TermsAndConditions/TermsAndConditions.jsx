import LegalPage from '../../sections/LegalPage';
import { business, company } from '../../content/site';

/*
 * General terms for website visitors and clients. A signed proposal or
 * agreement for a specific project takes priority where the two differ.
 * Defaults chosen here (7-day review period, 15-day payment pause) are listed
 * in docs/project/OWNER-CHECKLIST.md for the owner to confirm.
 * Not legal advice: have a lawyer review before relying on it.
 */

const sections = [
  {
    id: 'about',
    title: '1. About these terms',
    content: [
      `These Terms and Conditions apply to your use of this website and to services provided by ${business.legalName} ("we", "us", "our"), based in ${company.location}. "You" means the visitor or the client engaging us.`,
      'Each project also has a written proposal, quote or agreement (the "Proposal") that sets out its scope, price, timeline and deliverables. If the Proposal and these terms differ, the Proposal applies for that project.',
      'By using this website or accepting a Proposal, you agree to these terms.',
    ],
  },
  {
    id: 'website-use',
    title: '2. Using this website',
    content: [
      'The content on this website is for general information. Prices shown are starting points, not offers; the price for your project is the one in your Proposal.',
      'You agree not to misuse the site, including by attempting to break its security, sending automated or abusive messages through its forms, or copying its design and content for commercial use without permission.',
    ],
  },
  {
    id: 'proposals',
    title: '3. Proposals and scope',
    content: [
      'Work starts only after you accept a Proposal in writing (email is enough) and pay any advance it requires. A Proposal is valid for the period stated on it.',
      'The scope is what the Proposal lists. Anything outside it, such as new pages, features or integrations, is a change request. We will tell you its effect on cost and timeline, and do it only after you agree in writing.',
    ],
  },
  {
    id: 'payments',
    title: '4. Payments and taxes',
    content: [
      'Payment is made in milestones as set out in the Proposal, typically an advance to begin and further payments as stages are delivered. Each payment is invoiced.',
    ],
    bullets: [
      'Invoices are due within the period stated on them.',
      'If a payment is more than 15 days overdue, we may pause work until it is cleared. Timelines move by the length of the pause.',
      'Prices exclude GST and other applicable taxes unless the Proposal says otherwise. Taxes are charged as required by law.',
      'Third-party costs, such as domain names, hosting, paid plugins, app store fees, SMS or email services and APIs, are paid by you directly or reimbursed at actual cost, unless the Proposal includes them.',
    ],
    after: ['Refunds and cancellations are covered by our Refund and Cancellation Policy.'],
  },
  {
    id: 'your-part',
    title: '5. Your part in the project',
    content: [
      'Good projects need timely input. You agree to provide the content, feedback, approvals and access the project needs, and to name one person who can make decisions.',
      'Delays in receiving content or feedback move the timeline by the same amount. If a project is on hold for more than 30 days because we are waiting on you, we may treat the current milestone as complete and invoice it, and schedule the remaining work when you are ready.',
      'You confirm that any content you give us (text, images, logos, data) is yours to use or properly licensed, and that its use in the project will not break any law or anyone else\'s rights.',
    ],
  },
  {
    id: 'reviews',
    title: '6. Reviews, revisions and acceptance',
    content: [
      'We share work for review at the stages set out in the Proposal. Each stage includes the rounds of revisions stated in the Proposal; further rounds are treated as change requests.',
      'A deliverable is accepted when you approve it, start using it live, or do not report problems within 7 days of delivery, whichever comes first. Problems reported after acceptance are handled under section 10.',
    ],
  },
  {
    id: 'ownership',
    title: '7. Ownership and intellectual property',
    content: [
      'When the project is paid in full, you own the custom code, designs and content we created specifically for you. Until then, we keep ownership and you have a licence to review it.',
      'We keep ownership of our general tools, methods, reusable components and know-how that existed before your project or are not specific to it. You get a permanent, free licence to use any of these that are part of your deliverables.',
      'Open-source libraries and third-party products in your project remain under their own licences. We choose ones whose licences allow your intended use and tell you about any with notable conditions.',
      'Domains, hosting and other accounts for your project are set up in your name, or transferred to you at handover.',
    ],
  },
  {
    id: 'portfolio-confidentiality',
    title: '8. Confidentiality and portfolio',
    content: [
      'We keep confidential any non-public information you share with us, including business plans, data, code and credentials, and use it only for your project. You keep our pricing and proposals confidential in the same way. This does not apply to information that is already public, independently developed, or that the law requires to be disclosed.',
      'With your permission, we may show the finished project, its name and a short description in our portfolio. We never show confidential information, and you can say no at any time.',
    ],
  },
  {
    id: 'third-party',
    title: '9. Hosting and third-party services',
    content: [
      'Projects often rely on services we do not control, such as hosting providers, payment gateways, app stores, email services and external APIs. We are not responsible for their outages, price changes, policy changes or rejection decisions, though we will help you respond to them.',
    ],
  },
  {
    id: 'support',
    title: '10. Warranty and support',
    content: [
      'We build carefully and test before launch. During the support period stated in the Proposal, we fix defects in the work we delivered, at no extra cost.',
      'Support does not cover new features, changes made by anyone else, problems caused by third-party services, or updates needed because of changes in browsers, operating systems or external platforms after launch. These can be covered by a separate maintenance arrangement.',
      'Except as stated in these terms and the Proposal, the work is provided without other guarantees, including guarantees of specific search rankings, traffic or sales.',
    ],
  },
  {
    id: 'ending',
    title: '11. Ending a project',
    content: [
      'Either party can end a project by written notice if the other seriously breaks these terms or the Proposal and does not fix it within 14 days of being told.',
      'You can also end a project for any reason by written notice. In either case, you pay for work completed up to the end date, we hand over the work you have paid for, and our Refund and Cancellation Policy applies to any advance.',
    ],
  },
  {
    id: 'liability',
    title: '12. Limitation of liability',
    content: [
      'We are not liable for indirect or consequential losses, such as loss of profit, revenue, data or business opportunity.',
      'Our total liability for any claim relating to a project is limited to the amount you paid us for that project. Nothing in these terms limits liability that cannot be limited under Indian law, such as liability for fraud.',
      'You are responsible for keeping your own backups of content and data, and for how you use the delivered work.',
    ],
  },
  {
    id: 'indemnity',
    title: '13. Indemnity',
    content: [
      'You agree to cover our reasonable costs if a third party makes a claim against us because of content or instructions you provided, or because of how you use the delivered work.',
    ],
  },
  {
    id: 'force-majeure',
    title: '14. Events beyond control',
    content: [
      'Neither party is responsible for delays caused by events outside reasonable control, such as natural disasters, epidemics, government action, widespread internet or power outages. The affected party will inform the other promptly, and timelines move accordingly.',
    ],
  },
  {
    id: 'law',
    title: '15. Governing law and disputes',
    content: [
      'These terms are governed by the laws of India. If a dispute arises, we will first try to resolve it by talking in good faith for at least 30 days. If it is not resolved, the courts in Hyderabad, Telangana have exclusive jurisdiction.',
    ],
  },
  {
    id: 'changes',
    title: '16. Changes to these terms',
    content: [
      'We may update these terms and will change the "Last updated" date when we do. Changes do not affect a Proposal you have already accepted, unless we both agree in writing.',
    ],
  },
  {
    id: 'contact',
    title: '17. Contact',
    content: ['Questions about these terms are welcome:'],
    contact: true,
  },
];

const summary = [
  'Every project starts with a written scope and fixed price that you approve.',
  'Changes outside the scope are quoted and agreed in writing before we do them.',
  'Once paid in full, you own the code, designs and content made for you.',
  'We keep your information confidential and fix defects during the support period.',
];

const seo = {
  title: 'Terms and Conditions',
  description: `The terms that apply when you use this website or work with ${company.name}: scope, payments, ownership, support and more.`,
  canonicalPath: '/terms-and-conditions',
  keywords: 'terms and conditions, NS SiteCraft Solutions terms, web development terms, service agreement India',
};

const TermsAndConditions = () => (
  <LegalPage
    seo={seo}
    title={
      <>
        Terms &amp; <em>Conditions</em>
      </>
    }
    lede="The ground rules for working together, written to be read, not skimmed past."
    summary={summary}
    sections={sections}
    related={[
      { to: '/privacy-policy', label: 'Privacy Policy' },
      { to: '/refund-policy', label: 'Refund and Cancellation Policy' },
    ]}
  />
);

export default TermsAndConditions;
