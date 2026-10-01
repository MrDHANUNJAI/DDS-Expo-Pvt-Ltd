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
