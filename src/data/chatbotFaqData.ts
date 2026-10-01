/**
 * Structured FAQ Knowledge Base for DDS Expo Website Chatbot
 * 
 * CORE CONSTRAINT: Zero external AI / LLM APIs.
 * All information is locally stored, static, verifiable, and editable.
 */

export interface FaqItem {
  id: string;
  category: 
    | 'Offers & Ad Campaigns'
    | 'Lead Generation'
    | 'Social Media Marketing'
    | 'Branding & Design'
    | 'Flyers & Posters'
    | 'Web Development'
    | 'Internships & Careers'
    | 'Workshops & Training'
    | 'Company & Leadership'
    | 'Contact & Offices'
    | 'Pricing & Quotations';
  question: string;
  keywords: string[];
  intentPhrases: string[];
  answer: string;
  hasExactPrice: boolean;
  exactPrice?: string;
  whatsappMessage: string;
  suggestedFollowUps?: string[];
}

export const DDS_WHATSAPP_NUMBER = '919966994679';
export const DDS_PHONE_DISPLAY = '+91 9966994679';
export const DDS_SECONDARY_PHONE = '+91 9618231993';
export const DDS_EMAIL = 'info@ddsexpo.com';
export const DDS_OFFICE_ADDRESS = 'Visakhapatnam Corporate Office, AP, India 531021';

