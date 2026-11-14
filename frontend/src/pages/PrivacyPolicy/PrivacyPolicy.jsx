import LegalPage from '../../sections/LegalPage';

const sections = [
    {
        id: 'introduction',
        title: '1. Introduction',
        content: [
            'NS SiteCraft Solutions ("we", "our", or "us") is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard information when you visit our website or engage our services.',
            'If you have any questions or concerns about this policy or our practices, please contact us at nssitecraftsolution@gmail.com.',
        ],
    },
    {
        id: 'information-collected',
        title: '2. Information We Collect',
        content: [
            'We collect information you voluntarily provide to us when you fill out our contact form, send us an email, or engage our services. This may include your name, email address, phone number, business name, and project details.',
            'When you visit our website, we may automatically collect certain technical information such as your browser type, IP address, pages viewed, and time spent on pages. This is done through standard web analytics tools.',
        ],
        list: [
            { label: 'Contact Information', detail: 'Name, email, phone number, business name' },
            { label: 'Project Details', detail: 'Information you share about your project requirements' },
            { label: 'Usage Data', detail: 'Pages visited, browser type, approximate location, device type' },
            { label: 'Communications', detail: 'Emails and messages you send us' },
        ],
    },
    {
        id: 'how-we-use',
        title: '3. How We Use Your Information',
        content: [
            'We use the information we collect to respond to your inquiries, provide and manage our services, send project-related communications, and improve our website and services.',
        ],
        list: [
            { label: 'Service Delivery', detail: 'To provide, maintain, and deliver agreed-upon services' },
            { label: 'Communication', detail: 'To respond to your inquiries and send project updates' },
            { label: 'Improvement', detail: 'To understand how visitors use our site and improve our offerings' },
            { label: 'Legal Compliance', detail: 'To comply with applicable laws and regulations' },
        ],
    },
    {
        id: 'sharing',
        title: '4. Sharing Your Information',
        content: [
            'We do not sell, trade, or rent your personal information to third parties. We may share information only in the following limited circumstances:',
        ],
        list: [
            { label: 'Service Providers', detail: 'Trusted tools (e.g., email, analytics) used to operate our business, bound by confidentiality' },
            { label: 'Legal Requirements', detail: 'If required by law or to protect our rights and property' },
            { label: 'Business Transfers', detail: 'In the event of a merger or acquisition (you will be notified)' },
        ],
    },
    {
        id: 'cookies',
        title: '5. Cookies & Analytics',
        content: [
            'Our website may use cookies or similar tracking technologies to enhance your browsing experience and analyse website traffic. Cookies are small data files stored on your device.',
            'We use analytics tools (such as Google Analytics or Vercel Analytics) to understand how visitors interact with our website. This data is aggregated and anonymised. You can disable cookies through your browser settings without affecting your ability to use our website.',
        ],
    },
    {
        id: 'data-security',
        title: '6. Data Security',
        content: [
            'We implement reasonable administrative, technical, and physical safeguards to protect your personal information from unauthorised access, disclosure, alteration, or destruction.',
            'However, no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee its absolute security.',
        ],
    },
    {
        id: 'data-retention',
        title: '7. Data Retention',
        content: [
            'We retain your personal information for as long as necessary to fulfil the purposes described in this policy, or as required by law. Client project data is retained for the duration of the project and for a reasonable period thereafter for support and reference purposes.',
            'You may request deletion of your personal information at any time by contacting us, subject to any legal obligations we may have to retain certain records.',
        ],
    },
    {
        id: 'your-rights',
        title: '8. Your Rights',
        content: [
            'Depending on your location, you may have the following rights regarding your personal information:',
        ],
        list: [
            { label: 'Access', detail: 'Request a copy of the personal information we hold about you' },
            { label: 'Correction', detail: 'Request correction of inaccurate or incomplete data' },
            { label: 'Deletion', detail: 'Request deletion of your personal information' },
            { label: 'Opt-out', detail: 'Opt out of any marketing communications at any time' },
        ],
    },
    {
        id: 'third-party',
        title: '9. Third-Party Links',
        content: [
            'Our website may contain links to third-party websites. We are not responsible for the privacy practices of those websites and encourage you to review their privacy policies.',
        ],
    },
    {
        id: 'changes',
        title: '10. Changes to This Policy',
        content: [
            'We may update this Privacy Policy from time to time. The updated version will be indicated by a revised effective date. We encourage you to review this policy periodically. Continued use of our services after changes are posted constitutes acceptance of the updated policy.',
        ],
    },
    {
        id: 'contact',
        title: '11. Contact Us',
        content: [
            'If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please reach out to us:',
        ],
        contact: true,
    },
];

const seo = {
  title: 'Privacy Policy',
  description:
    'How NS SiteCraft Solutions collects, uses and protects your personal information.',
  canonicalPath: '/privacy-policy',
  keywords: 'privacy policy, NS SiteCraft Solutions privacy, data protection, personal information',
};

const PrivacyPolicy = () => (
  <LegalPage
    seo={seo}
    title={
      <>
        Privacy <em>Policy</em>
      </>
    }
    lede="Your privacy matters to us. We are transparent about what we collect and why."
    effective="September 29, 2026"
    sections={sections}
    other={{ to: '/terms-and-conditions', label: 'Terms & Conditions', text: 'for our service agreement.' }}
  />
);

export default PrivacyPolicy;
