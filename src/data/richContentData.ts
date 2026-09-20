export interface GalleryProject {
  id: string;
  title: string;
  category: 'Creatives & Ads' | 'Identity & Print' | 'Video Marketing' | 'Web & Tech' | 'Social Growth';
  subCategory: string;
  client: string;
  industry: string;
  year: string;
  image: string;
  thumbnail: string;
  metric: string;
  metricLabel: string;
  description: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  techStack: string[];
}

export interface JobOpening {
  id: string;
  title: string;
  department: 'Design' | 'Video Production' | 'Engineering' | 'Sales & Operations' | 'Marketing';
  type: 'Full-Time' | 'Internship';
  location: string;
  experience: string;
  compensation: string;
  openings: number;
  featured?: boolean;
  description: string;
  responsibilities: string[];
  requirements: string[];
  perks: string[];
}

export interface DetailedBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  tags: string[];
  content: {
    introduction: string;
    sections: {
      heading: string;
      body: string;
      bulletPoints?: string[];
    }[];
    conclusion: string;
    keyTakeaways: string[];
  };
}

export interface ServiceDetail {
  id: string;
  title: string;
  category: 'Creatives' | 'Video' | 'Web & Tech' | 'Branding' | 'Growth & Ads' | 'Automation';
  tagline: string;
  icon: string;
  accentColor: string;
  startingPrice: number;
  deliveryTime: string;
  overview: string;
  deliverables: string[];
  technologies: string[];
  targetAudience: string[];
  features: {
    title: string;
    desc: string;
  }[];
}

