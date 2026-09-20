import {
  StatItem,
  ValueCard,
  ServiceItem,
  FAQItem,
  Testimonial,
  TeamMember,
  BlogPost,
} from '../types';

export const STATS: StatItem[] = [
  {
    id: 'clients',
    count: 232,
    label: 'Happy Clients',
    icon: 'bi-emoji-smile',
    color: '#4154f1',
  },
  {
    id: 'projects',
    count: 521,
    label: 'Projects',
    icon: 'bi-journal-richtext',
    color: '#ee6c20',
  },
  {
    id: 'hours',
    count: 1463,
    label: 'Hours Of Support',
    icon: 'bi-headset',
    color: '#15be56',
  },
  {
    id: 'workers',
    count: 15,
    label: 'Smart Workers',
    icon: 'bi-people',
    color: '#bb0852',
  },
];

export const VALUES: ValueCard[] = [
  {
    id: 'val-1',
    img: '/assets/img/values-1.png',
    title: '100% Data-Driven',
    desc: 'AI analyzes market trends, competitor strategies, and user behavior in real time.',
  },
  {
    id: 'val-2',
    img: '/assets/img/values-2.png',
    title: 'Ultra-Targeted Ads',
    desc: 'AI understands your audience better than anyone, ensuring maximum ROI on every campaign.',
  },
  {
    id: 'val-3',
    img: '/assets/img/values-3.png',
    title: 'Cost-Effective & Scalable',
    desc: 'AI reduces costs, eliminates manual work, and scales your business effortlessly.',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'ai-creatives',
    title: 'AI Creatives',
    description: 'Stunning, high-quality flyers & graphics designed effectively using AI.',
    icon: 'bi-activity',
    className: 'item-cyan',
    accentColor: '#0dcaf0',
  },
  {
    id: 'ai-videos',
    title: 'AI Videos',
    description: 'Engaging, professional-grade videos created in seconds with AI precision.',
    icon: 'bi-easel',
    className: 'item-teal',
    accentColor: '#20c997',
  },
  {
    id: 'ai-websites',
    title: 'AI Websites',
    description: 'SEO-optimized, high-converting content crafted by AI for blogs, ads & websites.',
    icon: 'bi-broadcast',
    className: 'item-orange',
    accentColor: '#fd7e14',
  },
  {
    id: 'ai-branding',
    title: 'AI Branding',
    description: 'AI-driven logos, brand identity & strategy to make your business stand out.',
    icon: 'bi-bounding-box-circles',
    className: 'item-red',
    accentColor: '#df1529',
  },
  {
    id: 'ai-leads',
    title: 'AI Leads',
    description: 'Smart AI-powered lead funnels that attract & convert high-quality leads.',
    icon: 'bi-calendar4-week',
    className: 'item-indigo',
    accentColor: '#6610f2',
  },
  {
    id: 'ai-automations',
    title: 'AI Automations',
    description: 'AI-powered workflow & marketing automation for efficiency and growth.',
    icon: 'bi-chat-square-text',
    className: 'item-pink',
    accentColor: '#f3268c',
  },
];

export const FEATURES_LIST = [
  'AI-Generated Content',
  'AI-Powered SEO',
  'AI-Driven Video Marketing',
  'AI-Optimized Ads',
  'AI E-Commerce Growth',
  'AI-Powered Analytics',
];

export const ALT_FEATURES_LIST = [
  {
    icon: 'bi-award',
    title: '100% AI-Driven Execution',
    desc: 'No manual errors, only flawless AI precision.',
  },
  {
    icon: 'bi-dribbble',
    title: 'Affordable & Scalable',
    desc: 'Get premium AI-powered digital marketing at a fraction of the cost.',
  },
  {
    icon: 'bi-filter-circle',
    title: 'Proven Success',
    desc: 'AI-backed campaigns that guarantee higher conversions & lower ad costs.',
  },
  {
    icon: 'bi-lightning-charge',
    title: 'AI-Backed Decision Making',
    desc: 'Every move is based on AI-driven data & trends, ensuring consistent growth.',
  },
  {
    icon: 'bi-card-checklist',
    title: 'Real-Time Strategy Adjustments',
    desc: 'AI analyzes & updates campaigns every second for maximum performance.',
  },
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What makes AI-powered digital marketing different from traditional marketing?',
    answer:
      'AI automates campaigns, optimizes ads in real time, generates high-quality content instantly, and improves targeting accuracy—leading to better results with less effort.',
  },
  {
    id: 'faq-2',
    question: 'How does AI create content, videos, and branding?',
    answer:
      'AI analyzes industry trends, competitors, and audience preferences to generate SEO-optimized content, eye-catching creatives, and professional branding assets within minutes.',
  },
  {
    id: 'faq-3',
    question: 'Can AI-generated content rank on Google?',
    answer:
      'Absolutely! AI tools ensure that all content follows SEO best practices, using the right keywords, structure, and optimization techniques to boost search rankings.',
  },
  {
    id: 'faq-4',
    question: 'How does AI help in lead generation?',
    answer:
      'AI tracks user behavior, analyzes demographics, and automates lead capture via smart forms, chatbots, and AI-powered ad targeting—ensuring high-quality leads.',
  },
  {
    id: 'faq-5',
    question: 'How secure is AI-driven marketing automation?',
    answer:
      'We use industry-standard encryption & GDPR-compliant AI tools to protect client data while automating marketing processes.',
  },
  {
    id: 'faq-6',
    question: 'Can AI help with personalized marketing campaigns?',
    answer:
      'Yes! AI analyzes customer behavior and delivers highly personalized ads, emails, and content, leading to higher engagement and conversions.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    text: 'Thanks to DDS Expo’s AI-driven Google Ads and location-based targeting, our local foot traffic increased by 50% in just two months! It’s amazing how AI can refine audience targeting so precisely.',
    author: 'Mr. Arjun',
    location: 'Visakhapatnam',
    stars: 5,
  },
  {
    id: 'test-2',
    text: 'We always struggled to create consistent content. AI-generated content suggestions and automated blog scheduling have kept our audience engaged, and our website traffic has tripled!',
    author: 'Ritika',
    location: 'Hyderabad',
    stars: 5,
  },
  {
    id: 'test-3',
    text: 'DDS Expo set up an AI chatbot for our eCommerce website, and it instantly improved customer interaction. It answers queries 24/7 and has increased our sales by 30%! AI-powered automation has made a massive impact on our business.',
    author: 'Mr. Vikram',
    location: 'Delhi',
    stars: 5,
  },
  {
    id: 'test-4',
    text: 'We struggled with generating quality leads before working with DDS Expo. After implementing AI-driven marketing strategies, our conversion rates shot up by 40% in just three months! The automated funnel system is a game-changer. Highly recommended!',
    author: 'Mr. Rahul',
    location: 'Pune',
    stars: 5,
  },
  {
    id: 'test-5',
    text: 'Managing social media was overwhelming until we switched to AI-powered scheduling and ad optimization. Now, our engagement has doubled, and our ad ROI has improved by 300%. The AI insights are spot on!',
    author: 'Neha',
    location: 'Vizag',
    stars: 5,
  },
];

