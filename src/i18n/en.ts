import type zh from './zh'

const en: typeof zh = {
  brand: { name: 'OwO!', tagline: 'Self-hosted, local-first tools' },
  nav: {
    products: 'Products',
    about: 'About',
    legal: 'Licences',
    theme: 'Toggle theme',
    themeLight: 'Light',
    themeDark: 'Dark',
    themeSystem: 'System',
    language: 'Language',
    menu: 'Menu',
    close: 'Close',
    skip: 'Skip to main content',
  },
  hero: {
    eyebrow: 'Built by OwO Team',
    title: 'Put the essentials back in your own hands.',
    subtitle:
      'Identity, offline travel, lecture recording, dev environments and flight data: five focused products that share one approach, self-hosted and local-first.',
    ctaProducts: 'Browse products',
    ctaBlog: 'Author blog',
  },
  matrix: {
    title: 'Product matrix',
    subtitle: 'Each product solves one concrete problem, and they work well together.',
    learnMore: 'Learn more',
  },
  principles: {
    title: 'What they share',
    items: [
      {
        title: 'Local-first and private',
        desc: 'The travel assistant has zero telemetry and works fully offline; lecture recognition and translation run on your own device; the identity service keeps tokens out of the browser.',
      },
      {
        title: 'Simple to deploy',
        desc: 'One EXE, one APK, one self-hosted service. Fewer dependencies keep the operational surface small.',
      },
      {
        title: 'Standards you can verify',
        desc: 'Open standards such as OIDC and SAML, Ed25519-signed offline packs and a pinned lock.json mean results can be checked.',
      },
    ],
  },
  synergy: {
    title: 'How they fit together',
    subtitle: 'Each stands alone, and they connect when you need them to.',
    caption1: 'OIDC · TOTP · Passkey',
    caption2: 'Restore a setup in one command',
    caption3: 'REST · WebSocket',
    captionRecorder: 'OIDC sign-in · lectures',
    note: 'TravelAI and Recorder accounts are both built on OwO! Identity; Win Deployer and FlightAssistant work on their own.',
  },
  scenarios: {
    title: 'Start from your situation',
    subtitle: 'Jump straight to the product closest to what you need.',
  },
  roadmap: {
    title: 'Versions and status',
    subtitle: 'The latest publicly documented version of each product.',
  },
  product: {
    back: 'All products',
    features: 'Key capabilities',
    stack: 'Tech stack',
    quickstart: 'Quick start',
    gallery: 'Screenshots',
    notes: 'Good to know',
    license: 'Licence',
    others: 'More products',
    platform: 'Platform',
    version: 'Version',
    copy: 'Copy',
    copied: 'Copied',
    open: 'Open source',
    partial: 'Partly open source',
    closed: 'Closed source',
  },
  about: {
    title: 'About OwO Team',
    intro:
      'OwO Team is a small, focused independent group building self-hosted, local-first products: from identity, offline travel and lecture recording to dev environments and flight data.',
    contactTitle: 'Contact',
    blog: 'Author blog',
    email: 'Email',
    wechat: 'WeChat',
    wechatHint: 'Scan to add on WeChat',
    commercial: 'Commercial licensing and partnership',
    commercialDesc: 'For commercial licences, custom work or partnerships, reach out through the blog or email.',
  },
  legal: {
    title: 'Licences and notices',
    intro:
      'Each product’s open-source status and licence are listed below. Only confirmed facts are stated; refer to each product’s repository or service site for the exact terms.',
    disclaimer: 'Content is compiled from public project information; versions and features may change with releases.',
  },
  footer: {
    products: 'Products',
    resources: 'Resources',
    rights: '© {year} OwO Team. All rights reserved.',
    built: 'Built with Vue 3 + Vite',
  },
  notfound: { title: 'Page not found', desc: 'The page may have moved, or it never existed.', home: 'Back to home' },
}

export default en