// ----------------------------------------------------------------------
// GALLERY PROJECTS DATA
// ----------------------------------------------------------------------
export const GALLERY_PROJECTS: GalleryProject[] = [
  {
    id: 'proj-1',
    title: 'OmniAI Retail Festival Promotional Posters',
    category: 'Creatives & Ads',
    subCategory: 'Poster Designs',
    client: 'Apex Retail Group',
    industry: 'E-Commerce & Retail',
    year: '2025',
    image: '/assets/img/values-1.png',
    thumbnail: '/assets/img/values-1.png',
    metric: '+310%',
    metricLabel: 'Footfall & Store Inquiries',
    description: 'A suite of 45 high-impact festival campaign posters designed using fine-tuned generative visuals and precision typography.',
    challenge: 'The client needed 45 localized poster variants across South Indian cities within 72 hours for Diwali festival flash sales.',
    solution: 'DDS Expo deployed our AI visual workflow with custom color palettes and localized typography, reducing standard 2-week turnaround to 48 hours.',
    deliverables: ['Print-Ready CMYK Vectors', 'Digital Display Posters (4K)', 'Social Media Adaptations', 'Source Figma & AI Files'],
    techStack: ['Midjourney v6', 'Adobe Illustrator', 'Photoshop', 'Figma'],
  },
  {
    id: 'proj-2',
    title: 'FinEdge Corporate Identity & Executive Brochure',
    category: 'Identity & Print',
    subCategory: 'Brochures',
    client: 'FinEdge Advisory LLP',
    industry: 'Financial Services',
    year: '2025',
    image: '/assets/img/values-2.png',
    thumbnail: '/assets/img/values-2.png',
    metric: '₹4.2 Cr',
    metricLabel: 'AUM Secured Post-Launch',
    description: 'Complete corporate rebranding, luxury foil-stamped business cards, and a 16-page investor-grade corporate brochure.',
    challenge: 'Traditional agency quotes were exorbitant and lacked modern fintech appeal required for high-net-worth NRI investors.',
    solution: 'Engineered a clean typographic identity combining navy trust tones with metallic copper accents, backed by an AI-assisted infographics layout.',
    deliverables: ['16-Page Master Corporate Brochure', 'Embossed Luxury Business Cards', 'Brand Guidelines Book', 'Letterhead & Envelopes'],
    techStack: ['InDesign CC', 'Illustrator', 'Adobe Fonts', 'Print Craft Pro'],
  },
  {
    id: 'proj-3',
    title: 'Viral Hyper-Fast Social Reels Campaign',
    category: 'Video Marketing',
    subCategory: 'Reels Design',
    client: 'GlowFit Wellness',
    industry: 'Health & Fitness',
    year: '2025',
    image: '/assets/img/values-3.png',
    thumbnail: '/assets/img/values-3.png',
    metric: '2.4M',
    metricLabel: 'Organic Impressions in 30 Days',
    description: 'A series of 30 dynamic vertical video reels featuring AI motion captions, viral pacing hooks, and custom animated product renders.',
    challenge: 'Low organic reach and high video production friction preventing daily content publishing on Instagram & YouTube Shorts.',
    solution: 'Established a scripted AI pipeline producing 1 high-retention reel daily with motion tracking, hook testing, and dynamic sound design.',
    deliverables: ['30 9:16 Vertical Master Reels', 'Multi-Language Subtitles (EN/TE/HI)', 'High CTR Custom Thumbnails', 'Audio Stems & Sound Design'],
    techStack: ['Premiere Pro', 'After Effects', 'ElevenLabs AI', 'CapCut Pro'],
  },
  {
    id: 'proj-4',
    title: 'NextGen Headless E-Commerce Enterprise Platform',
    category: 'Web & Tech',
    subCategory: 'E-Commerce Website',
    client: 'Saffron Spice Co.',
    industry: 'D2C Spices & Exports',
    year: '2025',
    image: '/assets/img/hero-img.png',
    thumbnail: '/assets/img/hero-img.png',
    metric: '< 0.8s',
    metricLabel: 'Core Web Vitals Load Time',
    description: 'Ultra-fast Next.js e-commerce storefront with integrated Razorpay payment gateway, GST automatic invoicing, and multi-warehouse shipping.',
    challenge: 'Legacy WordPress store crashed during peak festival sales and suffered from a sluggish 4.2-second mobile load time.',
    solution: 'Re-architected from scratch onto high-performance React with global edge CDN caching, slashing load times and increasing checkout conversions by 48%.',
    deliverables: ['Full-Stack E-Commerce Web App', 'Admin Inventory & Order Portal', 'Payment Gateway & WhatsApp API', 'Automated GST Invoice Sync'],
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'Razorpay', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 'proj-5',
    title: 'B2B Targeted LinkedIn & Meta Funnel Engine',
    category: 'Social Growth',
    subCategory: 'Facebook Business',
    client: 'CloudVantage ERP',
    industry: 'Enterprise Software',
    year: '2025',
    image: '/assets/img/about.jpg',
    thumbnail: '/assets/img/about.jpg',
    metric: '4.6x',
    metricLabel: 'Return on Ad Spend (ROAS)',
    description: 'High-intent lead generation engine targeting CFOs and operations managers across Telangana, Andhra Pradesh, and Karnataka.',
    challenge: 'High cost-per-lead (₹2,800/lead) with poor qualification rates from broad demographic ad targeting.',
    solution: 'Built AI lookalike audiences based on verified business registries, combined with dynamic creative testing that reduced cost-per-lead to ₹620.',
    deliverables: ['Comprehensive Ad Campaign Setup', 'CRM Lead Sync Integration', 'Weekly Attribution Reports', 'A/B Creative Matrix'],
    techStack: ['Meta Ads Manager', 'Google Ads', 'GA4 Analytics', 'Zapier Automation'],
  },
  {
    id: 'proj-6',
    title: 'Modern Minimalist Logo & Visual Identity',
    category: 'Identity & Print',
    subCategory: 'Logo Designs',
    client: 'Nexa Solar Tech',
    industry: 'Clean Energy',
    year: '2025',
    image: '/assets/img/values-1.png',
    thumbnail: '/assets/img/values-1.png',
    metric: '100%',
    metricLabel: 'Trademark Clearance',
    description: 'Geometric sun-and-grid emblem crafted with optical balance rules, complete with dark/light variations and vector master assets.',
    challenge: 'Old logo looked dated and was pixelated across building signage, vehicle wraps, and mobile app icons.',
    solution: 'Designed a timeless geometric vector identity with comprehensive brand usage manual covering digital, apparel, and large-format signage.',
    deliverables: ['Primary & Secondary Logo Marks', 'Vector SVG/EPS/PDF Assets', 'Typography & Color Specifications', 'App Icon Suite'],
    techStack: ['Adobe Illustrator', 'Figma', 'Vector Pro'],
  },
  {
    id: 'proj-7',
    title: 'High-Converting Real Estate Flyer & Brochure Suite',
    category: 'Creatives & Ads',
    subCategory: 'Flyer Designs',
    client: 'Skyline Horizons Realty',
    industry: 'Luxury Real Estate',
    year: '2025',
    image: '/assets/img/values-2.png',
    thumbnail: '/assets/img/values-2.png',
    metric: '180+',
    metricLabel: 'Site Visits Booked in Week 1',
    description: 'Luxury metallic-accented promotional flyers and interactive digital PDFs for a 45-acre gated villa community in Vizag.',
    challenge: 'Needed premium visuals that reflect multi-crore luxury while maintaining clear floor plan blueprints and pricing disclosures.',
    solution: 'Integrated 3D isometric architectural renders with crisp typography and instant QR codes linked directly to WhatsApp sales executives.',
    deliverables: ['Tri-Fold Print Flyers', 'Digital Interactive PDF with Virtual Tours', 'WhatsApp Brochure Mini-Format', 'Direct Print Supervision'],
    techStack: ['Photoshop', 'Illustrator', '3D Max Render', 'InDesign'],
  },
  {
    id: 'proj-8',
    title: 'Automated YouTube Video Production Engine',
    category: 'Video Marketing',
    subCategory: 'Video Design',
    client: 'TechDecoded Channel',
    industry: 'EdTech & Digital Media',
    year: '2025',
    image: '/assets/img/values-3.png',
    thumbnail: '/assets/img/values-3.png',
    metric: '850K+',
    metricLabel: 'Subscribers Milestone',
    description: 'Full post-production pipeline for weekly 10-15 minute deep-dive explainer videos with kinetic motion graphics and B-roll automation.',
    challenge: 'Manual video editing took 25 hours per video, bottlenecking upload cadence to just once every 2 weeks.',
    solution: 'Standardized motion graphics template libraries and automated footage tagging cut turnaround time from 25 hours to 6 hours per episode.',
    deliverables: ['Full 4K YouTube Video Exports', 'Custom Animated Motion Titles', 'Audio Mastering & Equalization', 'Click-Optimized Thumbnails'],
    techStack: ['After Effects', 'Premiere Pro', 'DaVinci Resolve', 'Logic Pro'],
  },
  {
    id: 'proj-9',
    title: 'Enterprise Corporate Portal with CMS & Hosting',
    category: 'Web & Tech',
    subCategory: 'Dynamic Website',
    client: 'Kurnool Agro Industries',
    industry: 'Agriculture & Exports',
    year: '2025',
    image: '/assets/img/hero-img.png',
    thumbnail: '/assets/img/hero-img.png',
    metric: '99.98%',
    metricLabel: 'Server Uptime SLA',
    description: 'Multi-lingual dynamic corporate web portal with real-time commodity mandi price ticker, export enquiry portal, and cloud hosting.',
    challenge: 'Client required dynamic daily rate updates managed by non-technical office staff, along with high international traffic stability.',
    solution: 'Built a lightweight custom CMS on high-availability cloud infrastructure with instant WhatsApp enquiry integration and automated SSL.',
    deliverables: ['Custom Dynamic CMS Website', 'High-Speed Cloud VPS Setup', 'Corporate Email Infrastructure', 'Automated Daily Backups'],
    techStack: ['React', 'Node.js', 'Express', 'Tailwind', 'Cloudflare CDN'],
  },
];

