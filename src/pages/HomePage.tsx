import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { ValuesSection } from '../components/ValuesSection';
import { StatsSection } from '../components/StatsSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { ServicesSection } from '../components/ServicesSection';
import { FaqSection } from '../components/FaqSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { TeamSection } from '../components/TeamSection';
import { ClientsSection } from '../components/ClientsSection';
import { BlogSection } from '../components/BlogSection';
import { ContactSection } from '../components/ContactSection';
import { ServiceItem } from '../types';
import { useNavigation } from '../context/NavigationContext';
import { ArrowRight, Sparkles, Layers, Briefcase, Users, FileText } from 'lucide-react';

interface HomePageProps {
  onWatchVideo: () => void;
  onOpenEnquiry: (service?: ServiceItem | null) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onWatchVideo, onOpenEnquiry }) => {
  const { navigateTo } = useNavigation();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <HeroSection
        onWatchVideo={onWatchVideo}
        onGetStarted={() => onOpenEnquiry(null)}
      />

      {/* Core Values Section */}
      <ValuesSection />

      {/* About Section Teaser with Button to Full About Page */}
      <div className="position-relative">
        <AboutSection onGetStarted={() => onOpenEnquiry(null)} />
        <div className="container text-center pb-5">
          <button
            onClick={() => navigateTo('about')}
            className="btn btn-outline-primary px-4 py-2 rounded-pill fw-semibold shadow-sm d-inline-flex align-items-center gap-2"
          >
            <span>Learn More About Our Story & Leadership</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Live Counter Stats */}
      <StatsSection />

      {/* Services Section with Direct Link to Dedicated Services Page */}
      <div className="position-relative">
        <ServicesSection onSelectService={(service) => onOpenEnquiry(service)} />
        <div className="container text-center pb-5">
          <button
            onClick={() => navigateTo('services')}
            className="btn btn-primary px-4 py-2.5 rounded-pill fw-semibold shadow d-inline-flex align-items-center gap-2"
            style={{ backgroundColor: '#4154f1', borderColor: '#4154f1' }}
          >
            <Layers size={18} />
            <span>Explore All Services, Pricing & Custom Packages</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Features & Why Us Section */}
      <div className="position-relative">
        <FeaturesSection />
        <div className="container text-center pb-5">
          <button
            onClick={() => navigateTo('features')}
            className="btn btn-outline-dark px-4 py-2 rounded-pill fw-semibold shadow-sm d-inline-flex align-items-center gap-2"
          >
            <Sparkles size={16} className="text-warning" />
            <span>View Enterprise Features & Agency Comparison</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Work Gallery Teaser Strip */}
      <section className="py-5 bg-light border-top border-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span className="badge bg-primary px-3 py-1 rounded-pill text-uppercase mb-2">Our Portfolio</span>
              <h3 className="fw-bold text-dark mb-2">Explore 500+ High-Performance Projects</h3>
              <p className="text-muted mb-lg-0">
                From viral reels and festival poster campaigns to custom e-commerce web applications and B2B ad funnels.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <button
                onClick={() => navigateTo('gallery')}
                className="btn btn-primary px-4 py-2.5 rounded-pill fw-semibold shadow-sm d-inline-flex align-items-center gap-2"
                style={{ backgroundColor: '#4154f1', borderColor: '#4154f1' }}
              >
                <Briefcase size={18} />
                <span>Open Work Gallery</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqSection />

      {/* Client Testimonials */}
      <TestimonialsSection />

      {/* Team Section with Link to Team Webpage */}
      <div className="position-relative">
        <TeamSection />
        <div className="container text-center pb-5">
          <button
            onClick={() => navigateTo('team')}
            className="btn btn-outline-primary px-4 py-2 rounded-pill fw-semibold shadow-sm d-inline-flex align-items-center gap-2"
          >
            <Users size={16} />
            <span>Meet Our Complete Team & Culture</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Trusted Client Logos */}
      <ClientsSection />

      {/* Blog Section with Link to Blog Webpage */}
      <div className="position-relative">
        <BlogSection />
        <div className="container text-center pb-5">
          <button
            onClick={() => navigateTo('blog')}
            className="btn btn-outline-primary px-4 py-2 rounded-pill fw-semibold shadow-sm d-inline-flex align-items-center gap-2"
          >
            <FileText size={16} />
            <span>Read All Articles & Guides</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};
