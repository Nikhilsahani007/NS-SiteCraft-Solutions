import LegalPage from '../../sections/LegalPage';
import { business, company } from '../../content/site';

/*
 * Written for a sole-proprietor studio in India, with the Digital Personal Data
 * Protection Act 2023 and the IT Act 2000 / SPDI Rules 2011 in mind.
 * It describes what the site actually does today. If you add analytics,
 * a chat widget or a newsletter, update sections 2, 4 and 6.
 * Not legal advice: have a lawyer review before relying on it.
 */

const sections = [
  {
    id: 'who-we-are',
    title: '1. Who we are',
    content: [
      `This Privacy Policy explains how ${business.legalName} ("we", "us", "our"), a software and web development studio based in ${company.location}, collects, uses, shares and protects personal data when you visit this website, contact us, or work with us.`,
      'For personal data you give us about yourself, we decide why and how it is used, so we are responsible for it (a "Data Fiduciary" under the Digital Personal Data Protection Act, 2023). When we build or run a system that holds your customers\' or students\' data, we handle that data only on your instructions; section 9 covers that case.',
    ],
  },
  {
    id: 'what-we-collect',
    title: '2. What we collect',
    content: ['We collect only what we need to answer you and deliver our work.'],
    list: [
      {
        label: 'Enquiry form',
        detail: 'Your name, email address, the type of project and the message you write.',
      },
      {
        label: 'Direct contact',
        detail: 'Whatever you choose to share when you email, call or message us, such as your phone number, organisation and project details.',
      },
      {
        label: 'Client projects',
        detail: 'Billing details (name, address, GSTIN if any), project content, and access you give us to accounts such as domains, hosting or app stores.',
      },
      {
        label: 'Technical data',
        detail: 'Our hosting provider automatically records basic request data, such as IP address, browser type and the page requested, to deliver the site and protect it from abuse.',
      },
    ],
    after: [
      'We do not knowingly collect sensitive personal data such as financial account passwords, health records or biometric information through this website. Please do not send it through the enquiry form.',
    ],
  },
  {
    id: 'how-we-use',
    title: '3. How we use it',
    content: ['We use personal data only for these purposes:'],
    bullets: [
      'To reply to your enquiry and prepare a proposal or quote.',
      'To plan, build, deliver and support the project you engage us for.',
      'To send invoices, keep accounts and meet tax and legal obligations.',
      'To keep this website secure and working properly.',
    ],
    after: [
      'We do not sell or rent personal data, we do not use it for advertising, and we do not add you to a mailing list unless you ask us to.',
      'We rely on your consent when you contact us, and on legitimate uses permitted by law for things like invoicing and meeting legal requirements. You can withdraw consent at any time (see section 7). Withdrawal does not affect anything already done lawfully before it.',
    ],
  },
  {
    id: 'cookies',
    title: '4. Cookies and tracking',
    content: [
      'This website does not set advertising or analytics cookies, and does not track you across other websites.',
      'Text on this site uses fonts loaded from Google Fonts, which means your browser requests them from Google\'s servers and Google receives your IP address. If we add analytics in the future, we will update this policy first and ask for your consent where the law requires it.',
    ],
  },
  {
    id: 'sharing',
    title: '5. Who we share it with',
    content: [
      'We share personal data only with service providers we need to run the studio, and only as much as they need. They process it on our behalf and under their own security and privacy terms.',
    ],
    list: [
      { label: 'Website hosting', detail: 'Vercel Inc. hosts this website and processes the technical data described above.' },
      { label: 'Form delivery', detail: 'EmailJS delivers messages from the enquiry form to our inbox.' },
      { label: 'Email', detail: 'Google (Gmail) hosts our email account.' },
      { label: 'Project tools', detail: 'Hosting, code repository and payment services agreed with you for your project.' },
      { label: 'Legal requests', detail: 'Government or law-enforcement bodies, when Indian law requires us to disclose information.' },
    ],
    after: [
      'Some of these providers store data on servers outside India. Where data is transferred abroad, we do so only as permitted under Indian law.',
    ],
  },
  {
    id: 'retention',
    title: '6. How long we keep it',
    content: ['We keep personal data only as long as we need it:'],
    bullets: [
      'Enquiries that do not lead to a project: deleted within 12 months of our last contact.',
      'Client project records and correspondence: for the length of the project and support period, and then as long as needed to handle questions about the work.',
      'Invoices and accounting records: for the period required by Indian tax and accounting law.',
      'Access credentials you give us for a project: removed or handed back at the end of the project.',
    ],
  },
  {
    id: 'your-rights',
    title: '7. Your rights',
    content: ['Under Indian data protection law you can ask us to:'],
    list: [
      { label: 'Access', detail: 'Tell you what personal data we hold about you and how we use it.' },
      { label: 'Correct', detail: 'Correct or complete data that is inaccurate or out of date.' },
      { label: 'Erase', detail: 'Delete your data when it is no longer needed, unless the law requires us to keep it.' },
      { label: 'Withdraw consent', detail: 'Stop using data that we hold on the basis of your consent.' },
      { label: 'Nominate', detail: 'Name a person who can exercise these rights for you in case of death or incapacity.' },
      { label: 'Complain', detail: 'Raise a grievance with us, and if unresolved, with the Data Protection Board of India.' },
    ],
    after: [
      'To make a request, email us from the address you used with us, or tell us how we can confirm it is you. We respond within one month.',
    ],
  },
  {
    id: 'security',
    title: '8. How we protect it',
    content: [
      'We use reasonable security practices for a studio of our size: encrypted connections (HTTPS) on this site, two-factor authentication on our email and hosting accounts, access limited to the people who need it, and removal of project access when it is no longer needed.',
      'No system is perfectly secure. If a breach affects your personal data, we will inform you and the authorities as Indian law requires.',
    ],
  },
  {
    id: 'client-data',
    title: '9. Data in systems we build for you',
    content: [
      'When we build or maintain a website, app or system that collects personal data from your users, you decide what is collected and why. We access that data only as needed to build, test, fix or support the system, follow your written instructions, keep it confidential, and do not use it for any other purpose.',
      'You are responsible for having a privacy notice and a lawful basis for that data. We can help you prepare one as part of the project.',
    ],
  },
  {
    id: 'children',
    title: '10. Children',
    content: [
      'This website and our services are meant for businesses and adults. We do not knowingly collect personal data from anyone under 18. If you believe a child has sent us their data, contact us and we will delete it.',
    ],
  },
  {
    id: 'third-party-links',
    title: '11. Links to other websites',
    content: [
      'This site may link to other websites, including projects we have built. Their owners are responsible for their privacy practices, and this policy does not apply to them.',
    ],
  },
  {
    id: 'changes',
    title: '12. Changes to this policy',
    content: [
      'We will update this policy when our practices change, and change the "Last updated" date at the top. If a change materially affects how we use data you have already given us, we will tell you directly.',
    ],
  },
  {
    id: 'contact',
    title: '13. Contact and grievance officer',
    content: [
      'For any question, request or complaint about your personal data, contact our grievance officer. We acknowledge complaints promptly and resolve them within one month.',
    ],
    contact: true,
  },
];

const summary = [
  'We collect only what you send us, plus basic technical data our host records.',
  'We use it to reply to you, deliver your project and keep accounts. Nothing else.',
  'No advertising, no tracking cookies, no selling or renting your data.',
  'You can ask to see, correct or delete your data at any time.',
];

const seo = {
  title: 'Privacy Policy',
  description: `How ${company.name} collects, uses and protects personal data, and the rights you have over it.`,
  canonicalPath: '/privacy-policy',
  keywords: 'privacy policy, NS SiteCraft Solutions privacy, DPDP Act, data protection, personal data',
};

const PrivacyPolicy = () => (
  <LegalPage
    seo={seo}
    title={
      <>
        Privacy <em>Policy</em>
      </>
    }
    lede="What we collect, why we collect it, and the control you have over it, in plain language."
    summary={summary}
    sections={sections}
    related={[
      { to: '/terms-and-conditions', label: 'Terms and Conditions' },
      { to: '/refund-policy', label: 'Refund and Cancellation Policy' },
    ]}
  />
);

export default PrivacyPolicy;