export const TEAM: TeamMember[] = [
  {
    id: 'dhanunjay',
    name: 'Mr. Dhanunjay Potini',
    role: 'Founder & Chief Executive Officer',
    image: '/assets/img/team/team-1.png',
    socials: {
      twitter: 'https://x.com/ddsexpoofficial',
      facebook: 'https://www.facebook.com/ddsexpoofficial',
      instagram: 'https://www.instagram.com/dds_expo/',
      linkedin: 'https://www.linkedin.com/in/digital-dhanu-ai-11454b293/',
    },
  },
  {
    id: 'rama-devi',
    name: 'Mrs. Rama Devi Gollavilli',
    role: 'Co-Founder & Director of Operations',
    image: '/assets/img/team/team-2.png',
    socials: {
      twitter: 'https://x.com/ddsexpoofficial',
      facebook: 'https://www.facebook.com/ddsexpoofficial',
      instagram: 'https://www.instagram.com/dds_expo/',
      linkedin: 'https://www.linkedin.com/in/digital-dhanu-ai-11454b293/',
    },
  },
  {
    id: 'srikanth',
    name: 'Mr. Srikanth Potini',
    role: 'Chief Technical Advisor',
    image: '/assets/img/team/team-3.png',
    socials: {
      twitter: 'https://x.com/ddsexpoofficial',
      facebook: 'https://www.facebook.com/ddsexpoofficial',
      instagram: 'https://www.instagram.com/dds_expo/',
      linkedin: 'https://www.linkedin.com/in/digital-dhanu-ai-11454b293/',
    },
  },
  {
    id: 'sanjay',
    name: 'Mr. Sanjay Kumar',
    role: 'Head of Business Development',
    image: '/assets/img/team/team-4.png',
    socials: {
      twitter: 'https://x.com/ddsexpoofficial',
      facebook: 'https://www.facebook.com/ddsexpoofficial',
      instagram: 'https://www.instagram.com/dds_expo/',
      linkedin: 'https://www.linkedin.com/in/digital-dhanu-ai-11454b293/',
    },
  },
];

export const CLIENT_LOGOS = [
  '1.png',
  '2.png',
  '3.png',
  '4.png',
  '5.png',
  '6.png',
  '7.png',
  '8.png',
  '9.png',
  '10.png',
  '11.png',
  '12.png',
  '13.png',
  '14.png',
  '15.png',
  '16.png',
  '17.png',
  '18.png',
  '19.png',
  '20.png',
  '21.png',
  '22.png',
  '23.png',
  '24.png',
  '25.png',
  '26.png',
  '27.png',
  '28.png',
  '29.png',
  '30.png',
  '31.png',
  '32.png',
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'How AI is Revolutionizing Digital Marketing',
    author: 'Dhanunjay Potini',
    date: 'December 12',
    category: 'Technology',
    image: '/assets/img/blog/blog-1.jpg',
    link: '#',
  },
  {
    id: 'blog-2',
    title: 'Top AI Tools That Will Skyrocket Your Digital Marketing Success',
    author: 'Rama Gollavilli',
    date: 'July 17',
    category: 'Technology',
    image: '/assets/img/blog/blog-2.jpg',
    link: '#',
  },
  {
    id: 'blog-3',
    title: 'Prompt Engineering – The Skill That Powers Artificial Intelligence',
    author: 'Sanjay Kumar',
    date: 'September 05',
    category: 'Technology',
    image: '/assets/img/blog/blog-3.jpg',
    link: '#',
  },
];

export const CONTACT_DETAILS = {
  addressLines: ['Visakhapatnam', 'AP, India 531021'],
  phones: ['+91 9966994679', '+91 9618231993'],
  emails: ['info@ddsexpo.com', 'careers@ddsexpo.com'],
  openHours: ['24/7', '365 Days'],
  mapEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.265243027819!2d83.31806639999999!3d17.7321371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a39439cdd14716b%3A0x409a0c71242eccf0!2sDDS%20Expo!5e0!3m2!1sen!2sin!4v1740083344190!5m2!1sen!2sin',
};
