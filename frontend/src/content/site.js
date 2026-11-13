/**
 * Homepage content. Every claim here must be true and owner-approved.
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
  },
  {
    title: 'Web applications',
    summary: 'Browser-based tools shaped around how your team actually works.',
    items: ['Dashboards and portals', 'Management systems', 'Role-based access', 'API development'],
  },
  {
    title: 'Mobile applications',
    summary: 'Apps for the people you serve, designed for small screens from the first sketch.',
    items: ['Customer-facing apps', 'Internal tools', 'Backend and API', 'Store submission support'],
  },
  {
    title: 'E-commerce platforms',
    summary: 'Online stores with a catalogue, cart and checkout that customers can trust.',
    items: ['Storefront design', 'Catalogue and inventory', 'Payments integration', 'Order management'],
  },
  {
    title: 'Custom software',
    summary: 'Systems built for a process that off-the-shelf products do not fit.',
    items: ['Workflow automation', 'Data and reporting', 'Integrations', 'Legacy replacement'],
  },
  {
    title: 'AI integrations',
    summary: 'Practical AI features added where they save time or answer real questions.',
    items: ['Assistants and chat', 'Search and recommendations', 'Document processing', 'Workflow automation'],
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
