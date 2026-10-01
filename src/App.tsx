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
import { ServiceItem } from './types';

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

  return (
    <div className="index-page d-flex flex-column min-vh-100 position-relative">
      {/* Top Header / Navigation with active links and dropdown redirection */}
      <Navbar
        onOpenEnquiry={handleOpenGeneralEnquiry}
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
      <Footer />

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