// ----------------------------------------------------------------------
// CAREERS DATA
// ----------------------------------------------------------------------
export const JOB_OPENINGS: JobOpening[] = [
  {
    id: 'job-1',
    title: 'Senior Graphic Designer',
    department: 'Design',
    type: 'Full-Time',
    location: 'Visakhapatnam HQ (Hybrid Available)',
    experience: '2 - 5 Years',
    compensation: '₹35,000 - ₹55,000 / month + Performance Bonus',
    openings: 2,
    featured: true,
    description: 'We are seeking an exceptionally creative Graphic Designer proficient with both classical design principles and modern AI creative workflows (Midjourney, Photoshop Generative Fill, Figma).',
    responsibilities: [
      'Create high-converting social media creatives, promotional banners, print posters, and brand identities.',
      'Collaborate with the AI prompt team to produce bespoke brand imagery at record turnaround speeds.',
      'Maintain rigorous quality assurance and visual consistency across all client campaign deliverables.',
      'Mentor junior designers and interns on typographic hierarchy and commercial color theory.',
    ],
    requirements: [
      'Mastery of Adobe Creative Suite (Photoshop, Illustrator, InDesign) and Figma.',
      'Demonstrated experience with AI image generation tools (Midjourney, Stable Diffusion) is a strong advantage.',
      'Compelling portfolio showcasing commercial campaigns, brand identities, and social creatives.',
      'Strong eye for detail, modern aesthetic trends, and typography balance.',
    ],
    perks: [
      'High-end Apple M3 Max workstation with 4K color-calibrated dual displays.',
      'Full health insurance coverage for self and family.',
      'Flexible hybrid working schedule (2 days work-from-home weekly).',
      'Annual performance appraisal and quarterly spot bonuses.',
    ],
  },
  {
    id: 'job-2',
    title: 'Lead Video Editor & Motion Artist',
    department: 'Video Production',
    type: 'Full-Time',
    location: 'Visakhapatnam HQ / Remote',
    experience: '2 - 4 Years',
    compensation: '₹35,000 - ₹60,000 / month',
    openings: 3,
    featured: true,
    description: 'Lead our video production team crafting viral Instagram Reels, YouTube Shorts, commercial brand films, and motion graphics explainer videos.',
    responsibilities: [
      'Cut, grade, and animate high-engagement short-form and long-form video content.',
      'Design kinetic typography, sound effects, B-roll overlays, and custom motion graphics.',
      'Optimize videos for different aspect ratios (9:16 vertical, 16:9 widescreen, 1:1 square).',
      'Experiment with AI voiceovers, automated subtitles, and generative video tools to enhance storytelling.',
    ],
    requirements: [
      'Proficiency in Adobe Premiere Pro, After Effects, and DaVinci Resolve.',
      'Deep understanding of social video hooks, pacing, retention curves, and trending audio.',
      'Solid audio mixing, sound design, and color grading competencies.',
      'Ability to produce fast-turnaround video concepts without sacrificing visual polish.',
    ],
    perks: [
      'Dedicated GPU rendering workstation with unlimited cloud storage.',
      'Subsidized subscriptions to premium audio/video asset libraries (Epidemic Sound, Envato).',
      'Skill development budget for advanced 3D motion and VFX courses.',
      'Collaborative, high-energy agency atmosphere.',
    ],
  },
  {
    id: 'job-3',
    title: 'Full-Stack Web Developer (React / Node.js)',
    department: 'Engineering',
    type: 'Full-Time',
    location: 'Visakhapatnam HQ / Hyderabad Hub',
    experience: '2 - 5 Years',
    compensation: '₹45,000 - ₹80,000 / month',
    openings: 2,
    featured: true,
    description: 'Build robust, lightning-fast client websites, e-commerce storefronts, custom ERP modules, and modern web applications with seamless API integrations.',
    responsibilities: [
      'Develop modern responsive web applications using React, TypeScript, Tailwind CSS, and Vite/Next.js.',
      'Build secure RESTful APIs, webhook listeners, and third-party integrations (Payment gateways, CRMs, WhatsApp APIs).',
      'Ensure high Core Web Vitals performance, SEO standards, and cross-browser responsiveness.',
      'Write clean, maintainable, modular TypeScript code with proper automated testing.',
    ],
    requirements: [
      'Solid experience in modern JavaScript/TypeScript, React 18+, Node.js, and Express.',
      'Proficiency in Tailwind CSS, CSS Grid/Flexbox, and responsive UI implementation.',
      'Familiarity with SQL/PostgreSQL or NoSQL databases and cloud deployments (Vercel, Cloud Run, AWS).',
      'Understanding of web security best practices (CORS, JWT, CSRF, input sanitation).',
    ],
    perks: [
      'Modern tech stack with zero legacy code burdens.',
      'Conference travel allowance and certification reimbursements.',
      'Performance-linked project completion bonuses.',
      'Generous paid time off and wellness leave.',
    ],
  },
  {
    id: 'job-4',
    title: 'Telecaller & Client Outreach Intern',
    department: 'Sales & Operations',
    type: 'Internship',
    location: 'Visakhapatnam Office',
    experience: 'Fresher / College Graduate',
    compensation: '₹12,000 - ₹18,000 / month Stipend + High Commission',
    openings: 5,
    description: 'Kickstart your business development career by engaging with inbound leads, explaining our AI digital solutions, and scheduling discovery calls for senior consultants.',
    responsibilities: [
      'Contact prospective business clients who requested digital consultations on our website.',
      'Clearly present our digital marketing, web development, and AI design service packages.',
      'Maintain clean CRM follow-up records, notes, and call disposition statuses.',
      'Coordinate with senior account managers to schedule formal quotation presentations.',
    ],
    requirements: [
      'Fluent communication in Telugu, English, and Hindi (spoken).',
      'Courteous, enthusiastic telephone etiquette with positive problem-solving attitude.',
      'Basic computer literacy and comfort navigating CRM software.',
      'Eagerness to learn digital marketing fundamentals and sales negotiation.',
    ],
    perks: [
      'Attractive performance commissions on every lead converted to a closed contract.',
      'Formal Internship Experience Certificate and Letter of Recommendation from CEO.',
      'Direct pathway to full-time Business Development Executive role upon completion.',
      'Daily hands-on mentorship from experienced sales leaders.',
    ],
  },
  {
    id: 'job-5',
    title: 'Affiliate Marketing & Growth Intern',
    department: 'Marketing',
    type: 'Internship',
    location: 'Remote / Hybrid',
    experience: 'Fresher / Passionate Digital Marketer',
    compensation: '₹10,000 - ₹15,000 / month + Revenue Share',
    openings: 4,
    description: 'Grow our network of digital creators, freelancers, and business community leaders promoting DDS Expo’s services with lucrative revenue-share models.',
    responsibilities: [
      'Identify and onboard regional business networks, trade bodies, and creators as DDS Expo affiliates.',
      'Distribute promotional collateral, custom referral links, and co-branded flyers.',
      'Track affiliate campaign metrics, referral conversions, and monthly payout calculations.',
      'Assist in organizing virtual webinars showcasing AI digital transformation for MSMEs.',
    ],
    requirements: [
      'Active presence on social media platforms (LinkedIn, Instagram, WhatsApp communities).',
      'Strong networking and interpersonal relationship-building skills.',
      'Basic understanding of digital marketing funnels and affiliate marketing concepts.',
      'Self-driven mindset with good time-management habits.',
    ],
    perks: [
      'Uncapped revenue share on repeat client billings.',
      'Work remotely from anywhere with flexible operating hours.',
      'Free access to internal digital marketing training modules and masterclasses.',
      'Opportunity to build a wide professional B2B network.',
    ],
  },
  {
    id: 'job-6',
    title: 'Operations & Management Executive Intern',
    department: 'Sales & Operations',
    type: 'Internship',
    location: 'Visakhapatnam HQ',
    experience: 'BBA / MBA / Engineering Graduate',
    compensation: '₹15,000 - ₹22,000 / month Stipend',
    openings: 3,
    description: 'Work directly alongside our Founders and Department Heads to coordinate project milestones, client onboarding, SLA tracking, and ERP workflow administration.',
    responsibilities: [
      'Assist in managing client delivery timelines, sprint deliverables, and resource allocation.',
      'Facilitate smooth communication between clients and the internal design & tech teams.',
      'Manage records in our unified ERP & CRM portal (invoices, proposals, task boards).',
      'Analyze project completion metrics and prepare executive performance summaries.',
    ],
    requirements: [
      'Excellent organizational, written, and spoken communication skills.',
      'Proficiency in spreadsheets (Google Sheets / Excel) and modern collaboration tools.',
      'Proactive problem solver with high personal accountability and professional maturity.',
      'Interest in agency operations, tech startups, and business strategy.',
    ],
    perks: [
      'Direct one-on-one mentorship with Founder & CEO Mr. Dhanunjay.',
      'Fast-track placement into Full-Time Project Manager / Operations Lead position.',
      'Comprehensive exposure to complete end-to-end digital agency operations.',
      'Modern, supportive workplace culture with daily lunch provided.',
    ],
  },
];

