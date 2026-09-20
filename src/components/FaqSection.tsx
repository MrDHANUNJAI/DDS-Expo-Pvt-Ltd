import React, { useState } from 'react';
import { FAQS } from '../data/siteData';

export const FaqSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('faq-1');

  const toggleFaq = (id: string) => {
    setActiveId(prev => (prev === id ? '' : id));
  };

  const col1 = FAQS.slice(0, 3);
  const col2 = FAQS.slice(3, 6);

  return (
    <section id="faq" className="faq section py-5 bg-light">
      <div className="container section-title text-center mb-5">
        <h2
          className="d-inline-block px-4 py-2 rounded-pill fw-bold text-uppercase mb-2"
          style={{
            fontSize: '13px',
            letterSpacing: '1px',
            backgroundColor: 'rgba(65, 84, 241, 0.1)',
            color: '#4154f1',
          }}
        >
          F.A.Q
        </h2>
        <p className="fw-bold fs-2" style={{ color: '#012970' }}>
          Frequently Asked Questions
        </p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {/* Column 1 */}
          <div className="col-lg-6">
            <div className="faq-container d-flex flex-column gap-3">
              {col1.map(faq => {
                const isOpen = activeId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`faq-item p-4 bg-white shadow-sm rounded ${
                      isOpen ? 'border border-primary' : ''
                    }`}
                    style={{ cursor: 'pointer', transition: 'all 0.25s ease' }}
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <h3
                        className="fs-6 fw-bold mb-0 me-3"
                        style={{ color: isOpen ? '#4154f1' : '#012970' }}
                      >
                        {faq.question}
                      </h3>
                      <i
                        className={`bi bi-chevron-${isOpen ? 'down' : 'right'} fs-5`}
                        style={{ color: isOpen ? '#4154f1' : '#888' }}
                      ></i>
                    </div>
                    {isOpen && (
                      <div className="faq-content mt-3 pt-3 border-top">
                        <p className="text-muted mb-0 small" style={{ lineHeight: '1.6' }}>
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2 */}
          <div className="col-lg-6">
            <div className="faq-container d-flex flex-column gap-3">
              {col2.map(faq => {
                const isOpen = activeId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`faq-item p-4 bg-white shadow-sm rounded ${
                      isOpen ? 'border border-primary' : ''
                    }`}
                    style={{ cursor: 'pointer', transition: 'all 0.25s ease' }}
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <h3
                        className="fs-6 fw-bold mb-0 me-3"
                        style={{ color: isOpen ? '#4154f1' : '#012970' }}
                      >
                        {faq.question}
                      </h3>
                      <i
                        className={`bi bi-chevron-${isOpen ? 'down' : 'right'} fs-5`}
                        style={{ color: isOpen ? '#4154f1' : '#888' }}
                      ></i>
                    </div>
                    {isOpen && (
                      <div className="faq-content mt-3 pt-3 border-top">
                        <p className="text-muted mb-0 small" style={{ lineHeight: '1.6' }}>
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
