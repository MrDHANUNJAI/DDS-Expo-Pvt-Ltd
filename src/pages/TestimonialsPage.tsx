import React, { useState, useEffect, useMemo } from 'react';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  TrendingUp,
  Award,
  CheckCircle2,
  Building2,
  Users,
  ArrowRight,
  ShieldCheck,
  Quote,
  Sparkles,
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

interface TestimonialStory {
  id: string;
  clientName: string;
  role: string;
  company: string;
  location: string;
  industry: 'E-Commerce' | 'Healthcare' | 'Real Estate' | 'Tech & SaaS' | 'Education' | 'Retail';
  rating: number;
  avatar: string;
  initials: string;
  color: string;
  metricLabel: string;
  metricValue: string;
  secondaryMetric: string;
  servicesUsed: string[];
  headline: string;
  challenge: string;
  solution: string;
  resultQuote: string;
  date: string;
  verified: boolean;
}

const SUCCESS_STORIES: TestimonialStory[] = [
  {
    id: 'story-1',
    clientName: 'Rajesh Varma',
    role: 'Managing Director',
    company: 'Apex Ortho & Super Specialty Hospitals',
    location: 'Visakhapatnam & Hyderabad',
    industry: 'Healthcare',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    initials: 'RV',
    color: '#4154f1',
    metricLabel: 'Patient Appointments',
    metricValue: '+420%',
    secondaryMetric: '₹340 Avg Cost per Lead',
    servicesUsed: ['Meta Ads Funnels', 'Doctor Video Reels', 'Local SEO Map Ranking'],
    headline: 'From empty surgical consult slots to 120+ weekly high-intent patient inquiries',
    challenge: 'High dependency on offline banners and word-of-mouth with zero digital attribution and rising local competition.',
    solution: 'DDS Expo deployed a geo-targeted algorithmic Meta ad campaign paired with 15-second doctor advice reels addressing joint pain and robotic surgery.',
    resultQuote: 'DDS Expo transformed our hospital patient flow in under 45 days. Our surgical theater occupancy grew by 3.8x, and our cost per patient inquiry dropped from ₹1,200 to just ₹340. The team operates with medical precision.',
    date: 'February 2026',
    verified: true,
  },
  {
    id: 'story-2',
    clientName: 'Sneha Reddy',
    role: 'Founder & CEO',
    company: 'SilkWeave Luxury Sarees',
    location: 'Bangalore & Vijayawada',
    industry: 'E-Commerce',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    initials: 'SR',
    color: '#ec4899',
    metricLabel: 'Festival Sales GMV',
    metricValue: '₹3.8 Cr',
    secondaryMetric: '4.9x Blended ROAS',
    servicesUsed: ['Shopify Headless Store', 'Festival Posters', 'Instagram Viral Hooks', 'Google Shopping Ads'],
    headline: 'Scaling from ₹12 Lakhs/month to ₹1.2 Crores/month with zero ad spend leakage',
    challenge: 'Abandoned carts exceeded 82% due to slow mobile loading speeds and generic product ads that failed to evoke ethnic luxury.',
    solution: 'Re-architected their digital presence with sub-second headless web engineering, cinematic 3-second hook draping reels, and algorithmic dynamic retargeting.',
    resultQuote: 'We scaled our festive Diwali and wedding collection to ₹3.8 Crores in 60 days. The ROAS never dipped below 4.5x even when our daily ad spend reached ₹1.5 Lakhs. DDS Expo feels like our internal CMO team.',
    date: 'January 2026',
    verified: true,
  },
  {
    id: 'story-3',
    clientName: 'Karthik Rao',
    role: 'VP of Marketing',
    company: 'Skyline Urban Infra & Villas',
    location: 'Visakhapatnam Sea Breeze Phase 2',
    industry: 'Real Estate',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    initials: 'KR',
    color: '#0284c7',
    metricLabel: 'Villa Inventory Sold',
    metricValue: '100% Sold Out',
    secondaryMetric: '48 Luxury Units in 90 Days',
    servicesUsed: ['3D Architectural Video Tours', 'HNWI B2B Targeting', 'Instant CRM Sync'],
    headline: '48 ultra-luxury sea-facing villas completely sold out 4 months ahead of schedule',
    challenge: 'High-ticket inventory (₹2.5 Cr+ units) requiring verified HNWI and NRI buyers rather than unqualified casual clicks.',
    solution: 'Designed immersive cinematic drone walk-throughs, launched income-bracket verified Meta & Google Search funnels, and connected inquiries directly to the sales closing team via DDS ERP.',
    resultQuote: 'In luxury real estate, 95% of digital leads are usually wasted tyre-kickers. DDS Expo pre-qualified leads through interactive WhatsApp bots. All 48 villas sold out four months ahead of our bank finance deadline.',
    date: 'December 2025',
    verified: true,
  },
  {
    id: 'story-4',
    clientName: 'Dr. Arvind Menon',
    role: 'Dean & Co-Founder',
    company: 'NextGen Coding & Robotics Academy',
    location: 'Hyderabad & Chennai',
    industry: 'Education',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    initials: 'AM',
    color: '#10b981',
    metricLabel: 'Student Enrollments',
    metricValue: '3,200+ Students',
    secondaryMetric: '62% Lower Acquisition Cost',
    servicesUsed: ['Interactive Landing Pages', 'Webinar Funnel Ads', 'Parent Testimonial Reels'],
    headline: 'Filling physical batches across 6 campuses with predictable weekend enrollment drives',
    challenge: 'High student drop-off rate between registration and trial class attendance.',
    solution: 'Implemented an automated SMS/WhatsApp nurturing loop combined with student project showcase ads targeting parents interested in STEM education.',
    resultQuote: 'Our cost per student acquisition plummeted by 62%. Parents frequently mention our high-energy project videos when walking into our campuses. DDS Expo understands the psychology of consumer education.',
    date: 'November 2025',
    verified: true,
  },
  {
    id: 'story-5',
    clientName: 'Vikram Joshi',
    role: 'Chief Technology Officer',
    company: 'LogiTrack SaaS Cloud Solutions',
    location: 'Mumbai & Singapore',
    industry: 'Tech & SaaS',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    initials: 'VJ',
    color: '#8b5cf6',
    metricLabel: 'B2B Demo Bookings',
    metricValue: '+290%',
    secondaryMetric: '₹8.4 Cr Qualified Pipeline',
    servicesUsed: ['LinkedIn Account-Based Ads', 'Technical Whitepaper SEO', 'Headless Web Portal'],
    headline: 'Generating 45+ enterprise logistics demos monthly for our B2B SaaS platform',
    challenge: 'Long enterprise sales cycle with low organic search visibility for high-intent supply chain keywords.',
    solution: 'Revamped the product positioning with programmatic technical SEO pages and precision LinkedIn account-based marketing targeting enterprise logistics directors.',
    resultQuote: 'Most agencies don’t grasp B2B technology nuance. DDS Expo spoke our engineering language from day one. They generated over ₹8 Crores in qualified sales pipeline within 4 months.',
    date: 'October 2025',
    verified: true,
  },
  {
    id: 'story-6',
    clientName: 'Bhavna Kulkarni',
    role: 'Retail Operations Head',
    company: 'Organic Roots Daily Marts',
    location: 'Andhra Pradesh & Telangana',
    industry: 'Retail',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    initials: 'BK',
    color: '#f59e0b',
    metricLabel: 'Daily Store Footfalls',
    metricValue: '+310%',
    secondaryMetric: '14 Retail Locations Active',
    servicesUsed: ['Geo-Radius Hyperlocal Ads', 'Festival Offer Banners', 'WhatsApp Broadcasts'],
    headline: 'Dominating 2-km store radiuses with instant daily vegetable & grocery discount alerts',
    challenge: 'Heavy footfall leakage to quick-commerce delivery apps and unorganized local markets.',
    solution: 'Executed automated daily flash-offer graphics delivered via localized Instagram story ads within 2 kilometers of each store location.',
    resultQuote: 'Our store managers reported immediate lines forming for morning discount hours. DDS Expo makes hyper-local advertising painless, reliable, and ridiculously profitable.',
    date: 'September 2025',
    verified: true,
  },
];