// ----------------------------------------------------------------------
// DETAILED BLOG POSTS DATA
// ----------------------------------------------------------------------
export const DETAILED_BLOG_POSTS: DetailedBlogPost[] = [
  {
    id: 'blog-1',
    slug: 'how-ai-is-revolutionizing-digital-marketing',
    title: 'How AI is Revolutionizing Digital Marketing in 2026 and Beyond',
    excerpt: 'Explore how generative intelligence, automated ad targeting, and hyper-personalized funnels are slashing customer acquisition costs for modern businesses.',
    category: 'Artificial Intelligence',
    author: {
      name: 'Dhanunjay Potini',
      role: 'Founder & CEO, DDS Expo',
      avatar: '/assets/img/team/team-1.png',
    },
    date: 'February 18, 2026',
    readTime: '6 min read',
    image: '/assets/img/blog/blog-1.jpg',
    featured: true,
    tags: ['AI Marketing', 'Machine Learning', 'Conversion Rate Optimization', 'B2B Growth'],
    content: {
      introduction: 'For decades, digital marketing has been held hostage by manual guesswork: guessing which headline would convert, manually adjusting PPC bids at midnight, and waiting weeks for creative teams to deliver a batch of banner ads. In 2026, artificial intelligence has completely flipped this script. Companies embracing automated creative and analytical pipelines are outpacing legacy competitors by orders of magnitude.',
      sections: [
        {
          heading: '1. Hyper-Personalization at True Scale',
          body: 'Traditional marketing spoke to demographics—women aged 25-34 in tier-1 cities. AI speaks to individual intent. By processing real-time browsing signals, micro-interactions, and semantic queries, AI models now generate bespoke messaging tailored to each user’s specific pain points in milliseconds.',
          bulletPoints: [
            'Dynamic text replacement reflecting exact search query intent',
            'Contextual imagery generated to match local regional aesthetics',
            'Real-time predictive pricing and custom bundled offers',
          ],
        },
        {
          heading: '2. Creative Velocity: From Weeks to Minutes',
          body: 'The single biggest bottleneck for scaling ad campaigns has historically been creative fatigue. After 7 to 10 days, audiences ignore the same creative banner. With AI-assisted pipelines, DDS Expo now generates 50 distinct aesthetic variations in under two hours, allowing automated split-testing to find winning hooks without burning human design bandwidth.',
        },
        {
          heading: '3. Autonomous Bid Management & Predictive Attribution',
          body: 'Rather than looking backward at last week’s ROAS, machine learning models predict lifetime customer value (LTV) within the first 12 hours of user acquisition. Bidding algorithms automatically direct marketing dollars toward prospects with the highest probability of repeat purchases.',
        },
      ],
      conclusion: 'The businesses that thrive in this era are not those with the biggest budgets, but those with the fastest feedback loops. By uniting human creative vision with AI execution speed, DDS Expo delivers measurable commercial growth that was impossible just three years ago.',
      keyTakeaways: [
        'AI eliminates creative fatigue by enabling daily A/B test iterations.',
        'Intent-based targeting consistently delivers 3x to 5x higher ROAS than broad demographics.',
        'Adopting integrated AI workflows reduces agency production costs by up to 60%.',
      ],
    },
  },
  {
    id: 'blog-2',
    slug: 'top-ai-tools-for-digital-marketing-success',
    title: 'Top AI Tools That Will Skyrocket Your Business Growth in 2026',
    excerpt: 'A comprehensive review of the highest-ROI generative tools for copy, design, video editing, and CRM automation that every entrepreneur must know.',
    category: 'Tools & Technology',
    author: {
      name: 'Rama Gollavilli',
      role: 'Director, DDS Expo',
      avatar: '/assets/img/team/team-2.png',
    },
    date: 'January 24, 2026',
    readTime: '5 min read',
    image: '/assets/img/blog/blog-2.jpg',
    tags: ['Marketing Stack', 'Software', 'Productivity', 'Automation'],
    content: {
      introduction: 'Every week, dozens of new AI tools launch promising to revolutionize your workflow. But which ones genuinely translate into closed contracts, lower ad expenses, and higher profit margins? At DDS Expo, we test hundreds of platforms to filter the genuine workhorses from the marketing gimmicks.',
      sections: [
        {
          heading: 'Visual Generation: Midjourney v6 + Custom LoRA Models',
          body: 'For photorealistic commercial advertising, fine-tuned diffusion models allow brands to generate studio-grade lifestyle photography without booking expensive photo shoots, hiring models, or renting exotic locations.',
        },
        {
          heading: 'Motion & Voice: ElevenLabs & Runway Gen-3',
          body: 'Pairing human-like emotional AI voiceovers with hyper-realistic generative motion has slashed the cost of video production. You can now produce multilingual commercial explainers in Hindi, Telugu, Tamil, and English simultaneously.',
          bulletPoints: [
            'Instant multi-dialect voice cloning for regional radio & video ads',
            'Sub-second subtitle synchronizations with zero typographic errors',
            'Zero royalty licensing headaches for background music and stems',
          ],
        },
        {
          heading: 'Full-Funnel Automation: Integrated ERP & CRM Systems',
          body: 'Tools are useless if leads slip through the cracks. Connecting your website forms directly to an automated CRM with instant WhatsApp alerts and salesperson assignment ensures a response time under 5 minutes, doubling conversion probability.',
        },
      ],
      conclusion: 'Tools are amplifiers. A poor strategy multiplied by AI simply produces bad campaigns faster. The real competitive moat lies in combining rigorous business acumen with disciplined tool execution.',
      keyTakeaways: [
        'Select tools that natively integrate into your sales CRM.',
        'Multilingual AI voice pipelines allow instant expansion into regional Indian markets.',
        'Speed to lead response remains the single most critical conversion variable.',
      ],
    },
  },
  {
    id: 'blog-3',
    slug: 'prompt-engineering-the-skill-that-powers-ai',
    title: 'Prompt Engineering: The Foundational Skill Powering Enterprise AI',
    excerpt: 'Why structured prompting, few-shot conditioning, and domain grounding separate average outputs from production-grade commercial assets.',
    category: 'Engineering',
    author: {
      name: 'Sanjay Kumar',
      role: 'Head of Operations, DDS Expo',
      avatar: '/assets/img/team/team-4.png',
    },
    date: 'December 10, 2025',
    readTime: '7 min read',
    image: '/assets/img/blog/blog-3.jpg',
    tags: ['Prompt Engineering', 'AI Ethics', 'Workflows', 'Technical Guide'],
    content: {
      introduction: 'There is a common misconception that AI is a magic button: you type a five-word sentence and receive an award-winning marketing strategy. In reality, generative models are statistical engines that reflect the precision of the instructions provided. Mastering prompt engineering is what enables DDS Expo to produce enterprise-grade deliverables consistently.',
      sections: [
        {
          heading: 'The Anatomy of a High-Precision Prompt',
          body: 'Vague inputs like "Write a good real estate ad" yield generic, uninspired copy. Production prompts incorporate strict parameters: Persona definition, Target audience psychographics, Explicit constraints (e.g. character count, reading grade level), Tone guidelines, and Negative guardrails.',
          bulletPoints: [
            'Role Definition: Act as a veteran direct-response copywriter for Indian luxury real estate',
            'Context & Proof: Incorporate specific square footage, RERA registration, and bank approvals',
            'Actionable Call-to-Action: Drive immediate WhatsApp consultation bookings',
          ],
        },
        {
          heading: 'System Prompting & Brand Tone Memory',
          body: 'By creating persistent brand guidelines within custom system prompts, we ensure that every tweet, poster slogan, and client email sounds unmistakably like the client brand, preserving hard-earned brand equity across thousands of outputs.',
        },
      ],
      conclusion: 'As AI models grow more capable, the value of the prompt engineer shifts from syntax trickery to deep domain expertise. The better you understand customer psychology and design fundamentals, the more potent your AI outputs become.',
      keyTakeaways: [
        'Always specify negative constraints to eliminate generic clichés.',
        'Structure prompts with clear role, context, goal, and output format.',
        'Human editorial oversight remains vital for tone and factual accuracy.',
      ],
    },
  },
  {
    id: 'blog-4',
    slug: 'why-every-business-needs-a-high-performance-website',
    title: 'Why Slow Websites Are Silently Killing Your Ad ROI in 2026',
    excerpt: 'How Google Core Web Vitals and sub-second page loads directly impact your Meta & Google Ads quality scores, lowering your cost per click.',
    category: 'Web Development',
    author: {
      name: 'Srikanth Potini',
      role: 'Chief Technical Advisor, DDS Expo',
      avatar: '/assets/img/team/team-3.png',
    },
    date: 'November 28, 2025',
    readTime: '5 min read',
    image: '/assets/img/hero-img.png',
    tags: ['Web Performance', 'SEO', 'Core Web Vitals', 'Conversion Optimization'],
    content: {
      introduction: 'You can have the most striking ad creative in the world, but if your landing page takes longer than 3 seconds to load on a mobile 4G connection, more than 53% of your paid visitors will bounce before seeing a single word of your offer.',
      sections: [
        {
          heading: 'The Hidden Cost of Bloated Templates',
          body: 'Many businesses use heavy, outdated WordPress themes packed with 40 plugins they don’t need. Every additional script delays page interactivity and sends negative signals to ad algorithms, which in turn raises your cost-per-click.',
        },
        {
          heading: 'The Modern Headless Architecture Advantage',
          body: 'At DDS Expo, our web solutions are engineered with modern React frameworks, edge serverless rendering, and automatic image optimization. Pages render in under 800 milliseconds, boosting ad quality scores and immediately improving organic Google rankings.',
        },
      ],
      conclusion: 'Speed is not a technical luxury; it is a direct revenue driver. Upgrading to a fast, modern digital presence pays for itself within the first quarter through reduced advertising waste.',
      keyTakeaways: [
        'Every 100ms improvement in page speed lifts conversion rates by up to 1.1%.',
        'Mobile optimization must be verified on realistic 4G network constraints.',
        'Clean, custom code consistently outperforms heavy theme templates.',
      ],
    },
  },
];

