import React, { useState, useEffect } from 'react';
import { ChatbotWidget } from './chatbot/ChatbotWidget';

export const FloatingWidgets: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Floating Direct WhatsApp Chat (Bottom Left) */}
      <a
        href="https://wa.me/919966994679?text=Hi%20DDS%20Expo,%20I%20am%20interested%20in%20your%20digital%20marketing%20and%20web%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float text-decoration-none"
        aria-label="Chat on WhatsApp"
        title="Chat with DDS Expo on WhatsApp"
      >
        <i className="bi bi-whatsapp"></i>
      </a>

      {/* Scroll to Top Button (Bottom Right, above Chatbot) */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="scroll-top-btn border-0"
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <i className="bi bi-arrow-up-short fs-4"></i>
        </button>
      )}

      {/* Modern Local FAQ Chatbot Assistant (Bottom Right) */}
      <ChatbotWidget />
    </>
  );
};
