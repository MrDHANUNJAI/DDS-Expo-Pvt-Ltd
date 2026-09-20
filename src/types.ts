export interface StatItem {
  id: string;
  count: number;
  label: string;
  icon: string;
  color: string;
}

export interface ValueCard {
  id: string;
  img: string;
  title: string;
  desc: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  className: string;
  accentColor: string;
  badge?: string;
  link?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  text: string;
  author: string;
  location: string;
  stars: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  socials: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  image: string;
  link: string;
}

export type PageRoute =
  | 'home'
  | 'about'
  | 'services'
  | 'features'
  | 'testimonials'
  | 'team'
  | 'blog'
  | 'gallery'
  | 'careers'
  | 'contact'
  | 'portal';