// ----------------------------------------------------------------------
// DETAILED SERVICES DATA
// ----------------------------------------------------------------------
export const DETAILED_SERVICES: ServiceDetail[] = [
  {
    id: 'ai-creatives',
    title: 'AI Creatives & Graphic Design',
    category: 'Creatives',
    tagline: 'High-Impact Social Ads, Posters, Flyers & Commercial Graphics',
    icon: 'bi-activity',
    accentColor: '#0dcaf0',
    startingPrice: 15000,
    deliveryTime: '24 - 48 Hours',
    overview: 'Transform your brand visuals with high-converting social media creatives, festival promotional banners, print-ready posters, and marketing collateral designed with modern AI precision and human creative direction.',
    deliverables: [
      '30 Custom Social Media Creatives per Month (Instagram, Facebook, LinkedIn)',
      'High-Resolution Print-Ready Posters & Event Flyers (300 DPI CMYK)',
      'Multi-Format Export (1:1 Square, 4:5 Portrait, 9:16 Story, 16:9 Banner)',
      'Source Files (Figma / Adobe Illustrator / Layered PSD)',
      'Unlimited Revisions until Complete Satisfaction',
      'Commercial Usage Copyrights Transfer',
    ],
    technologies: ['Adobe Illustrator', 'Photoshop CC', 'Figma', 'Midjourney v6', 'Canva Pro Enterprise'],
    targetAudience: ['Retail Stores', 'E-Commerce Brands', 'Real Estate Developers', 'Educational Institutes', 'Healthcare & Clinics'],
    features: [
      { title: 'Sub-48H Turnaround', desc: 'Rapid sprint delivery to capitalize on trending moments and flash sales.' },
      { title: 'Pixel-Perfect Typography', desc: 'Custom typographic pairings in English, Telugu, Hindi, and Tamil.' },
      { title: 'A/B Test Creative Packs', desc: 'Multiple visual hooks to test which style delivers the lowest cost per click.' },
    ],
  },
  {
    id: 'ai-videos',
    title: 'AI Video Production & Viral Motion',
    category: 'Video',
    tagline: 'High-Retention Instagram Reels, YouTube Shorts & Commercial Films',
    icon: 'bi-easel',
    accentColor: '#20c997',
    startingPrice: 25000,
    deliveryTime: '48 - 72 Hours',
    overview: 'Dominate social feeds with scroll-stopping short-form reels and long-form brand explainers. We script, edit, animate, and grade professional video assets optimized for algorithmic retention and click-throughs.',
    deliverables: [
      '15 to 30 High-Energy Vertical Reels / Shorts per Month',
      'Kinetic Animated Subtitles & Highlight Effects',
      'Custom Sound Design, Licensed Background Beats & Voiceovers',
      'Product 3D Mockup Animations & Visual Overlays',
      'YouTube 4K Widescreen Long-Form Video Production',
      'Click-Optimized YouTube Custom Thumbnails',
    ],
    technologies: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'ElevenLabs AI', 'CapCut Pro Studio'],
    targetAudience: ['D2C Brands', 'Fitness & Coaches', 'Tech Startups', 'Restaurants & Hospitality', 'Influencers & Creators'],
    features: [
      { title: 'First 3-Second Retention Hooks', desc: 'Engineered intros that stop users from scrolling past your video.' },
      { title: 'Multilingual Audio Stems', desc: 'Instant regional language dubbing with natural human pacing.' },
      { title: 'Color Grading Mastery', desc: 'Cinematic color treatment enhancing product appeal and brand luxury.' },
    ],
  },
  {
    id: 'ai-websites',
    title: 'Modern Web Engineering & E-Commerce',
    category: 'Web & Tech',
    tagline: 'Lightning-Fast Headless Websites, Web Apps & Dynamic Portals',
    icon: 'bi-broadcast',
    accentColor: '#fd7e14',
    startingPrice: 35000,
    deliveryTime: '7 - 14 Business Days',
    overview: 'From high-converting landing pages to full-scale e-commerce stores and custom business dashboards, we build responsive, secure, SEO-optimized web experiences engineered with modern React and high-availability cloud servers.',
    deliverables: [
      'Custom Responsive Web Design (Mobile, Tablet, Desktop)',
      'Under 1-Second Core Web Vitals Load Time Guarantee',
      'Payment Gateway Integration (Razorpay, Stripe, UPI QR, Cashfree)',
      'WhatsApp Live Chat & Automated CRM Lead Capture',
      'Comprehensive On-Page SEO & Schema.org Rich Snippets',
      '1 Year High-Speed Cloud SSD Hosting & SSL Certificate Included',
    ],
    technologies: ['React 18+', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Cloudflare'],
    targetAudience: ['Corporate Enterprises', 'Exporters & Manufacturers', 'Local Service Providers', 'Online Stores', 'Professional Consultancies'],
    features: [
      { title: 'No Bloat Guarantee', desc: 'Zero sluggish plugins—clean, hand-crafted code that ranks on Google.' },
      { title: 'Integrated Client Portal', desc: 'Real-time project milestone tracking and automated GST invoice downloads.' },
      { title: '24/7 Security & Backups', desc: 'Automated daily cloud backups and DDoS firewall protection.' },
    ],
  },
  {
    id: 'ai-branding',
    title: 'AI Brand Identity & Corporate Print',
    category: 'Branding',
    tagline: 'Timeless Logo Design, Brand Guidelines & Luxury Corporate Stationery',
    icon: 'bi-bounding-box-circles',
    accentColor: '#df1529',
    startingPrice: 20000,
    deliveryTime: '3 - 5 Business Days',
    overview: 'Establish an unforgettable corporate presence. We develop distinctive visual identities, trademark-cleared logo marks, luxury embossed business cards, and comprehensive brand books that inspire trust and justify premium pricing.',
    deliverables: [
      '5 Unique Creative Logo Concepts & Unlimited Refinements',
      'Master Brand Identity Guidelines (Colors, Typography, Usage Rules)',
      'Executive Business Cards with QR Digital Contact Sync',
      'Corporate Letterhead, Envelopes & Official Invoice Templates',
      'Signage, Vehicle Graphics & Merchandise Apparel Mockups',
      'All Master Vector Files (AI, EPS, SVG, PDF, PNG, JPG)',
    ],
    technologies: ['Adobe Illustrator', 'InDesign', 'Figma', 'Photoshop', 'VectorCraft Pro'],
    targetAudience: ['New Startups', 'Rebranding Enterprises', 'Law & Advisory Firms', 'Real Estate Developers', 'Manufacturing Groups'],
    features: [
      { title: 'Trademark Search Pre-Check', desc: 'Every concept is checked to ensure original trademark clearance.' },
      { title: 'Complete Brand System', desc: 'Cohesive guidelines ensuring every employee applies your identity properly.' },
      { title: 'Print-Ready Certification', desc: 'Guaranteed CMYK color accuracy across all commercial printing presses.' },
    ],
  },
  {
    id: 'ai-leads',
    title: 'AI Lead Funnels & Meta/Google Ads',
    category: 'Growth & Ads',
    tagline: 'High-Intent Customer Acquisition Engines with Guaranteed ROI',
    icon: 'bi-calendar4-week',
    accentColor: '#6610f2',
    startingPrice: 30000,
    deliveryTime: 'Campaign Setup in 48 Hours',
    overview: 'Stop wasting money on empty vanity clicks. We architect high-converting paid acquisition funnels across Google Search, Meta (Instagram/Facebook), and LinkedIn, delivering pre-qualified buyer inquiries directly to your sales team.',
    deliverables: [
      'Comprehensive Competitor Ad Intelligence & Keyword Research',
      'High-Converting Landing Page Design with Lead Capture Forms',
      'Ad Copywriting & Creative Design (15 Variations for A/B Testing)',
      'Meta Pixel, Google Tag Manager & Conversions API Setup',
      'Automated Lead Notification via WhatsApp & Email in Real-Time',
      'Weekly Transparent Performance Dashboards & CPA Optimization',
    ],
    technologies: ['Meta Ads Manager', 'Google Ads', 'GA4 Analytics', 'Zapier Automation', 'LeadSquared CRM'],
    targetAudience: ['Real Estate Builders', 'B2B Service Providers', 'Interior Designers', 'Hospitals & Specialized Clinics', 'Financial Advisors'],
    features: [
      { title: 'Ultra-Granular Targeting', desc: 'Pinpoint targeting by exact pin-code, purchasing power, and search intent.' },
      { title: 'Automated Lead Qualification', desc: 'Filter out tire-kickers with smart multi-step enquiry questions.' },
      { title: 'CPA Reduction Guarantee', desc: 'Targeted ad optimization to drive down cost per acquired lead.' },
    ],
  },
  {
    id: 'ai-automations',
    title: 'AI Business Automations & Chatbots',
    category: 'Automation',
    tagline: '24/7 Intelligent Customer Care, WhatsApp Bots & Workflow Integration',
    icon: 'bi-chat-square-text',
    accentColor: '#f3268c',
    startingPrice: 28000,
    deliveryTime: '5 - 10 Business Days',
    overview: 'Eliminate repetitive manual tasks. We implement conversational AI chatbots, automated appointment booking systems, and seamless workflow integrations that respond to customer inquiries within seconds, even when you are asleep.',
    deliverables: [
      'Custom WhatsApp Business API Chatbot with Green Tick Support',
      'Website Interactive AI Chat Assistant trained on your Business Data',
      'Automated Invoice & Payment Reminder System',
      'Google Sheets / CRM Two-Way Data Synchronization',
      'Calendar Scheduling & Appointment Booking Automation',
      'Staff Training & 6 Months Maintenance Support',
    ],
    technologies: ['Python', 'OpenAI / Gemini API', 'WhatsApp Cloud API', 'Make.com', 'Zapier', 'Node.js'],
    targetAudience: ['Service Agencies', 'Clinics & Dentists', 'Hotels & Resorts', 'Educational Academies', 'Logistics Companies'],
    features: [
      { title: '24/7/365 Instant Response', desc: 'Zero waiting time for prospective customers seeking price quotes.' },
      { title: 'Human Handover Protocol', desc: 'Seamlessly transfers complex inquiries to live human staff.' },
      { title: 'Data Privacy & Security', desc: 'Strict encryption standards safeguarding all customer conversations.' },
    ],
  },
];