const INDUSTRIES = ['All Industries', 'E-Commerce', 'Healthcare', 'Real Estate', 'Tech & SaaS', 'Education', 'Retail'] as const;

export const TestimonialsPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All Industries');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Filtered list based on industry selection
  const filteredStories = useMemo(() => {
    if (selectedIndustry === 'All Industries') return SUCCESS_STORIES;
    return SUCCESS_STORIES.filter((s) => s.industry === selectedIndustry);
  }, [selectedIndustry]);

  // Adjust active index if filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedIndustry]);

  // Autoplay carousel timer
  useEffect(() => {
    if (!isAutoPlaying || filteredStories.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredStories.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, filteredStories.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredStories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredStories.length);
  };

  const currentStory = filteredStories[currentIndex] || SUCCESS_STORIES[0];

  return (
    <div className="testimonials-page bg-light min-vh-100 py-5">
      {/* Page Header */}
      <section className="container mb-5">
        <div className="row justify-content-center text-center">
          <div className="col-lg-9 col-xl-8">
            <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-1.5 rounded-pill text-uppercase fw-semibold mb-3 d-inline-flex align-items-center gap-1.5">
              <Sparkles size={14} />
              <span>Verified Client Success Stories</span>
            </span>
            <h1 className="display-5 fw-bold text-dark mb-3 tracking-tight">
              Real Brands. Measurable ROAS. <br />
              <span style={{ color: '#4154f1' }}>Unmatched Revenue Growth.</span>
            </h1>
            <p className="lead text-muted mb-4">
              Explore how our data-backed campaigns, sub-second web engineering, and viral creative strategies transform ambitious Indian enterprises into category market leaders.
            </p>

            {/* Quick Aggregate Stats Strip */}
            <div className="row g-3 justify-content-center pt-2">
              <div className="col-6 col-md-3">
                <div className="p-3 bg-white rounded-3 shadow-xs border text-center">
                  <div className="d-flex align-items-center justify-content-center gap-1 text-warning mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <div className="fw-bold text-dark fs-5">4.9 / 5.0</div>
                  <div className="text-muted small">500+ Verified Reviews</div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="p-3 bg-white rounded-3 shadow-xs border text-center">
                  <TrendingUp size={20} className="text-primary mb-1 mx-auto" />
                  <div className="fw-bold text-dark fs-5">+340%</div>
                  <div className="text-muted small">Average Client ROAS</div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="p-3 bg-white rounded-3 shadow-xs border text-center">
                  <Award size={20} className="text-success mb-1 mx-auto" />
                  <div className="fw-bold text-dark fs-5">₹18+ Crores</div>
                  <div className="text-muted small">Tracked Client Pipeline</div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="p-3 bg-white rounded-3 shadow-xs border text-center">
                  <ShieldCheck size={20} className="text-info mb-1 mx-auto" />
                  <div className="fw-bold text-dark fs-5">98.4%</div>
                  <div className="text-muted small">Retainer Retention Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Carousel Section */}
      <section className="container mb-5">
        {/* Industry Filter Pills */}
        <div className="d-flex flex-wrap align-items-center justify-content-center gap-2 mb-4">
          {INDUSTRIES.map((ind) => (
            <button
              key={ind}
              onClick={() => setSelectedIndustry(ind)}
              className={`btn btn-sm rounded-pill px-3 py-2 fw-medium transition ${
                selectedIndustry === ind
                  ? 'btn-primary shadow-sm text-white'
                  : 'btn-outline-secondary bg-white text-muted border'
              }`}
              style={selectedIndustry === ind ? { backgroundColor: '#4154f1', borderColor: '#4154f1' } : {}}
            >
              {ind}
            </button>
          ))}
        </div>

        {/* Carousel Showcase Card */}
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden bg-white position-relative">
          {/* Top Decorative Border Accent */}
          <div
            style={{
              height: '5px',
              background: 'linear-gradient(90deg, #4154f1 0%, #00d2ff 50%, #7928ca 100%)',
            }}
          />

          <div className="card-body p-4 p-lg-5">
            <div className="row g-4 align-items-center">
              {/* Left Column: Client Avatar, Company & High-Impact Metric */}
              <div className="col-lg-4 border-lg-end pe-lg-4 text-center text-lg-start">
                <div className="d-flex flex-column align-items-center align-items-lg-start">
                  {/* Avatar with verified badge */}
                  <div className="position-relative mb-3">
                    <img
                      src={currentStory.avatar}
                      alt={currentStory.clientName}
                      className="rounded-circle shadow-sm border border-3 border-white object-cover"
                      style={{ width: '90px', height: '90px' }}
                      onError={(e) => {
                        // Fallback to stylized initials if Unsplash image fails
                        e.currentTarget.style.display = 'none';
                        const fallback = document.getElementById(`fallback-${currentStory.id}`);
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div
                      id={`fallback-${currentStory.id}`}
                      className="rounded-circle shadow-sm border border-3 border-white align-items-center justify-content-center text-white fw-bold fs-4"
                      style={{
                        width: '90px',
                        height: '90px',
                        backgroundColor: currentStory.color,
                        display: 'none',
                      }}
                    >
                      {currentStory.initials}
                    </div>

                    <div
                      className="position-absolute bottom-0 end-0 bg-success text-white rounded-circle p-1 d-flex align-items-center justify-content-center border border-2 border-white"
                      title="Verified Client Case"
                    >
                      <CheckCircle2 size={14} />
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="d-flex align-items-center gap-1 text-warning mb-2">
                    {[...Array(currentStory.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                    <span className="ms-1 fw-bold text-dark small">5.0</span>
                  </div>

                  {/* Client Info */}
                  <h4 className="fw-bold text-dark mb-1">{currentStory.clientName}</h4>
                  <p className="text-muted small mb-1">{currentStory.role}</p>
                  <div className="d-flex align-items-center gap-1.5 text-primary fw-semibold small mb-2">
                    <Building2 size={14} />
                    <span>{currentStory.company}</span>
                  </div>
                  <span className="badge bg-secondary-subtle text-secondary small rounded-pill px-2.5 py-1 mb-4">
                    {currentStory.location} • {currentStory.industry}
                  </span>

                  {/* Impact Metric Box */}
                  <div className="w-100 p-3 rounded-3 bg-light border text-center text-lg-start">
                    <div className="text-muted small fw-semibold text-uppercase tracking-wider">
                      {currentStory.metricLabel}
                    </div>
                    <div className="display-6 fw-bold text-primary my-1" style={{ color: '#4154f1' }}>
                      {currentStory.metricValue}
                    </div>
                    <div className="text-success small fw-medium d-flex align-items-center justify-content-center justify-content-lg-start gap-1">
                      <CheckCircle2 size={14} />
                      <span>{currentStory.secondaryMetric}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Case Story, Challenge, Solution & Quote */}
              <div className="col-lg-8 ps-lg-4">
                {/* Services Tags */}
                <div className="d-flex flex-wrap gap-1.5 mb-3">
                  {currentStory.servicesUsed.map((srv, idx) => (
                    <span
                      key={idx}
                      className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-2.5 py-1 small fw-medium"
                    >
                      {srv}
                    </span>
                  ))}
                  <span className="badge bg-light text-muted border rounded-pill px-2.5 py-1 small">
                    {currentStory.date}
                  </span>
                </div>

                {/* Main Headline */}
                <h3 className="fw-bold text-dark mb-3 lh-sm">
                  "{currentStory.headline}"
                </h3>

                {/* Challenge & Solution Mini-Bento */}
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <div className="p-3 rounded-3 bg-danger-subtle bg-opacity-25 border border-danger-subtle h-100">
                      <div className="fw-bold text-danger small text-uppercase mb-1">The Challenge</div>
                      <p className="text-dark small mb-0 lh-base">{currentStory.challenge}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-3 rounded-3 bg-success-subtle bg-opacity-25 border border-success-subtle h-100">
                      <div className="fw-bold text-success small text-uppercase mb-1">The DDS Solution</div>
                      <p className="text-dark small mb-0 lh-base">{currentStory.solution}</p>
                    </div>
                  </div>
                </div>

                {/* Testimonial Quote */}
                <div className="p-3.5 rounded-3 bg-light position-relative border-start border-4 border-primary">
                  <Quote size={24} className="text-primary opacity-25 position-absolute top-2 end-3" />
                  <p className="text-dark fst-italic mb-0 small lh-base">
                    "{currentStory.resultQuote}"
                  </p>
                </div>
              </div>
            </div>

            {/* Carousel Navigation & Status Footer */}
            <div className="d-flex flex-wrap justify-content-between align-items-center pt-4 mt-4 border-top">
              {/* Slide Counter & Dots */}
              <div className="d-flex align-items-center gap-3">
                <span className="text-muted small fw-semibold">
                  Story <strong className="text-dark">{currentIndex + 1}</strong> of {filteredStories.length}
                </span>
                <div className="d-flex gap-1.5">
                  {filteredStories.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`btn p-0 rounded-pill transition ${
                        currentIndex === i ? 'bg-primary' : 'bg-secondary-subtle'
                      }`}
                      style={{
                        width: currentIndex === i ? '24px' : '8px',
                        height: '8px',
                        border: 'none',
                      }}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Prev / Next & Pause Controls */}
              <div className="d-flex align-items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAutoPlaying((prev) => !prev)}
                  className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '36px', height: '36px' }}
                  title={isAutoPlaying ? 'Pause Autoplay' : 'Resume Autoplay'}
                  aria-label={isAutoPlaying ? 'Pause Autoplay' : 'Resume Autoplay'}
                >
                  {isAutoPlaying ? <Pause size={14} /> : <Play size={14} />}
                </button>

                <button
                  type="button"
                  onClick={handlePrev}
                  className="btn btn-sm btn-outline-primary rounded-circle d-flex align-items-center justify-content-center shadow-xs"
                  style={{ width: '36px', height: '36px' }}
                  aria-label="Previous Story"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="btn btn-sm btn-primary rounded-circle d-flex align-items-center justify-content-center shadow-xs"
                  style={{ width: '36px', height: '36px', backgroundColor: '#4154f1', borderColor: '#4154f1' }}
                  aria-label="Next Story"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of More Verified Reviews */}
      <section className="container mb-5">
        <div className="text-center mb-4">
          <h3 className="fw-bold text-dark mb-1">More Endorsements Across Industries</h3>
          <p className="text-muted small">Direct reviews from founders, marketing directors, and hospital administrators.</p>
        </div>

        <div className="row g-4">
          {SUCCESS_STORIES.slice(0, 3).map((item) => (
            <div key={`grid-${item.id}`} className="col-md-4">
              <div className="card h-100 border-0 shadow-sm rounded-3 p-4 bg-white hover-shadow transition">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex text-warning">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <span className="badge bg-light text-muted small border">{item.industry}</span>
                </div>
                <p className="text-dark small fst-italic mb-3 flex-grow-1">
                  "{item.resultQuote.slice(0, 160)}..."
                </p>
                <div className="d-flex align-items-center gap-2.5 pt-3 border-top">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold small"
                    style={{ width: '36px', height: '36px', backgroundColor: item.color }}
                  >
                    {item.initials}
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-0 small">{item.clientName}</h6>
                    <span className="text-muted extra-small">{item.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Conversion CTA */}
      <section className="container">
        <div
          className="rounded-4 p-4 p-md-5 text-center text-white position-relative overflow-hidden shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #012970 0%, #1e3a8a 50%, #4154f1 100%)',
          }}
        >
          <div className="position-relative z-1 max-w-2xl mx-auto">
            <span className="badge bg-white/20 text-white px-3 py-1 rounded-pill small mb-3">
              Ready to Accelerate Your Growth?
            </span>
            <h2 className="display-6 fw-bold mb-3 text-white">
              Ready to Become Our Next Success Story?
            </h2>
            <p className="lead text-white/80 mb-4 fs-6">
              Get an instant ROI evaluation and personalized campaign roadmap tailored to your industry, budget, and business milestones.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <button
                onClick={() => navigateTo('services')}
                className="btn btn-light text-primary px-4 py-2.5 rounded-pill fw-bold shadow-sm d-inline-flex align-items-center gap-2"
              >
                <span>Explore Packages &amp; Pricing</span>
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className="btn btn-outline-light px-4 py-2.5 rounded-pill fw-semibold d-inline-flex align-items-center gap-2"
              >
                <span>Request Custom RFP</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