export const CHATBOT_FAQ_DATA: FaqItem[] = [
  // ----------------------------------------------------
  // PRODUCT CODE A: 1-Week FREE Ad Campaign (Offer)
  // ----------------------------------------------------
  {
    id: 'prod-a-free-ad',
    category: 'Offers & Ad Campaigns',
    question: 'Tell me about the 1-Week FREE Ad Campaign offer.',
    keywords: [
      'free',
      'offer',
      '1 week',
      'one week',
      'free ad',
      'free campaign',
      'free trial',
      'code a',
      'test drive',
      'free ads',
      'promotional offer'
    ],
    intentPhrases: [
      'is there any free trial',
      'how to get free ad campaign',
      'tell me about 1 week free ad',
      'free campaign offer',
      'what is code a offer'
    ],
    answer: 
      '🚀 **1-Week FREE Ad Campaign (Special Offer - Code A)**\n\n' +
      '• **Price:** **FREE** with any ad plan.\n' +
      '• **Requirement:** Client must have an active website.\n' +
      '• **What is included:** Complete ad creative setup, high-intent audience targeting, Meta/Google tracking pixel configuration, and 7-day live performance monitoring with zero initial management fee.',
    hasExactPrice: true,
    exactPrice: 'FREE with any ad plan (Website required)',
    whatsappMessage: 'Hi DDS Expo, I am interested in claiming the 1-Week FREE Ad Campaign offer. My website is ready, please guide me on the next steps.',
    suggestedFollowUps: [
      'What are your paid lead generation ad plans?',
      'Do you build websites?',
      'How do I claim this offer?'
    ]
  },

  // ----------------------------------------------------
  // PRODUCT CODE B: Lead Generation Ad Plans
  // ----------------------------------------------------
  {
    id: 'prod-b-lead-gen',
    category: 'Lead Generation',
    question: 'What are your Lead Generation Ad Plans and monthly pricing?',
    keywords: [
      'lead generation',
      'leads',
      'ad plans',
      'meta ads',
      'google ads',
      'facebook ads',
      'instagram ads',
      'ppc',
      'ad plan',
      'starter plan',
      'growth plan',
      'premium plan',
      'code b',
      'ad budget'
    ],
    intentPhrases: [
      'how much are lead generation ad plans',
      'what are your ad packages',
      'meta and google ads pricing',
      'how much for facebook advertising',
      'tell me about lead gen plans'
    ],
    answer:
      '🎯 **DDS Expo Lead Generation Ad Plans (Code B)**\n\n' +
      'High-intent customer acquisition on Meta (Facebook & Instagram) and Google Search:\n\n' +
      '1. **Starter Plan:** **₹10,620 / month** (incl. GST) + ₹3,500 service charge\n' +
      '2. **Growth Plan:** **₹17,700 / month** (incl. GST) + ₹3,500 service charge\n' +
      '3. **Premium Plan:** **₹35,400 / month** (incl. GST) + ₹3,500 service charge\n\n' +
      '• **Included:** Precision B2B/B2C demographic targeting, high-converting video/carousel creatives, WhatsApp lead routing, weekly ROAS audits, and continuous conversion optimization.',
    hasExactPrice: true,
    exactPrice: 'Starter ₹10,620 / Growth ₹17,700 / Premium ₹35,400 per month incl. GST (+ ₹3,500 service charge)',
    whatsappMessage: 'Hi DDS Expo, I want to discuss the Lead Generation Ad Plans (Starter / Growth / Premium). Please share details for my business.',
    suggestedFollowUps: [
      'Tell me about the 1-Week FREE Ad Campaign',
      'What is your Social Media Marketing plan?',
      'I want a custom quotation.'
    ]
  },

  // ----------------------------------------------------
  // PRODUCT CODE C: Social Media Marketing Monthly
  // ----------------------------------------------------
  {
    id: 'prod-c-smm',
    category: 'Social Media Marketing',
    question: 'What is your monthly Social Media Marketing (SMM) plan?',
    keywords: [
      'social media',
      'social media marketing',
      'smm',
      'monthly smm',
      'instagram management',
      'facebook page',
      'linkedin marketing',
      'social handling',
      'content calendar',
      'code c'
    ],
    intentPhrases: [
      'how much for social media marketing',
      'social media management cost',
      'monthly smm pricing',
      'can you manage my instagram account',
      'social media packages'
    ],
    answer:
      '📱 **Social Media Marketing (Monthly Plan - Code C)**\n\n' +
      '• **Price:** **₹6,500 / month** (incl. GST)\n' +
      '• **What is included:**\n' +
      '  - Complete monthly creative content calendar\n' +
      '  - High-impact graphic posts and aesthetic layouts\n' +
      '  - Persuasive caption copywriting and viral hashtag research\n' +
      '  - Profile bio optimization and brand highlight covers\n' +
      '  - Community engagement, audience comments & DM monitoring',
    hasExactPrice: true,
    exactPrice: '₹6,500 / month incl. GST',
    whatsappMessage: 'Hi DDS Expo, I would like to sign up for your monthly Social Media Marketing plan at ₹6,500/month. Please share onboarding details.',
    suggestedFollowUps: [
      'What is the Complete Social Media Branding Kit?',
      'Do you offer yearly branding packages?',
      'Can I see your work gallery?'
    ]
  },

  // ----------------------------------------------------
  // PRODUCT CODE D: Complete Social Media Branding Kit
  // ----------------------------------------------------
  {
    id: 'prod-d-branding-kit',
    category: 'Branding & Design',
    question: 'What is the Complete Social Media Branding Kit?',
    keywords: [
      'branding kit',
      'brand kit',
      'social media branding kit',
      'brand identity',
      'logo kit',
      'discount branding',
      'code d',
      'complete brand kit',
      '40000 offer'
    ],
    intentPhrases: [
      'how much is the branding kit',
      'tell me about social media branding kit',
      'what is in the 10000 branding kit',
      'brand identity package cost',
      'what is code d kit'
    ],
    answer:
      '🎨 **Complete Social Media Branding Kit (Code D)**\n\n' +
      '• **Price:** **₹10,000** *(Was regular ₹40,000 — 75% OFF limited-period offer)*\n' +
      '• **What is included:**\n' +
      '  - Master vector logo suite (Primary, Horizontal, Favicon & Watermarks)\n' +
      '  - Brand identity guide with official color palette & typography pairings\n' +
      '  - 10+ custom branded social media post templates\n' +
      '  - Instagram Story frames, Reels cover thumbnails & Highlight icons\n' +
      '  - High-resolution banners for Facebook, LinkedIn & YouTube headers',
    hasExactPrice: true,
    exactPrice: '₹10,000 (regular ₹40,000 — 75% OFF)',
    whatsappMessage: 'Hi DDS Expo, I would like to order the Complete Social Media Branding Kit for ₹10,000. Please let me know how to start.',
    suggestedFollowUps: [
      'What are your Yearly Branding Packages?',
      'How much for flyer design?',
      'How can I contact you?'
    ]
  },

  // ----------------------------------------------------
  // PRODUCT CODE E: Yearly Branding Packages
  // ----------------------------------------------------
  {
    id: 'prod-e-yearly-branding',
    category: 'Branding & Design',
    question: 'What are your Yearly Branding Packages?',
    keywords: [
      'yearly branding',
      'yearly package',
      'annual branding',
      '360 design',
      '52 reels',
      'yearly reels',
      'annual plan',
      'code e',
      'year package'
    ],
    intentPhrases: [
      'what are yearly branding packages',
      'how much for 360 design yearly',
      'how much for 52 reels package',
      'annual branding cost',
      'tell me about code e packages'
    ],
    answer:
      '👑 **Yearly Branding Packages (Code E)**\n\n' +
      'Guarantee 365 days of relentless brand presence and viral short-form content:\n\n' +
      '1. **360 Design Package:** **₹18,000 / year**\n' +
      '   - Year-round design support for festival posters, offer graphics, announcements, and commercial collaterals.\n\n' +
      '2. **52 Reels Package:** **₹26,000 / year**\n' +
      '   - Exactly 1 high-retention short video reel every week (52 total).\n' +
      '   - Includes 3-second viral visual hooks, trending audio design, motion effects, and kinetic subtitles.',
    hasExactPrice: true,
    exactPrice: '360 Design ₹18,000/yr · 52 Reels ₹26,000/yr',
    whatsappMessage: 'Hi DDS Expo, I am interested in your Yearly Branding Package (360 Design / 52 Reels). Please share the contract and deliverables roadmap.',
    suggestedFollowUps: [
      'What is your Social Media Marketing plan?',
      'How much does professional flyer design cost?',
      'Talk to an expert on WhatsApp'
    ]
  },

  // ----------------------------------------------------
  // PRODUCT CODE F: Professional Flyer Design
  // ----------------------------------------------------
  {
    id: 'prod-f-flyer-design',
    category: 'Flyers & Posters',
    question: 'How much does professional flyer and poster design cost?',
    keywords: [
      'flyer',
      'flyer design',
      'poster',
      'poster design',
      'pamphlet',
      'brochure design',
      'leaflet',
      'menu design',
      'banner design',
      'code f',
      '300 flyer'
    ],
    intentPhrases: [
      'how much for a flyer',
      'flyer design price',
      'poster design cost',
      'pamphlet design rate',
      'can you design a flyer for 300'
    ],
    answer:
      '📄 **Professional Flyer & Poster Design (Code F)**\n\n' +
      '• **Price:** Starting from **₹300 per design**\n' +
      '• **Revisions:** **4 included revisions** for perfection\n' +
      '• **What is delivered:** Print-ready high-resolution files (300 DPI CMYK PDF/TIFF) plus digital social sharing formats (PNG/JPG).\n' +
      '• **Turnaround:** Rapid 24 to 48 hours delivery SLA.',
    hasExactPrice: true,
    exactPrice: 'From ₹300 per design (includes 4 revisions)',
    whatsappMessage: 'Hi DDS Expo, I need a professional flyer/poster designed starting at ₹300. Please let me know what brief details you need.',
    suggestedFollowUps: [
      'What is the Complete Social Media Branding Kit?',
      'Tell me about your monthly Social Media Marketing plan',
      'How can I contact you?'
    ]
  },

  // ----------------------------------------------------
  // WEB & TECH DEVELOPMENT
  // ----------------------------------------------------
  {
    id: 'services-web-dev',
    category: 'Web Development',
    question: 'Do you provide website development and mobile apps?',
    keywords: [
      'website',
      'web development',
      'website development',
      'web app',
      'mobile app',
      'ecommerce',
      'shopify',
      'storefront',
      'custom website',
      'react',
      'nextjs',
      'portfolio website',
      'landing page'
    ],
    intentPhrases: [
      'do you build websites',
      'how much does a website cost',
      'can you make an ecommerce website',
      'website development price',
      'web application cost'
    ],
    answer:
      '💻 **Custom Web & Full-Stack Development**\n\n' +
      'Yes! DDS Expo engineers ultra-fast, modern web applications, corporate websites, and e-commerce storefronts:\n\n' +
      '• **Technologies:** React, Next.js, TypeScript, Tailwind CSS, Node.js, Express, PostgreSQL.\n' +
      '• **Core Features:** Sub-second Core Web Vitals (< 0.8s load speed), SEO-optimized structure, Razorpay payment integrations, WhatsApp enquiry bots, and automated GST invoice sync.\n\n' +
      '*Note: Website pricing depends strictly on your project scope, features, and custom pages. For an exact customized quotation, please connect with our tech team on WhatsApp.*',
    hasExactPrice: false,
    whatsappMessage: 'Hi DDS Expo, I would like to know the pricing for website development. Please share the available packages and quotation for my project.',
    suggestedFollowUps: [
      'What technologies do you work with?',
      'Do you provide internships in web development?',
      'How much are your lead generation ad plans?'
    ]
  },

  // ----------------------------------------------------
  // INTERNSHIPS & CAREERS
  // ----------------------------------------------------
  {
    id: 'careers-internships',
    category: 'Internships & Careers',
    question: 'Do you provide internships and job opportunities?',
    keywords: [
      'internship',
      'internships',
      'jobs',
      'careers',
      'hiring',
      'openings',
      'vacancies',
      'fresher',
      'stipend',
      'training',
      'apply for job',
      'placement',
      'college internship'
    ],
    intentPhrases: [
      'do you offer internships',
      'is internship paid or free',
      'how to apply for internship',
      'do you have job vacancies',
      'internship stipend at dds expo'
    ],
    answer:
      '🎓 **Internships & Career Opportunities at DDS Expo**\n\n' +
      'Yes! DDS Expo regularly hires ambitious students, graduates, and experienced specialists for **PAID internships** and full-time roles:\n\n' +
      '• **Available Roles:**\n' +
      '  - Full Stack Web Developer (React / TypeScript / Node.js)\n' +
      '  - Creative Graphic Designer (Photoshop / Illustrator / Figma)\n' +
      '  - Motion Graphics & Short Video Reel Editor\n' +
      '  - Performance Marketing & Meta/Google Ads Executive\n' +
      '  - Operations & Management Executive Intern\n' +
      '• **Stipend:** ₹12,000 – ₹22,000 / month for interns; competitive performance packages for full-time roles.\n' +
      '• **Location:** Visakhapatnam Corporate HQ or Remote options.\n' +
      '• **How to apply:** Visit our **Careers page** or send your resume directly to our HR team on WhatsApp.',
    hasExactPrice: true,
    exactPrice: 'Paid Internships: ₹12,000 - ₹22,000 / month stipend (No student fee)',
    whatsappMessage: 'Hi DDS Expo HR Team, I am interested in applying for an internship / job position at DDS Expo. Please let me know how to submit my resume and portfolio.',
    suggestedFollowUps: [
      'Do you conduct workshops?',
      'What technologies do you work with?',
      'Where is your office located?'
    ]
  },

  // ----------------------------------------------------
  // WORKSHOPS & TRAINING
  // ----------------------------------------------------
  {
    id: 'services-workshops',
    category: 'Workshops & Training',
    question: 'Do you provide workshops and training seminars?',
    keywords: [
      'workshop',
      'workshops',
      'training',
      'seminar',
      'webinar',
      'bootcamp',
      'college training',
      'guest lecture',
      'ai training',
      'prompt engineering workshop'
    ],
    intentPhrases: [
      'do you conduct workshops',
      'can you organize a workshop at our college',
      'ai digital marketing workshop cost',
      'do you provide training seminars',
      'college workshop collaboration'
    ],
    answer:
      '📚 **Workshops & Practical Masterclasses**\n\n' +
      'Yes! DDS Expo conducts high-impact, hands-on training workshops for educational institutions, corporate teams, and startup founders:\n\n' +
      '• **Popular Topics:**\n' +
      '  - AI-Driven Commercial Advertising & Creative Pipelines\n' +
      '  - Prompt Engineering & Generative Media for Business Growth\n' +
      '  - Modern Web Engineering with React, Next.js & Edge Caching\n' +
      '  - Algorithmic Meta & Google Ad Funnel Scaling\n' +
      '• **Format:** On-campus interactive masterclasses or virtual live sessions with real-world case studies and certificates.\n\n' +
      '*Customized proposals and workshop schedules are provided based on batch size and college requirements on WhatsApp.*',
    hasExactPrice: false,
    whatsappMessage: 'Hi DDS Expo, we would like to organize a workshop / training session on AI & Digital Marketing at our institution. Please share available modules and dates.',
    suggestedFollowUps: [
      'Do you provide internships?',
      'What technologies do you work with?',
      'How can I contact you?'
    ]
  },

  // ----------------------------------------------------
  // TECHNOLOGIES & TOOLS
  // ----------------------------------------------------
  {
    id: 'company-technologies',
    category: 'Company & Leadership',
    question: 'What technologies and creative tools do you work with?',
    keywords: [
      'technology',
      'technologies',
      'tools',
      'stack',
      'software',
      'frameworks',
      'languages',
      'what tools do you use'
    ],
    intentPhrases: [
      'what tech stack do you use',
      'which software do you work with',
      'technologies used by dds expo',
      'what tools do your designers use'
    ],
    answer:
      '🛠️ **Technologies & Tooling at DDS Expo**\n\n' +
      '• **Web & Engineering:** React 18, Next.js, TypeScript, Tailwind CSS, Node.js, Express, PostgreSQL, Headless CMS, RESTful APIs.\n' +
      '• **Creative & Branding:** Adobe Photoshop, Illustrator, InDesign, Figma, Canva Pro Enterprise.\n' +
      '• **Video & Motion:** Adobe Premiere Pro, After Effects, CapCut Pro, Cinema 4D.\n' +
      '• **AI & Growth:** Midjourney v6, ElevenLabs, Claude & Gemini prompt pipelines, Meta Ads Manager, Google Ads, GA4, Zapier Automation.',
    hasExactPrice: false,
    whatsappMessage: 'Hi DDS Expo, I would like to discuss a project involving modern web and AI technologies. Please connect me with a technical lead.',
    suggestedFollowUps: [
      'Do you provide website development?',
      'What are your lead generation ad plans?',
      'How can I contact you?'
    ]
  },

  // ----------------------------------------------------
  // COMPANY & FOUNDER
  // ----------------------------------------------------
  {
    id: 'company-about',
    category: 'Company & Leadership',
    question: 'Who founded DDS Expo and what is your track record?',
    keywords: [
      'about',
      'company',
      'founder',
      'ceo',
      'dhanunjay',
      'dhanunjay potini',
      'who are you',
      'leadership',
      'team',
      'history',
      'dds expo'
    ],
    intentPhrases: [
      'who is the founder of dds expo',
      'who owns dds expo',
      'tell me about dds expo company',
      'how many projects have you completed'
    ],
    answer:
      '🏢 **About DDS Expo Private Limited**\n\n' +
      '• **Founder & CEO:** **Mr. Dhanunjay Potini**, visionary entrepreneur and marketing strategist.\n' +
      '• **Director:** **Rama Gollavilli**\n' +
      '• **Track Record:** Successfully delivered 500+ commercial projects for over 230+ retail brands, tech companies, and healthcare providers across India.\n' +
      '• **Mission:** Eliminating wasteful agency overhead by combining rigorous data-driven marketing with cutting-edge visual and web engineering.',
    hasExactPrice: false,
    whatsappMessage: 'Hi DDS Expo team, I would like to learn more about partnering with DDS Expo for our business growth.',
    suggestedFollowUps: [
      'What services do you provide?',
      'Where is your office located?',
      'What are your pricing packages?'
    ]
  },

  // ----------------------------------------------------
  // CONTACT & OFFICE DETAILS
  // ----------------------------------------------------
  {
    id: 'contact-details',
    category: 'Contact & Offices',
    question: 'How can I contact DDS Expo or visit your office?',
    keywords: [
      'contact',
      'phone',
      'phone number',
      'call',
      'mobile',
      'email',
      'address',
      'location',
      'where is office',
      'visakhapatnam',
      'vizag',
      'office hours',
      'support'
    ],
    intentPhrases: [
      'how can i contact you',
      'what is your phone number',
      'where are you located',
      'give me your address',
      'what are your working hours'
    ],
    answer:
      '📍 **Contact DDS Expo**\n\n' +
      '• **Corporate Office:** Visakhapatnam, Andhra Pradesh, India 531021\n' +
      '• **Phone Numbers:**\n' +
      '  - Primary / WhatsApp: **+91 9966994679**\n' +
      '  - Secondary: **+91 9618231993**\n' +
      '• **Email:** info@ddsexpo.com / careers@ddsexpo.com\n' +
      '• **Office Hours:** Monday – Saturday: 9:00 AM – 7:00 PM IST (Ad emergency support available 24/7)',
    hasExactPrice: false,
    whatsappMessage: 'Hi DDS Expo, I would like to schedule a call / consultation regarding your digital services.',
    suggestedFollowUps: [
      'What are your ad plans?',
      'Do you provide website development?',
      'What is your Social Media Marketing plan?'
    ]
  },

  // ----------------------------------------------------
  // GENERAL PRICING & QUOTATION
  // ----------------------------------------------------
  {
    id: 'pricing-general',
    category: 'Pricing & Quotations',
    question: 'How much does your service cost? Can I get a quotation?',
    keywords: [
      'price',
      'pricing',
      'cost',
      'fees',
      'charges',
      'budget',
      'how much',
      'quotation',
      'quote',
      'rates',
      'rate card',
      'package price',
      'service cost',
      'discount',
      'negotiation'
    ],
    intentPhrases: [
      'how much does it cost',
      'what are your charges',
      'i want a quotation',
      'send me price list',
      'give me rate card'
    ],
    answer:
      '💰 **Transparent Pricing at DDS Expo**\n\n' +
      'We offer transparent, fixed pricing on standard commercial packages:\n\n' +
      '• **Lead Gen Ad Plans:** From ₹10,620 / month incl. GST\n' +
      '• **Social Media Marketing:** ₹6,500 / month incl. GST\n' +
      '• **Social Media Branding Kit:** ₹10,000 (was ₹40,000)\n' +
      '• **Yearly Branding:** 360 Design ₹18,000/yr · 52 Reels ₹26,000/yr\n' +
      '• **Flyer Design:** From ₹300 (includes 4 revisions)\n' +
      '• **1-Week Ad Campaign:** FREE with any ad plan (website required)\n\n' +
      'For custom websites, software applications, or multi-channel enterprise retainers, pricing depends on your exact requirements. Please click below to get a personalized quotation on WhatsApp.',
    hasExactPrice: true,
    exactPrice: 'Fixed packages from ₹300 (flyers) to ₹35,400/mo (premium ads). Custom web quotes on WhatsApp.',
    whatsappMessage: 'Hi DDS Expo, I would like to request an exact pricing quotation for my business requirements. Please share package details.',
    suggestedFollowUps: [
      'What are your lead generation ad plans?',
      'What is your Social Media Marketing plan?',
      'How much does a website cost?'
    ]
  }
];

export const INITIAL_SUGGESTED_QUESTIONS = [
  'What services do you provide?',
  'What are your ad & lead gen plans?',
  'What is your monthly SMM plan?',
  'How much does flyer design cost?',
  'Do you provide internships?',
  'Do you provide website development?',
  'Tell me about the 1-Week FREE Ad Campaign',
  'How can I contact you?'
];
