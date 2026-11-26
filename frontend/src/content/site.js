/**
 * Site content. Every claim here must be true and owner-approved.
 * Do not add statistics, client names, testimonials or outcomes without
 * a matching entry in docs/project/DECISION-LOG.md.
 */

export const company = {
  name: 'NS SiteCraft Solutions',
  location: 'Hyderabad, Telangana, India',
  email: 'nssitecraftsolution@gmail.com',
  phone: '+91 93909 69461',
  phoneHref: 'tel:+919390969461',
};

export const hero = {
  eyebrow: 'Technology studio · Hyderabad',
  headline: ['We design and build', 'websites, apps and', 'custom software.'],
  accentLine: 1, // index of the line set in the editorial serif
  sub: 'NS SiteCraft Solutions works with schools, startups, healthcare providers, retailers and growing businesses. Clear scope, steady communication, and work you can inspect at every stage.',
  primaryCta: { label: 'Start a project', target: 'contact' },
  secondaryCta: { label: 'See how we work', target: 'process' },
  layers: ['Experience', 'Interface', 'Application', 'Data', 'Infrastructure'],
};

export const statement =
  'Good software is built the way good buildings are. A clear plan, sound structure, careful finishing, and nothing hidden behind the walls.';

export const services = [
  {
    title: 'Business websites',
    summary: 'Fast, clear websites that explain what you do and make it easy to get in touch.',
    items: ['Company and institution sites', 'Landing pages', 'Redesigns', 'SEO foundations'],
    fit: 'Schools, clinics, shops and companies that need a credible first impression online.',
  },
  {
    title: 'Web applications',
    summary: 'Browser-based tools shaped around how your team actually works.',
    items: ['Dashboards and portals', 'Management systems', 'Role-based access', 'API development'],
    fit: 'Teams replacing spreadsheets, paper registers or tools that do not talk to each other.',
  },
  {
    title: 'Mobile applications',
    summary: 'Apps for the people you serve, designed for small screens from the first sketch.',
    items: ['Customer-facing apps', 'Internal tools', 'Backend and API', 'Store submission support'],
    fit: 'Organisations whose customers, students or staff mostly reach them by phone.',
  },
  {
    title: 'E-commerce platforms',
    summary: 'Online stores with a catalogue, cart and checkout that customers can trust.',
    items: ['Storefront design', 'Catalogue and inventory', 'Payments integration', 'Order management'],
    fit: 'Retailers and brands starting to sell online, or outgrowing a marketplace listing.',
  },
  {
    title: 'Custom software',
    summary: 'Systems built for a process that off-the-shelf products do not fit.',
    items: ['Workflow automation', 'Data and reporting', 'Integrations', 'Legacy replacement'],
    fit: 'Institutions and businesses with a process that nothing off the shelf handles well.',
  },
  {
    title: 'AI integrations',
    summary: 'Practical AI features added where they save time or answer real questions.',
    items: ['Assistants and chat', 'Search and recommendations', 'Document processing', 'Workflow automation'],
    fit: 'Teams that answer the same questions or handle the same documents every day.',
  },
];

export const capabilities = [
  {
    area: 'Frontend',
    text: 'Responsive, accessible interfaces with attention to loading speed and detail.',
    stack: ['React', 'Next.js', 'JavaScript', 'HTML5', 'CSS3'],
  },
  {
    area: 'Backend',
    text: 'APIs and services with validation, authentication and sensible structure.',
    stack: ['Node.js', 'Express', 'Java'],
  },
  {
    area: 'Data',
    text: 'Data models designed around what you need to store, find and report on.',
    stack: ['MongoDB'],
  },
  {
    area: 'Delivery',
    text: 'Deployment, performance and search foundations handled as part of the build.',
    stack: ['Vercel', 'SEO', 'Performance', 'Accessibility'],
  },
];

export const industries = [
  {
    name: 'Education',
    text: 'Schools, colleges and coaching institutes that need admissions, notices and results online.',
  },
  {
    name: 'Startups',
    text: 'Founders who need a landing page, an MVP or a first web app built on a sound base.',
  },
  {
    name: 'Healthcare',
    text: 'Clinics and providers who need clear information and simple ways for patients to reach them.',
  },
  {
    name: 'Retail',
    text: 'Shops and brands moving their catalogue and orders online.',
  },
];

export const process = [
  {
    title: 'Discover',
    text: 'A focused conversation about your goals, audience, constraints and timeline.',
  },
  {
    title: 'Scope and proposal',
    text: 'A written scope and quote, so you know what will be built and what it costs before work begins.',
  },
  {
    title: 'Design',
    text: 'Structure and visual direction first. Nothing moves forward until you are confident in it.',
  },
  {
    title: 'Build',
    text: 'Development in visible steps, with regular updates and working previews along the way.',
  },
  {
    title: 'Test',
    text: 'Checks across devices and browsers, plus performance and accessibility, before anything goes live.',
  },
  {
    title: 'Launch and handover',
    text: 'Deployment, a walkthrough of what was built, and the code, accounts and assets handed to you.',
  },
];

