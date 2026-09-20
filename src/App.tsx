/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ErpProvider } from './context/ErpContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { EnquiryModal } from './components/EnquiryModal';
import { FloatingWidgets } from './components/FloatingWidgets';
import { PortalMain } from './components/portal/PortalMain';
import { ServiceItem } from './types';
import { Shield, ArrowRight } from 'lucide-react';

// Dedicated Webpages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { TeamPage } from './pages/TeamPage';
import { BlogPage } from './pages/BlogPage';
import { WorkGalleryPage } from './pages/WorkGalleryPage';
import { CareersPage } from './pages/CareersPage';
import { ContactPage } from './pages/ContactPage';
import { TestimonialsPage } from './pages/TestimonialsPage';

function AppContent() {
  const { currentPage, navigateTo } = useNavigation();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const handleSelectService = (service?: ServiceItem | null) => {
    setSelectedService(service || null);
    setIsEnquiryOpen(true);
  };

  const handleOpenGeneralEnquiry = () => {
    setSelectedService(null);
    setIsEnquiryOpen(true);
  };

  // When user is in ERP Business Portal view
  if (currentPage === 'portal') {
    return <PortalMain onBackToWebsite={() => navigateTo('home')} />;
  }

  return (
    <div className="index-page d-flex flex-column min-vh-100 position-relative">
      {/* Top Header / Navigation with active links and dropdown redirection */}
      <Navbar
        onOpenEnquiry={handleOpenGeneralEnquiry}
        onOpenPortal={() => navigateTo('portal')}
      />

      {/* Main Dynamic Webpage Switcher */}
      <main className="main flex-grow-1" style={{ paddingTop: '80px' }}>
        {currentPage === 'home' && (
          <HomePage
            onWatchVideo={() => setIsVideoOpen(true)}
            onOpenEnquiry={handleSelectService}
          />
        )}

        {currentPage === 'about' && <AboutPage />}

        {currentPage === 'services' && (
          <ServicesPage onOpenEnquiry={handleSelectService} />
        )}

        {currentPage === 'features' && <FeaturesPage />}

        {currentPage === 'testimonials' && <TestimonialsPage />}

        {currentPage === 'team' && <TeamPage />}

        {currentPage === 'blog' && <BlogPage />}

        {currentPage === 'gallery' && (
          <WorkGalleryPage onOpenEnquiry={handleSelectService} />
        )}

        {currentPage === 'careers' && <CareersPage />}

        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* Global Footer with Navigation Links */}
      <Footer onOpenPortal={() => navigateTo('portal')} />

      {/* Interactive Video Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl="https://www.youtube-nocookie.com/embed/jgc6rMVfVFc?autoplay=1"
      />

      {/* Interactive Quotation & Service Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        selectedService={selectedService}
      />

      {/* Floating WhatsApp and Scroll to Top */}
      <FloatingWidgets />

      {/* Floating ERP Portal Quick Access Pill */}
      <button
        onClick={() => navigateTo('portal')}
        className="position-fixed d-none d-md-flex align-items-center gap-2 px-3 py-2 bg-dark text-white rounded-pill shadow-lg border border-primary text-decoration-none z-3 transition hover-scale-105"
        style={{
          bottom: '24px',
          left: '24px',
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer',
          zIndex: 1040,
        }}
        title="Access Unified ERP & CRM Portal"
      >
        <span className="p-1 rounded-circle bg-primary d-inline-flex align-items-center justify-content-center">
          <Shield size={14} className="text-white" />
        </span>
        <span>Business ERP Portal</span>
        <ArrowRight size={14} className="text-primary" />
      </button>
    </div>
  );
}

export default function App() {
  return (
    <ErpProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </ErpProvider>
  );
}