export const founder = {
  name: 'Nikhil Sahani',
  role: 'Founder · Full Stack Developer (MERN & Java)',
  quote:
    "I started NS SiteCraft so schools and small businesses can get a website as good as a big company's.",
  points: [
    'You work directly with the person building your product.',
    'Plain language instead of jargon, and written scope instead of guesswork.',
    'MSME registered and based in Hyderabad, working with clients across India.',
  ],
};

export const reviews = {
  title: "We're collecting our first reviews.",
  text: 'Have we built something for you? A short review helps other schools and businesses decide. Until real reviews are in, this space stays empty on purpose.',
};

export const projectTypes = [
  { value: 'website', label: 'Business website' },
  { value: 'webapp', label: 'Web application' },
  { value: 'mobile', label: 'Mobile application' },
  { value: 'ecommerce', label: 'E-commerce platform' },
  { value: 'software', label: 'Custom software' },
  { value: 'ai', label: 'AI integration' },
  { value: 'other', label: 'Something else' },
];

/* ── Inner pages ── */

export const about = {
  story: [
    'NS SiteCraft Solutions is a software studio based in Hyderabad. We are MSME registered and focused on custom websites and software for schools, colleges and businesses.',
    'We do not work from templates and we do not take shortcuts. We build software that fits the way you work, not the other way around.',
  ],
  mission:
    'Build software that solves real problems. Make technology accessible without compromising on quality. Help businesses and institutions run more efficiently.',
  values: [
    { name: 'Custom-built', text: 'Every project is built for your needs. No templates.' },
    { name: 'Clarity', text: 'Transparent communication and clear roadmaps. No surprises.' },
    { name: 'Scalability', text: 'Systems that grow with you, not against you.' },
    { name: 'Long-term', text: 'We build for the years after launch, not just for launch day.' },
  ],
};

export const solutions = [
  {
    id: 'business',
    audience: 'For businesses',
    title: ['Everyday problems,', 'practical software.'],
    rows: [
      {
        problem: 'Manual data entry and paperwork',
        answer: 'Custom software that collects, processes and reports on your data in one place.',
      },
      {
        problem: 'No professional online presence',
        answer: 'A modern website with search foundations and a clear way for customers to enquire.',
      },
      {
        problem: 'Slow replies to customer questions',
        answer: 'A chat assistant and automated replies that handle common questions at any hour.',
      },
      {
        problem: 'No clear view of business numbers',
        answer: 'Dashboards that bring the figures you track into one up-to-date screen.',
      },
    ],
  },
  {
    id: 'education',
    audience: 'For schools and colleges',
    title: ['Less paperwork,', 'more time to teach.'],
    rows: [
      { problem: 'Manual attendance tracking', answer: 'A digital attendance system with automatic reports.' },
      { problem: 'Complex fee management', answer: 'Fee collection and receipt generation in one system.' },
      {
        problem: 'Scattered student information',
        answer: 'A central student database with access by role.',
      },
      {
        problem: 'Time-consuming exam processing',
        answer: 'Exam scheduling, grading and result publication handled by software.',
      },
      {
        problem: 'Slow parent and teacher communication',
        answer: 'A mobile app for quick updates and two-way messages.',
      },
      {
        problem: 'Library records kept by hand',
        answer: 'A digital library system with book tracking and reservations.',
      },
    ],
  },
];

// Starting prices as published by the owner. Confirm before changing (DECISION-LOG D5).
export const pricing = {
  note: 'Final pricing depends on project requirements. These are starting ranges.',
  packages: [
    {
      name: 'Basic',
      price: '₹25,000',
      audience: 'For small businesses and startups',
      features: [
        'Responsive website (up to 5 pages)',
        'Basic SEO optimization',
        'Contact form integration',
        'Mobile-friendly design',
        '3 months support',
        'Basic analytics setup',
      ],
    },
    {
      name: 'Standard',
      price: '₹75,000',
      audience: 'For growing businesses and institutions',
      features: [
        'Custom web application',
        'Advanced SEO and performance',
        'CMS integration',
        'API development',
        '6 months support',
        'Advanced analytics',
        'Database integration',
        'User authentication',
      ],
    },
    {
      name: 'Advanced',
      price: '₹1,50,000',
      audience: 'For complex, enterprise-grade needs',
      features: [
        'Full-stack custom software',
        'AI/ML integration',
        'Multi-platform deployment',
        'Advanced automation',
        '12 months support',
        'Dedicated project manager',
        'Custom integrations',
        'Scalable architecture',
        'Security audit',
      ],
    },
  ],
};

export const afterEnquiry = [
  { title: 'We read your brief', text: 'Your message goes to the person who would build the project, and we reply by email.' },
  { title: 'A short conversation', text: 'We talk through goals, audience and timeline, and ask the questions a good plan needs.' },
  { title: 'Written scope and quote', text: 'You receive what will be built and what it costs, in writing, before any work begins.' },
];

/* ── Trust and business details ──
 * Fields left as '' (or empty arrays) render nothing on the site. Fill them in
 * only with true, checkable information. See docs/project/OWNER-CHECKLIST.md.
 */

export const business = {
  // Name as it appears on your Udyam certificate or bank account.
  legalName: 'NS SiteCraft Solutions',
  founder: 'Nikhil Sahani',
  // Udyam Registration Number, e.g. 'UDYAM-TS-00-0000000'. Shown in the footer when filled.
  udyam: '',
  // GSTIN, only if registered. Shown in the footer and legal pages when filled.
  gstin: '',
  // Working hours shown on the contact page, e.g. 'Monday to Saturday, 10 AM to 7 PM IST'.
  hours: '',
  // WhatsApp number with country code and no symbols, e.g. '919390969461'.
  // When filled, a WhatsApp button appears on every page.
  whatsapp: '',
  // Person who handles privacy and legal requests (required by Indian IT Rules).
  grievanceOfficer: 'Nikhil Sahani',
  // Date the legal pages were last revised. Update when you change them.
  legalUpdated: '26 November 2026',
};

/** What a client can rely on. Each line restates a policy already in the Terms or FAQ. */
export const commitments = [
  {
    title: 'Written scope, fixed quote',
    text: 'You get a written scope and a fixed price before any work starts. If the scope changes, we agree the change in writing first.',
  },
  {
    title: 'You own what you pay for',
    text: 'After final payment, the code, designs, content and accounts made for your project are yours. No lock-in.',
  },
  {
    title: 'Progress you can see',
    text: 'Regular updates and working previews during the build, so nothing is a surprise at the end.',
  },
  {
    title: 'Direct line to the builder',
    text: 'You talk to the person designing and writing your software, not a chain of account managers.',
  },
  {
    title: 'Your information stays private',
    text: 'Business details, data and access you share are kept confidential and used only for your project.',
  },
  {
    title: 'Support after launch',
    text: 'Every project includes a post-launch support period, stated in your proposal, for fixes and questions.',
  },
];

export const techStack = ['React', 'Next.js', 'JavaScript', 'Node.js', 'Express', 'Java', 'MongoDB', 'Python', 'Vercel'];

/**
 * Real client reviews only, with the client's permission.
 * Shape: { quote, name, role, organisation }. The section stays hidden while empty.
 */
export const testimonials = [];

/**
 * Real clients only, with permission to show their name.
 * Shape: { name, url }. The section stays hidden while empty.
 */
export const clients = [];

export const homeFaqs = [
  {
    q: 'How long does a typical project take?',
    a: 'A business website usually takes 3 to 4 weeks, and a custom web application 4 to 6 weeks or more depending on scope. You get a milestone timeline with your proposal, after the first conversation.',
  },
  {
    q: 'How is pricing structured?',
    a: 'Fixed quotes based on a written scope, not open-ended hourly billing. You know the cost before we begin. Starting prices are listed on the pricing page.',
  },
  {
    q: 'How do payments work?',
    a: 'Payments are split into milestones agreed in your proposal, usually an advance to begin and the rest as stages are delivered. You receive an invoice for every payment.',
  },
  {
    q: 'Do I own the code and assets?',
    a: 'Yes. Once the project is paid in full, you own the code, design files and content made for you. Domains, hosting and other accounts are set up in your name so you stay in control.',
  },
  {
    q: 'Who will I actually work with?',
    a: 'With the founder, who plans, designs and builds your project. You will always know who is responsible and how to reach them.',
  },
  {
    q: 'What support is available after launch?',
    a: 'Every project includes a support period after launch for fixes and questions. Its length depends on the package and is written in your proposal. Ongoing maintenance can be arranged after that.',
  },
  {
    q: 'Can you redesign an existing website without hurting search rankings?',
    a: 'Yes. We keep or redirect existing URLs, carry over page titles and descriptions, and check speed and indexing after launch.',
  },
  {
    q: 'What do you need from me to get started?',
    a: 'A short description of what you need, any examples you like, and your logo or brand material if you have it. We help with the rest during the first conversation.',
  },
];
